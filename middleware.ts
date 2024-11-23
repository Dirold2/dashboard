import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { locales } from '@config';

const i18nMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  // Проверяем, является ли путь относящимся к локализации
  const isLocalePath = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (pathname === '/' || isLocalePath) {
    return i18nMiddleware(request);
  }

  // Если путь не относится к локализации, просто продолжаем обработку
  return NextResponse.next();
}
