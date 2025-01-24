import { JSX } from 'react';

import { navigation, siteTitle } from '@config';

import MenuClient from './client';

type Params = Promise<{ locale: string }>;

export default async function Menu({
  params,
}: {
  params: Params;
}): Promise<JSX.Element> {
  const { locale } = await params;

  return (
    <MenuClient
      locale={locale}
      initialNavigation={navigation}
      initialSiteTitle={siteTitle}
    />
  );
}
