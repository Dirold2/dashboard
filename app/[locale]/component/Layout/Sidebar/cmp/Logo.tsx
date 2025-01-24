'use client';

import { getPathPart } from '@component/Utils';
import { VisibilityToggle } from '@ui/VisibilityToggle';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { RefObject, useRef } from 'react';
import { JSX } from 'react/jsx-runtime';

import styles from '@styles/other.module.scss';

function get_user_image(session: Session | null): string {
  return (
    session?.user?.image?.replace(/"/g, '') ||
    `https://ui-avatars.com/api/?format=svg&name=${session?.user?.name}`
  );
}

const MemoizedVisibilityToggle = React.memo(VisibilityToggle);

function Logo(): JSX.Element {
  const { data: session, status } = useSession();
  const blockRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const typedButtonRef = buttonRef as RefObject<HTMLDivElement>;
  const typedBlockRef = blockRef as RefObject<HTMLDivElement>;
  const pathname = usePathname();
  const path = getPathPart(pathname);

  const userImage = get_user_image(session);

  if (status !== 'authenticated') {
    return <aside className={styles.logo}></aside>;
  }

  return (
    <div className={styles.sidebox}>
      <MemoizedVisibilityToggle
        buttonRef={typedButtonRef}
        blockRef={typedBlockRef}
      >
        {({ showBlock, showStyleBlock, toggleBlockVisibility }) => (
          <aside
            ref={buttonRef}
            onClick={toggleBlockVisibility}
            className={`${styles.logo} ${showStyleBlock ? styles.Active : ''}`}
            style={{ cursor: 'pointer' }}
          >
            <Image
              src={userImage}
              alt={session.user.name as string}
              width={200}
              height={200}
            />
            {showBlock && (
              <div
                ref={blockRef}
                className={`${styles.blockContainer} ${
                  showStyleBlock ? styles.visible : ''
                }`}
              >
                <Link
                  href={`${path}/${session.user.name}`}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Image
                    src={userImage}
                    alt={session.user.name as string}
                    width={200}
                    height={200}
                  />
                  {session.user.name}
                </Link>
              </div>
            )}
          </aside>
        )}
      </MemoizedVisibilityToggle>
    </div>
  );
}

export default Logo;
