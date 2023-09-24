import handlePrismaError from '@/helpers/handlePrismaError';
import { cookies } from 'next/headers'
import Prisma, { PrismaErrorQuery } from '@/libs/prismadb';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
    const { email, password } = await request.json();

    try {
        const user = await Prisma.user.findUnique({
            where: {
                email
            }
        });

        if (!user) {
            return NextResponse.json('Usuário não existe', {
                status: 404,
            });
        }

        const passwordMatch = password === user.password;

        if (!passwordMatch) {
            return NextResponse.json('Senha incorreta', {
                status: 400,
            });
        }

        cookies().set('npmu-id', user.id, {
            path: '/',
            secure: true,
        });

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