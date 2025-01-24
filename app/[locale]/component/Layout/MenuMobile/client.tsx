'use client';

import { Range } from '@component/Layout/Menu';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import { JSX } from 'react/jsx-runtime';

import otherStyles from '@styles/other.module.scss';

import { Lang } from '../Sidebar';
import styles from './style/menuMobile.module.scss';

import type { NavigationItem } from '@types';
interface MenuMobileClientProps {
  initialNavigation: NavigationItem[];
}

export default function MenuMobileClient({
  initialNavigation,
}: MenuMobileClientProps): JSX.Element {
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const t = useTranslations('Menu');
  const params = useParams();
  const locale = params?.locale as string;

  const categorizedNavigation = useMemo(() => {
    const modifiedNavigation = initialNavigation.map((item) =>
      item.title === 'Login' && status === 'authenticated' && session
        ? {
            title: 'Account',
            icon: 'bi bi-person-fill',
            path: `/${session.user?.name}`,
            category: 'Settings',
          }
        : item,
    );

    return modifiedNavigation.reduce<Record<string, NavigationItem[]>>(
      (acc, item) => {
        (acc[item.category] = acc[item.category] || []).push(item);
        return acc;
      },
      {},
    );
  }, [initialNavigation, status, session]);

  const toggleMenu = useCallback(() => setIsActive((prev) => !prev), []);

  if (status === 'loading') {
    return <span />;
  }

  return (
    <div className={styles.menu}>
      <div
        onClick={toggleMenu}
        className={otherStyles.notificationbox}
        style={{ cursor: 'pointer', marginRight: '20px' }}
      >
        <div>
          <aside>
            <i className="bi bi-list"></i>
          </aside>
        </div>
      </div>
      <nav className={`${styles.menuUl} ${isActive ? styles.active : ''}`}>
        <div
          onClick={toggleMenu}
          className={`${otherStyles.notificationbox} ${styles.closeButton}`}
        >
          <div>
            <aside className={isActive ? styles.active : ''}>
              <i className="bi bi-x"></i>
            </aside>
          </div>
        </div>
        <div className={`${otherStyles.notificationbox} ${styles.closeLang}`}>
          <Lang />
        </div>
        {Object.entries(categorizedNavigation).map(
          ([category, items], index) => (
            <div key={index} className={styles.menuBox}>
              <h4 className={styles.categoryTitle}>
                {t(`category.${category}`)}
              </h4>
              <ul>
                {items.map((item, index) => (
                  <li key={index} onClick={toggleMenu}>
                    <Link
                      href={`/${locale}${item.path}`}
                      className={
                        pathname === `/${locale}${item.path}`
                          ? styles.actbtn
                          : ''
                      }
                    >
                      <i className={item.icon}></i>
                      <span className={styles.links_name}>
                        {t(`title.${item.title}`)}
                      </span>
                    </Link>
                    {index !== items.length - 1 && <hr />}
                  </li>
                ))}
              </ul>
            </div>
          ),
        )}
        <div className="center">
          <Range />
        </div>
      </nav>
    </div>
  );
}
