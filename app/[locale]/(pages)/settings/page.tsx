'use client';
import { useAlertContext } from '@component/Context';
import { Colors, LanguageSwitcher } from '@component/Other';
// import { Metadata } from 'next';
import React from 'react';
import { JSX } from 'react/jsx-runtime';

// export const metadata: Metadata = {
//   title: 'Settings',
// };

export default function Page(): JSX.Element {
  const { showAlert } = useAlertContext();

  const handleSuccess = (): void => {
    showAlert('success', 'Успешная операция!');
  };

  return (
    <>
      <Colors />
      <main className="center" onClick={handleSuccess}>
        <LanguageSwitcher />
      </main>
    </>
  );
}
