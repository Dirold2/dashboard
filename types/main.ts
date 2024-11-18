import { locales } from '@config';
import { Pathnames } from 'next-intl/routing';
// import { IMeta, Logger } from 'tslog';

export const pathnames = {
    '/': '/',
} satisfies Pathnames<typeof locales>;

// Use the default: `always`
export const localePrefix = undefined;

export type AppPathnames = keyof typeof pathnames;

export type NavigationItem = {
    title: string;
    icon: string;
    path: string;
    category: string;
}