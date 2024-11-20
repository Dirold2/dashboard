'use client';
// Hooks
import { useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { getCookie } from '@cmp/Utils';

import type { NavigationItem } from '@types';

// Components
import { navigation } from '@config';
import { Range } from '@cmp/Layout/Menu';
import styles from '../style/menuMobile.module.css';
import styless from '@styles/other.module.css';
import Link from 'next/link';
import { JSX } from 'react/jsx-runtime';

export const MenuMobile = (): JSX.Element => {
    const [active, setActive] = useState(false);
    const pathname = usePathname();

    const { data: session, status } = useSession();
    const t = useTranslations('Menu');

    const locale = getCookie(`NEXT_LOCALE`);

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
                    path: `/${session?.user?.name}`,
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
            <span />
        );
    }

    return (
        <div className={styles.menu}>
            <div onClick={handleClick} style={{ cursor: 'pointer', marginRight: '20px' }}>
                <div className={styless.notificationbox}>
                    <div>
                        <aside>
                            <i className="bi bi-list"></i>
                        </aside>
                    </div>
                </div>
            </div>
            <ul className={!active ? styles.menuUl : `${styles.menuUl} ${styles.active}`}>
                <div onClick={handleClick} style={{ cursor: 'pointer', position: 'absolute', border: `1px solid var(--background-after)`, borderRadius: 'var(--border-radius)' , top: '20px', left: '20px' }}>
                    <div className={styless.notificationbox}>
                        <div>
                            <aside className={!active ? `` : styles.active}>
                                <i className="bi bi-x"></i>
                            </aside>
                        </div>
                    </div>
                </div>
                {Object.entries(categorizedNavigation).map(
                    ([category, items], index) => {
                        const navigationItems = items as NavigationItem[];
                        return (
                            <div key={index} className={styles.menuBox}>
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
                                    (item, index) => (
                                        <li onClick={handleClick} key={index}>
                                            <Link
                                                href={`/${locale}${item.path}`}
                                                id={pathname === `/${locale}${item.path}` ? styles.actbtn : ''}
                                            >
                                                <i className={item.icon}></i>
                                                <span className={styles.links_name}>
                                                    {t(`title.${item.title}`)}
                                                </span>
                                            </Link>
                                            {index !== navigationItems.length - 1 && <hr />}
                                        </li>
                                    ),
                                )}
                            </div>
                        );
                    },
                )}
                <div className='center'>
                    <Range />
                </div>
            </ul>
        </div>
    );
};

export type { NavigationItem };