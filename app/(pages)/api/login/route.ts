import { hashNicknameToUUID } from "@cmp/UUid";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request): Promise<Response> {
    const { Login: login, Password: password } = await req.json();

    const uuidFromNickname = hashNicknameToUUID(login);

    const raw = {
        Login: login,
        UserUuid: uuidFromNickname
    };

    const existingUser = await prisma.user.findUnique({ where: { name: login, password } });

    if (!existingUser) {
        return new Response("Пользователь не найден", { status: 404, headers: { 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify(raw), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}