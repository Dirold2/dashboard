import type { NavigationItem } from "@types";

export const locales = ['en', 'de', 'ru'] as const;

export const navigation: NavigationItem[] = [
  { title: `Home`, icon: 'bi bi-house-fill', path: '', category: 'ADVENS' },
  { title: `News`, icon: 'bi bi-journal-bookmark-fill', path: '/news', category: 'ADVENS' },
  { title: `Login`, icon: 'bi bi-box-arrow-in-right', path: '/login', category: 'Settings' },
  { title: `Settings`, icon: 'bi bi-gear', path: '/settings', category: 'Settings' },
];

export const siteTitle = 'dashboard';