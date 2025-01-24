'use server';

import { AuthError } from 'next-auth';

import { signIn } from '.auth/auth';

export async function authenticate(
	prevState: string | undefined,
	formData: FormData,
): Promise<string | undefined> {
	try {
		await signIn('credentials', formData);
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return 'InvalidCredentials';
				default:
					return 'AuthenticationError';
			}
		}
		throw error;
	}
}
