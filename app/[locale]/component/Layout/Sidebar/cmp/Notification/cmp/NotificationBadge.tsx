import { JSX } from 'react/jsx-runtime';

import styles from '@styles/other.module.scss';

type NotificationBadgeProps = {
  count: number;
};

const NotificationBadge = ({
  count,
}: NotificationBadgeProps): JSX.Element | null =>
  count > 0 ? (
    <span className={styles.notificationBadge}>
      {count > 99 ? '99+' : count}
    </span>
  ) : null;

export default NotificationBadge;
