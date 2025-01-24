import GitHub from 'next-auth/providers/github';
import Discord from 'next-auth/providers/discord';
import Yandex from 'next-auth/providers/yandex';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import crypto from 'crypto';
import { PrismaClient } from '@prisma/client';
import { getCookie } from '@component/Utils';
import { signInSchema } from '@lib/zod';

const prisma = new PrismaClient();

export default {
	providers: [
		GitHub({ allowDangerousEmailAccountLinking: true }),
		Discord({ allowDangerousEmailAccountLinking: true }),
		Yandex({ allowDangerousEmailAccountLinking: true }),
		Credentials({
			credentials: {
				name: {},
				password: {},
			},
			authorize: async (credentials) => {
				let user = null;

				const { name, password } = await signInSchema.parseAsync(credentials);

				const passwordsMatch = crypto
					.createHash('sha256')
					.update(password)
					.digest('hex');

				user = await prisma.user.findUnique({
					where: { name: name, password: passwordsMatch },
				});

				if (!user) {
					throw new Error('User not found.');
				}

				return user;
			},
		}),
	],
	callbacks: {
		async signIn(): Promise<boolean> {
			return true;
		},
		async redirect({ url, baseUrl }): Promise<string> {
			const locale = getCookie('NEXT_LOCALE');
			if (url.startsWith(`/${locale}/login`))
				return `${baseUrl}/${locale}/account`;
			if (url.startsWith(`/${locale}`)) return `${baseUrl}/${locale}/${url}`;
			return url.startsWith(baseUrl) ? url : '/';
		},
		async session({ session, token }): Promise<typeof session> {
			session.sessionToken = token.accessToken as string;
			session.userId = token.userId as string;
			return session;
		},
		async jwt({ token, account }): Promise<typeof token> {
			if (account) {
				token.userId = account.userId;
				token.authorization_details = account.authorization_details;
				token.accessToken = account.access_token;
			}
			return token;
		},
	},
	pages: {
		error: `/error`,
	},
} satisfies NextAuthConfig;
