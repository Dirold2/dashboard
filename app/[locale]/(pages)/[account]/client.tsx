'use client';
import { Session } from 'next-auth';
import { usePathname } from 'next/navigation';

export function UseAccountClient(session: Session | null): boolean {
  const pathname = usePathname();
  const currentPath = pathname.split('/')[2];

  let isUserPath = false;

  if (session) {
    const user = session?.user;
    if (user && typeof user.name === 'string') {
      isUserPath = user.name === currentPath;
    }
  }

  return isUserPath;
}
