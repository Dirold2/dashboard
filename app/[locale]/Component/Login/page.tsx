'use client';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { JSX } from 'react/jsx-runtime';

function LoginForm(): JSX.Element {
  const [credentials, setCredentials] = useState({});
  const t = useTranslations('Login');
  
  const handleSubmit = (e: { preventDefault: () => void }): void => {
    e.preventDefault();
    signIn('credentials', { ...credentials, redirect: false });
  };

  const handleGitHubSignIn = (): void => {
    signIn('github');
  };

  return (
    <main className="center">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={t('Username')}
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
        />
        <input
          type="password"
          placeholder={t('Password')}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
        <button type="submit">{t('Login')}</button>
      </form>
      <button onClick={handleGitHubSignIn}>sign in with github</button>
    </main>
  );
}

export default LoginForm;