import { redirect } from 'next/navigation';
import { JSX } from 'react/jsx-runtime';

// server.tsx
import { auth } from '.auth/auth';
import ClientLogin from './client';

export const metadata = {
  title: 'Login',
};

async function ServerLogin({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<JSX.Element> {
  const session = await auth();

  const { locale } = await params;

  if (session?.user) {
    redirect(`/${locale}/${session.user.name}`);
  }

  return <ClientLogin />;
}

export default ServerLogin;
