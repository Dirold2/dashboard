import type { NavigationItem } from '@types';

export const locales = ['en', 'de', 'ru'] as const;
export const defaultLocale = 'ru';

export const navigation: NavigationItem[] = [
  { title: 'Home', icon: 'bi bi-house-fill', path: '/', category: 'ADVENS' },
  { title: 'Charter', icon: 'bi bi-journal-text', path: '/charter', category: 'ADVENS' },
  { title: 'Projects', icon: 'bi bi-box-seam-fill', path: '/projects', category: 'ADVENS' },
  { title: 'News', icon: 'bi bi-journal-bookmark-fill', path: '/news', category: 'ADVENS' },
  { title: 'Login', icon: 'bi bi-box-arrow-in-right', path: '/login', category: 'Settings' },
  { title: 'Settings', icon: 'bi bi-gear', path: '/settings', category: 'Settings' },
];

export const hostName = `https://perma4.ru/` || 'http://localhost:3000/';
export const hostNameFiles = process.env.PUBLIC_HOSTNAMEFILES || 'http://files.localhost:3000/';

export const siteTitle = 'PERMA4';
