import { JSX } from 'react/jsx-runtime';

import { siteTitle } from '@config';

import styles from './style/footer.module.scss';

type Params = Promise<{ locale: string }>;

export default async function Footer({
  params,
}: {
  params: Params;
}): Promise<JSX.Element> {
  const { locale } = await params;

  const currentYear = new Date().getFullYear();
  return (
    <footer className={`${styles.footer} ${`center`}`}>
      {siteTitle} &copy; {currentYear} {locale}
    </footer>
  );
}
