import handlePrismaError from '@/helpers/handlePrismaError';
import { cookies } from 'next/headers'
import Prisma, { PrismaErrorQuery } from '@/libs/prismadb';
import { NextResponse } from 'next/server';

export const GET = async (request: Request) => {
    const userId = cookies().get('npmu-id')?.value;

    try {
        const user = await Prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!user) {
            return NextResponse.json('Usuário não encontrado', {
                status: 404,
            });
        }

        return NextResponse.json({
            user: {
                ...user,
            }
        });

    } catch (err) {
        const message = handlePrismaError(err as PrismaErrorQuery);

        return NextResponse.json(message, {
            status: 400,
        });
    }
};