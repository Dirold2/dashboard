'use client';
import React, { useEffect, useRef, useState } from 'react';
import styles from './style/ualert.module.css';

export interface UAlertProps {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: React.ReactNode;
  closeDelay?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
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
  useEffect(() => {
    if (closeDelay) {
      timerRef.current = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onClose?.(), 100);
      }, closeDelay);
    }
    return (): void => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [closeDelay, onClose, id]);

  const closeAlert = (): void => {
    setIsVisible(false);
    setTimeout(() => onClose?.(), 1000);
  };

  // if (!isVisible) {
  //   return null;
  // }

  return (
    <div
      className={`
        ${isVisible ? styles.alertFadeIn : styles.alertFadeOut}
        ${styles.alert}
        ${styles[`alert-${type}`]}
    `}
      role="alert"
      onClick={closeAlert}
    >
      {type === 'success' && (
        <i style={{ color: 'green' }} className="bi bi-check2-circle"></i>
      )}
      {type === 'info' && (
        <i style={{ color: 'blue' }} className="bi bi-info-circle"></i>
      )}
      {type === 'warning' && (
        <i
          style={{ color: 'yellow' }}
          className="bi bi-exclamation-triangle"
        ></i>
      )}
      {type === 'error' && (
        <i style={{ color: 'red' }} className="bi bi-exclamation-circle"></i>
      )}
      {message}
    </div>
  );
};

export default React.memo(UAlert);
