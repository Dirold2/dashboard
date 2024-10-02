"use client";
// import { create } from './cmp/actions';
import Client from './cmp/Client';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const Login = (): JSX.Element => {
  const { data: session } = useSession();
  const lang = 'en';

  useEffect(() => {
    if (session?.user) {
      // create('name', session);
      redirect(`/${lang}/${session.user.name?.toLowerCase()}`);
    }
  }, [session]);

  return <Client />;
};

export default Login;