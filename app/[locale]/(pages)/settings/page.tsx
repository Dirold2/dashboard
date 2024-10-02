import { Colors, LanguageSwitcher } from '@cmp/Other';
import React from 'react';

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
