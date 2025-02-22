import crypto from 'crypto';
import { Logger } from 'tslog';

import { PrismaClient } from '@prisma/client';

const logger = new Logger();

const prisma = new PrismaClient();

export async function POST(request: Request): Promise<Response> {
	try {
		const { email, name, password } = await request.json();

		// Проверяем, существует ли уже пользователь с таким email
		const existingUser = await prisma.user.findUnique({ where: { email } });

		if (existingUser) {
			return new Response('Email is already in use', { status: 400 });
		}

		// // Хешируем пароль
		const hash = crypto.createHash('sha256').update(password).digest('hex');

		// // Создаем нового пользователя
		await prisma.user.create({
			data: {
				email,
				name,
				password: hash,
			},
		});

		return new Response(JSON.stringify({ email, name }), { status: 200 });
	} catch (error) {
		logger.error('Error fetching users:', error);
		return new Response(null, {
			status: 500,
			statusText: 'Internal Server Error',
		});
	}
}
