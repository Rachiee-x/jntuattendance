import { SignJWT, jwtVerify, type JWTPayload } from "jose"; // import JWTPayload
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secretKey = process.env.SESSION_SECRET || "default_secret_key_change_me";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: JWTPayload) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(key);
}

export async function decrypt(input: string): Promise<JWTPayload | null> {
    try {
        const { payload } = await jwtVerify(input, key, {
            algorithms: ["HS256"],
        });
        return payload;
    } catch {
        return null;
    }
}

export async function getSession() {
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;
    if (!session) return null;
    return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
    const session = request.cookies.get("session")?.value;
    if (!session) return;

    // Refresh logic if needed
    const parsed = await decrypt(session);
    if (!parsed) return;

    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const newPayload = { ...parsed, expires };

    const res = NextResponse.next();
    res.cookies.set({
        name: "session",
        value: await encrypt(newPayload),
        httpOnly: true,
        expires: expires,
    });
    return res;
}
