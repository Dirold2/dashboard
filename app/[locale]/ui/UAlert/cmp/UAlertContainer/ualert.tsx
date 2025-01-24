'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

import styles from '../../style/ualert.module.scss';

export type AlertType = 'info' | 'success' | 'warning' | 'error';

export interface UAlertProps {
  id: string;
  type: AlertType;
  message: React.ReactNode;
  closeDelay?: number;
  onClose?: () => void;
}

const UAlert: React.FC<UAlertProps> = ({
  id,
  type,
  message,
  closeDelay = 4500,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const closeAlert = useCallback((): void => {
    setIsVisible(false);
    setTimeout(() => onClose?.(), 300);
  }, [onClose]);

  useEffect(() => {
    if (closeDelay) {
      timerRef.current = setTimeout(closeAlert, closeDelay);
    }
    return (): void => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [closeDelay, closeAlert]);

  const alertIcon = {
    success: <i className="bi bi-check2-circle" style={{ color: 'green' }} />,
    info: <i className="bi bi-info-circle" style={{ color: 'blue' }} />,
    warning: (
      <i className="bi bi-exclamation-triangle" style={{ color: 'yellow' }} />
    ),
    error: <i className="bi bi-exclamation-circle" style={{ color: 'red' }} />,
  }[type];

  return (
    <div
      className={`
        ${isVisible ? styles.alertFadeIn : styles.alertFadeOut}
        ${styles.alert}
        ${styles[`alert-${type}`]}
      `}
      role="alert"
      onClick={closeAlert}
      id={id}
    >
      {alertIcon}
      {message}
    </div>
  );
};

export default React.memo(UAlert);
