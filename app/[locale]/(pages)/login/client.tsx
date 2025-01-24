// client.tsx
'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { JSX, useEffect } from 'react';

import Client from './cmp/Client';

const ClientLogin = (): JSX.Element => {
  const { data: session } = useSession();
  const lang = 'en';

  useEffect(() => {
    if (session?.user) {
      redirect(`/${lang}/${session.user.name}`);
    }
  }, [session]);

  return <Client />;
};

export default ClientLogin;
