'use client';

import { LanguageSwitcher } from '@component/Other';
import { VisibilityToggle } from '@ui/VisibilityToggle';
import { useSession } from 'next-auth/react';
import { RefObject, useRef } from 'react';
import { JSX } from 'react/jsx-runtime';

import styles from '@styles/other.module.scss';

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
            className={`${styles.lang} center ${
              showStyleBlock ? styles.Active : ''
            }`}
            style={{ cursor: 'pointer' }}
          >
            <i className="bi bi-translate"></i>
            {showBlock && (
              <div
                ref={blockRef}
                className={`${styles.blockContainer} ${
                  showStyleBlock ? styles.visible : ''
                }`}
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
