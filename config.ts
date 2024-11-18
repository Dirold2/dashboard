import { Pathnames } from 'next-intl/routing';
// import { IMeta, Logger } from 'tslog';

export const locales = ['en', 'de', 'ru'] as const;

export const pathnames = {
  '/': '/',
} satisfies Pathnames<typeof locales>;

// Use the default: `always`
export const localePrefix = undefined;

export type AppPathnames = keyof typeof pathnames;

export const siteTitle = 'dashboard';

export interface NavigationItem {
  title: string;
  icon: string;
  path: string;
  category: string;
}

export const navigation: NavigationItem[] = [
  { title: `Home`, icon: 'bi bi-house-fill', path: '', category: 'ADVENS' },
  {
    title: `News`,
    icon: 'bi bi-journal-bookmark-fill',
    path: '/news',
    category: 'ADVENS',
  },
  {
    title: `Login`,
    icon: 'bi bi-box-arrow-in-right',
    path: '/login',
    category: 'Settings',
  },
  {
    title: `Settings`,
    icon: 'bi bi-gear',
    path: '/settings',
    category: 'Settings',
  },
];
