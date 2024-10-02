import NextAuth from "next-auth"
import authConfig from './auth.config';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@PrismaSingleton';

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  trustHost: true,
  session: { strategy: 'jwt' },
  adapter: PrismaAdapter(prisma),

  ...authConfig,
});
