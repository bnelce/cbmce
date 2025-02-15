import { PrismaClient } from "@prisma/client";

// Evitar criar várias instâncias do Prisma Client durante o desenvolvimento
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
