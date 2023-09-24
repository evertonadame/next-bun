import handlePrismaError from '@/helpers/handlePrismaError';
import Prisma, { PrismaErrorQuery } from '@/libs/prismadb';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
    const { ...props } = await request.json();

    try {
        const newUserCreate = await Prisma.user.create({
            data: {
                ...props,
            }
        });
        return NextResponse.json(newUserCreate);
    } catch (err) {
        const message = handlePrismaError(err as PrismaErrorQuery);

        return NextResponse.json(message, {
            status: 400,
        });
    }
};