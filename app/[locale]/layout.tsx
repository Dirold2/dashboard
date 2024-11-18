// Hook
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { NextIntlClientProvider } from 'next-intl';

// Style
import '@styles/globals.css';
import styles from '@styles/Layout.module.css';

// Component
import { siteTitle } from '@config';
import { AuthProvider, NotificationProvider } from '@cmp/Context';
import { Footer, Header, Menu, Sidebar } from '@cmp/Layout';
import { ONTop } from '@ui/ONTop';
import { routing } from 'i18n/routing';
import { notFound } from 'next/navigation';
import { getMessages } from 'next-intl/server';
import { JSX } from 'react/jsx-runtime';

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
  description: 'First Site',
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

type Params = Promise<{ locale: string }>

const RootLayout = async ({
  children,
  params,
}: {
  children: JSX.Element | null | undefined;
  params: Params;
}): Promise<JSX.Element> => {
  const { locale } = await params
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
              <div className={styles.container}>
                <Menu locale={locale} />
                <div className={styles.content}>
                  <Header />
                  <div className={styles.main}>{children}</div>
                  <Footer />
                </div>
                <Sidebar />
              </div>
              <ONTop />
            </NotificationProvider>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export default RootLayout;