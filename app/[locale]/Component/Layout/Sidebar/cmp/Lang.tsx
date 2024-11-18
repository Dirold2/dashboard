'use client';

import styles from '@styles/other.module.css';
import { VisibilityToggle } from '@ui/VisibilityToggle';
import { RefObject, useRef } from 'react';
import { LanguageSwitcher } from '@cmp/Other';
import { useSession } from 'next-auth/react';
import { JSX } from 'react/jsx-runtime';

function Lang(): JSX.Element {
  const { status } = useSession();
  const blockRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const typedButtonRef = buttonRef as RefObject<HTMLDivElement>;
  const typedBlockRef = blockRef as RefObject<HTMLDivElement>;

  if (status === 'loading') {
    return <aside className={styles.lang}></aside>;
  }

  return (
    <div className={styles.sidebox}>
      <VisibilityToggle buttonRef={typedButtonRef} blockRef={typedBlockRef}>
        {({
          showBlock,
          showStyleBlock,
          toggleBlockVisibility,
        }: {
          showBlock: boolean;
          showStyleBlock: boolean;
          toggleBlockVisibility: () => void;
        }) => (
          <aside
            ref={buttonRef}
            onClick={toggleBlockVisibility}
            className={`${styles.lang} center ${showStyleBlock ? styles.Active : ''}`}
            style={{ cursor: 'pointer' }}
          >
            <i className="bi bi-translate"></i>
            {showBlock && (
              <div
                ref={blockRef}
                className={`${styles.blockContainer} ${showStyleBlock ? styles.visible : ''}`}
              >
                <LanguageSwitcher />
              </div>
            )}
          </aside>
        )}
      </VisibilityToggle>
    </div>
  );
}

export default Lang;
