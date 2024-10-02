import createMiddleware from 'next-intl/middleware';
import { locales } from './config';

export default createMiddleware({
  defaultLocale: 'en',
  locales,
});

export const config = {
  matcher: ['/', '/(ru|de|en)/:path*'],
};
