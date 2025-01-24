'use client';
import { signIn } from 'next-auth/react';
import React, { useState } from 'react';
import { JSX } from 'react/jsx-runtime';

function LoginForm(): JSX.Element {
  const [credentials, setCredentials] = useState({});

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
          placeholder={'Username'}
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
        />
        <input
          type="password"
          placeholder={'Password'}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
        <button type="submit">{'Login'}</button>
      </form>
      <button onClick={handleGitHubSignIn}>sign in with github</button>
    </main>
  );
}

export default LoginForm;
