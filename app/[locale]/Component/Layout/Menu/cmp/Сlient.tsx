'use client';
// Hooks
import { useState, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';

// Components
import Link from 'next/link';
import { Range } from '@cmp/Layout/Menu';
import { NavigationItem, navigation } from '@config';
import styles from '../style/menu.module.css';
import { siteTitle } from '@config';
import React from 'react';

export { Link, usePathname, styles, navigation, siteTitle, Range };

export const Menu = ({ locale }: { locale: string }): JSX.Element => {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const { data: session, status } = useSession();
  const t = useTranslations('Menu');

  const categorizedNavigation = useMemo(() => {
    const modifiedNavigation = [...navigation];
    if (status === 'authenticated' && session) {
      const loginIndex = modifiedNavigation.findIndex(
        (item) => item.title === 'Login',
      );
      if (loginIndex > -1) {
        modifiedNavigation[loginIndex] = {
          title: `Account`,
          icon: 'bi bi-person-fill',
          path: `/${session?.user?.name?.toLowerCase()}`,
          category: 'Settings',
        };
      }
    }
    return modifiedNavigation.reduce(
      (acc: Record<string, NavigationItem[]>, item: NavigationItem) => {
        (acc[item.category] = acc[item.category] || []).push(item);
        return acc;
      },
      {},
    );
  }, [status, session]);

  const handleClick = (): void => setActive(!active);

  if (status === 'loading') {
    return (
      <div className={styles.menu}>
        <div
          className={
            !active ? styles.sidebar : `${styles.sidebar} ${styles.active}`
          }
        ></div>
      </div>
    );
  }

  return (
    <div className={styles.menu}>
      <div
        className={
          !active ? styles.sidebar : `${styles.sidebar} ${styles.active}`
        }
      >
        <div onClick={handleClick} className={styles.logo_content}>
          <div className={styles.logo}>
            <div className={styles.logo_name}>{siteTitle}</div>
          </div>
          <i className="bi bi-list" id={`${styles.btn}`}></i>
        </div>
        <ul className={styles.nav_list} id={styles.sidebar}>
          {Object.entries(categorizedNavigation).map(
            ([category, items]: [string, unknown], index) => {
              const navigationItems = items as NavigationItem[];
              return (
                <div key={index}>
                  <h4
                    style={{
                      textAlign: 'start',
                      fontSize: 'small',
                      width: '110%',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {t(`category.${category}`)}
                  </h4>
                  {navigationItems.map(
                    (item: NavigationItem, index: number) => (
                      <li key={index}>
                        <>
                          <Link
                            href={`/${locale}${item.path}`}
                            id={
                              pathname === `/${locale}${item.path}`
                                ? styles.actbtn
                                : ''
                            }
                          >
                            <i className={item.icon}></i>
                            <span className={`${styles.links_name}`}>
                              {t(`title.${item.title}`)}
                            </span>
                          </Link>
                          {index !== navigationItems.length - 1 && <hr />}
                          <span className={styles.toltip}>
                            {t(`title.${item.title}`)}
                          </span>
                        </>
                      </li>
                    ),
                  )}
                </div>
              );
            },
          )}
        </ul>
        <div className="center">
          <Range />
        </div>
      </div>
    </div>
  );
};

export type { NavigationItem };