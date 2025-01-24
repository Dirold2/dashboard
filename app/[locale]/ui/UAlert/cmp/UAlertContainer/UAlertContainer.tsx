'use client';

import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';

import styles from '../../style/ualert.module.scss';
import UAlert, { AlertType } from './ualert';

export interface Alert {
  type: AlertType;
  message: React.ReactNode;
}

export type AlertPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left';

export interface AlertContainerRef {
  addAlert: (type: AlertType, message: React.ReactNode) => void;
}

interface UAlertContainerProps {
  position?: AlertPosition;
}

const UAlertContainer = forwardRef<AlertContainerRef, UAlertContainerProps>(
  ({ position = 'top-right' }, ref) => {
    const [alerts, setAlerts] = useState<Alert[]>([]);

    const addAlert = useCallback(
      (type: AlertType, message: React.ReactNode) => {
        setAlerts((currentAlerts) => [...currentAlerts, { type, message }]);
      },
      [],
    );

    const removeAlert = useCallback((index: number) => {
      setAlerts((currentAlerts) => currentAlerts.filter((_, i) => i !== index));
    }, []);

    useImperativeHandle(ref, () => ({ addAlert }));

    return (
      <div className={`${styles.container} ${styles[`alert-${position}`]}`}>
        {alerts.map((alert, index) => (
          <UAlert
            key={index}
            id={`alert-${index}`}
            type={alert.type}
            message={alert.message}
            onClose={() => removeAlert(index)}
          />
        ))}
      </div>
    );
  },
);

UAlertContainer.displayName = 'UAlertContainer';
export default UAlertContainer;
