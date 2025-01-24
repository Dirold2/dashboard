import { JSX } from 'react';

import { hostName } from '@config';

import HeaderClient from './client';

type Params = Promise<{ locale: string }>;

export default async function Header({
  params,
}: {
  params: Params;
}): Promise<JSX.Element> {
  const host = await hostName;
  const { locale } = await params;

  return <HeaderClient locale={locale} initialHostName={host} />;
}
