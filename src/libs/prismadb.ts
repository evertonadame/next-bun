import { PrismaClient, Prisma } from '@prisma/client';

type PrismaErrorQuery = Prisma.PrismaClientKnownRequestError

declare global {
    var prisma: PrismaClient;
}

const client = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
    globalThis.prisma = client;
}

export type { PrismaErrorQuery }
export default client;
