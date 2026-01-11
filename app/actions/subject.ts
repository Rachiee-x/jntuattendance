"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function getSubjects() {
    const session = await getSession();
    if (!session) return [];

    return await prisma.subject.findMany({
        where: { userId: session.userId as string },
        orderBy: { createdAt: "desc" },
    });
}

export async function addSubject(prevState: unknown, formData: FormData) {
    const session = await getSession();
    if (!session) return { error: "Unauthorized" };

    const name = formData.get("name") as string;
    const attended = parseInt(formData.get("attended") as string) || 0;
    const conducted = parseInt(formData.get("conducted") as string) || 0;

    if (!name) return { error: "Name is required" };
    if (attended > conducted) return { error: "Attended cannot be greater than conducted" };

    await prisma.subject.create({
        data: {
            name,
            attended,
            conducted,
            userId: session.userId as string,
        },
    });

    revalidatePath("/");
    return { success: true };
}

export async function updateAttendance(id: string, type: "present" | "absent") {
    const session = await getSession();
    if (!session) return { error: "Unauthorized" };

    const subject = await prisma.subject.findUnique({
        where: { id, userId: session.userId as string },
    });

    if (!subject) return { error: "Subject not found" };

    await prisma.subject.update({
        where: { id },
        data: {
            attended: type === "present" ? subject.attended + 1 : subject.attended,
            conducted: subject.conducted + 1,
        },
    });

    revalidatePath("/");
    return { success: true };
}

export async function deleteSubject(id: string) {
    const session = await getSession();
    if (!session) return { error: "Unauthorized" };

    await prisma.subject.delete({
        where: { id, userId: session.userId as string },
    });

    revalidatePath("/");
    return { success: true };
}
