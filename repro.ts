import { prisma } from "./lib/prisma";

async function main() {
    try {
        console.log("Attempting to connect to DB...");
        const user = await prisma.user.findFirst();
        console.log("Connection successful. Found user:", user);
    } catch (error) {
        console.error("Connection failed:", error);
        process.exit(1);
    }
}

main();
