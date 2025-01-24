'use client';
import { getSecondPathPart } from '@component/Utils';
import { Grid } from '@ui/Grid';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { JSX } from 'react/jsx-runtime';

function LanguageSwitcher(): JSX.Element {
  const t = useTranslations('Lang');
  const pathname = usePathname();
  const path = getSecondPathPart(pathname);

  return (
    <Grid>
      <button>
        <Link href={`/en${path}`} locale="en">
          {t('english')}
        </Link>
      </button>
      <button>
        <Link href={`/de${path}`} locale="de">
          {t('german')}
        </Link>
      </button>
      <button>
        <Link href={`/ru${path}`} locale="ru">
          {t('russian')}
        </Link>
      </button>
    </Grid>
  );
}

export default LanguageSwitcher;
