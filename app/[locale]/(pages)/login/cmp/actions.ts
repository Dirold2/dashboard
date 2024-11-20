'use server'

import { cookies } from 'next/headers'

interface Session {
    user?: {
        id?: string; // Add an optional id property if needed
        name?: string | null; // Adjust the type to match what's expected
    };
}

export async function create(name: string, session: Session): Promise<void> {
    const userName = session.user?.name;
    (await cookies()).set(name, userName || '');
}