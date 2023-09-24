import { PrismaErrorQuery } from "@/libs/prismadb";

export default function handlePrismaError(err: PrismaErrorQuery) {

    if (err.code === 'P2002') {
        const field = err.meta?.target as string;
        if (field.includes('email')) {
            return 'Email already exists in database'
        }
    }

    return err.message;
}