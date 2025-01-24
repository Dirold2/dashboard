// Style
import '@styles/globals.scss';

import {
  AlertProvider,
  AuthProvider,
  NotificationProvider,
} from '@component/Context';
import { Footer, Header, Menu, Sidebar } from '@component/Layout';
import { ONTop } from '@ui/ONTop';
import { routing } from 'i18n/routing';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
// Hook
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { notFound } from 'next/navigation';
import { JSX } from 'react/jsx-runtime';

// Component
import { siteTitle } from '@config';
import styles from '@styles/Layout.module.scss';

type TitleType = {
  template: string;
  default: string;
};

export const metadata: {
  title: TitleType;
  description: string;
} = {
  title: {
    template: `${siteTitle} / %s`,
    default: `${siteTitle}`,
  },
  description: `${siteTitle}`,
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

type Params = Promise<{ locale: string }>;

const RootLayout = async ({
  children,
  params,
}: {
  children: JSX.Element | null | undefined;
  params: Params;
}): Promise<JSX.Element> => {
  const { locale } = await params;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.className}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>{metadata.title ? metadata.title.template : ''}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={`center`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AuthProvider>
            <NotificationProvider>
              <AlertProvider>
                <div className={styles.container}>
                  <Menu params={params} />
                  <div className={styles.content}>
                    <Header params={params} />
                    <div className={styles.main}>{children}</div>
                    <Footer params={params} />
                  </div>
                  <Sidebar />
                </div>
                <ONTop />
              </AlertProvider>
            </NotificationProvider>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
