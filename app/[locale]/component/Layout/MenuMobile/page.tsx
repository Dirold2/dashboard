import { JSX } from 'react';

import { navigation } from '@config';

import MenuMobileClient from './client';

export default function MenuMobile(): JSX.Element {
  return <MenuMobileClient initialNavigation={navigation} />;
}
