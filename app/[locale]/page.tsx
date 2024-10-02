import { Metadata } from 'next';
import { useTranslations } from 'next-intl';

export const metadata: Metadata = {
  title: 'About',
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