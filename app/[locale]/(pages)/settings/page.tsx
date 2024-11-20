import { Colors, LanguageSwitcher } from '@cmp/Other';
import { Metadata } from 'next';
import React from 'react';
import { JSX } from 'react/jsx-runtime';

export const metadata: Metadata = {
  title: 'Settings',
};

export default function Page(): JSX.Element {
  return (
    <>
      <Colors />
      <main className="center">
        <LanguageSwitcher />
      </main>
    </>
  );
}
