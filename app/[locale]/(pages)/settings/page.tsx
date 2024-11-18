import { Colors, LanguageSwitcher } from '@cmp/Other';
import React from 'react';
import { JSX } from 'react/jsx-runtime';

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
