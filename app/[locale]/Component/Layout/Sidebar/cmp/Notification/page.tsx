'use client';
import styles from '@styles/other.module.css';
import { VisibilityToggle } from '@ui/VisibilityToggle';
import { RefObject, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useNotification } from '@cmp/Context/NotificationContext';
import NotificationIcon from './cmp/NotificationIcon';
import NotificationBadge from './cmp/NotificationBadge';
import { JSX } from 'react/jsx-runtime';

export default function Notification(): JSX.Element {
  const blockRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const typedButtonRef = buttonRef as RefObject<HTMLDivElement>;
  const typedBlockRef = blockRef as RefObject<HTMLDivElement>;
  const { status } = useSession();
  const {
    notifications,
    removeNotification,
    removeAllNotifications,
    notificationCount,
  } = useNotification();
  if (status === 'loading') {
    return <aside></aside>;
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
            onClick={notificationCount > 0 ? toggleBlockVisibility : undefined}
            className={`${styles.notification} center ${notificationCount > 0 ? (showStyleBlock ? styles.Active : '') : ''
              }`}
            style={{ cursor: notificationCount > 0 ? 'pointer' : 'default' }}
          >
            <NotificationIcon />
            <NotificationBadge count={notificationCount} />
            {showBlock && (
              <div
                ref={blockRef}
                className={`${styles.blockContainer} ${showStyleBlock ? styles.visible : ''
                  }`}
              >
                <div>
                  {notifications.map((notification) => (
                    <div key={notification.id}>
                      <div
                        className={`center ${styles.boxNotification}`}
                        onClick={(event) => {
                          event.stopPropagation();
                          removeNotification(notification.id);
                        }}
                      >
                        {notification.message}
                        <i className="bi center bi-x"></i>
                      </div>
                    </div>
                  ))}
                  {notificationCount > 1 && (
                    <div
                      onClick={removeAllNotifications}
                      className={styles.boxNotification}
                    >
                      Close All
                      <i className="bi center bi-x"></i>
                    </div>
                  )}
                </div>
              </div>
            )}
          </aside>
        )}
      </VisibilityToggle>
    </div>
  );
}
