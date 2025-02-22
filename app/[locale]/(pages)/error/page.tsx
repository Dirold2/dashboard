import { Grid } from '@ui/Grid';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';
import { JSX } from 'react/jsx-runtime';

export const metadata: Metadata = {
  title: 'Error',
};

const CustomError = (): JSX.Element => {
  const t = useTranslations(``);
  const errorOccurred = true;

  let errorMessage = t(`Error.Unexpected_error`);

  if (errorOccurred) {
    errorMessage = t(`Error.Occurred_error`);
  }

  return (
    <main className="center">
      <Grid>
        <div>
          <h1>{t(`Error.error`)}</h1>
          <p>{errorMessage}</p>
        </div>
        <button>
          <Link href="/">{t(`Error.back`)}</Link>
        </button>
      </Grid>
    </main>
  );
};

export default CustomError;
