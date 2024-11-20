import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { JSX } from 'react/jsx-runtime';

export const metadata: Metadata = {
  title: 'Home',
};

function Page(): JSX.Element {
  const t = useTranslations('Index');
  return (
    <main className="center">
      <h2>{t('title')}</h2>
    </main>
  );
}

export default Page;
