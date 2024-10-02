'use client';

import styles from '@styles/other.module.css';
import { VisibilityToggle } from '@ui/VisibilityToggle';
import { useRef } from 'react';
import { LanguageSwitcher } from '@cmp/Other';
import { useSession } from 'next-auth/react';

function Lang(): JSX.Element {
  const { status } = useSession();
  const blockRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  if (status === 'loading') {
    return <aside className={styles.lang}></aside>;
  }

  return (
    <div className={styles.sidebox}>
      <VisibilityToggle buttonRef={buttonRef} blockRef={blockRef}>
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
