import { MetadataRoute } from 'next';
import { getPathname } from '../i18n/routing';
import { defaultLocale, hostName, locales, navigation } from '@config';

const host = hostName;

export default function sitemap(): MetadataRoute.Sitemap {
  return navigation.flatMap(({ path }) =>
    locales.map((locale) => ({
      url: getUrl(path || '/', locale),
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: locale === defaultLocale ? 1.0 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((altLocale) => [altLocale, getUrl(path || '/', altLocale)])
        ),
      },
    }))
  );
}

type Href = Parameters<typeof getPathname>[0]['href'];

function getUrl(href: Href, locale: typeof locales[number]): string {
  const pathname = getPathname({ locale, href });
  return `${host}${pathname}`;
}