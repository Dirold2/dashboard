'use client';

import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { JSX, useCallback, useMemo, useState } from 'react';

import { Range } from './cmp';
import styles from './style/menu.module.scss';

import type { NavigationItem } from '@types';
interface MenuClientProps {
  locale: string;
  initialNavigation: NavigationItem[];
  initialSiteTitle: string;
}

export default function MenuClient({
  locale,
  initialNavigation,
  initialSiteTitle,
}: MenuClientProps): JSX.Element {
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(false);
  const { data: session, status } = useSession();
  const t = useTranslations('Menu');

  const categorizedNavigation = useMemo(() => {
    return initialNavigation.reduce<Record<string, NavigationItem[]>>(
      (acc, item) => {
        const modifiedItem =
          item.title === 'Login' && status === 'authenticated' && session
            ? {
                title: 'Account',
                icon: 'bi bi-person-fill',
                path: `/${session.user?.name}`,
                category: 'Settings',
              }
            : item;

        (acc[modifiedItem.category] = acc[modifiedItem.category] || []).push(
          modifiedItem,
        );
        return acc;
      },
      {},
    );
  }, [initialNavigation, status, session]);

  const toggleSidebar = useCallback(() => setIsActive((prev) => !prev), []);

  if (status === 'loading') {
    return (
      <div className={styles.menu}>
        <div
          className={
            isActive ? `${styles.sidebar} ${styles.active}` : styles.sidebar
          }
        />
      </div>
    );
  }

  return (
    <div className={styles.menu}>
      <div
        className={
          isActive ? `${styles.sidebar} ${styles.active}` : styles.sidebar
        }
      >
        <div onClick={toggleSidebar} className={styles.logo_content}>
          <div className={styles.logo}>
            <div className={styles.logo_name}>{initialSiteTitle}</div>
          </div>
          <i className={`bi bi-list`} id={`${styles.btn}`} />
        </div>
        <ul className={styles.nav_list} id={styles.sidebar}>
          {Object.entries(categorizedNavigation).map(
            ([category, items], index) => (
              <div key={index}>
                <h4 className={styles.category_title}>
                  {t(`category.${category}`)}
                </h4>
                {items.map((item, index) => (
                  <span key={index}>
                    <li>
                      <Link
                        href={`/${locale}${item.path}`}
                        className={
                          pathname === `/${locale}${item.path}`
                            ? styles.actbtn
                            : ''
                        }
                      >
                        <i className={item.icon} />
                        <span className={styles.links_name}>
                          {t(`title.${item.title}`)}
                        </span>
                      </Link>
                      <span className={styles.toltip}>
                        {t(`title.${item.title}`)}
                      </span>
                    </li>
                    {index !== items.length - 1 && <hr />}
                  </span>
                ))}
              </div>
            ),
          )}
        </ul>
        <div className="center">
          <Range />
        </div>
      </div>
    </div>
  );
}
