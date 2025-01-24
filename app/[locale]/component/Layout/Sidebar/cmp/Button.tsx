'use client';
import { getPathPart } from '@component/Utils';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { JSX } from 'react/jsx-runtime';

import styles from '@styles/other.module.scss';

function Button(): JSX.Element {
  const { status } = useSession();
  const pathname = usePathname();
  const path = getPathPart(pathname);

  if (status === 'loading') {
    return <aside className={styles.button}></aside>;
  }

  return (
    <Link href={`${path}/login`}>
      <aside className={`${styles.button} center`}>
        <i className="bi bi-box-arrow-in-right" />
      </aside>
    </Link>
  );
}

export default Button;
