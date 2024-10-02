'use client';
import React, { useState, forwardRef, useCallback, useMemo } from 'react';
import { UAlert } from '@ui/UAlert';
import styles from '../../style/ualert.module.css';

export interface Alert {
  type: 'info' | 'success' | 'warning' | 'error';
  message: React.ReactNode;
}

export interface AlertContainerRef {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  addAlert: (
    type: 'info' | 'success' | 'warning' | 'error',
    message: React.ReactNode,
  ) => void;
}

interface UAlertContainerProps {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'; // Добавлены пропсы для позиции
}

const UAlertContainer = forwardRef<AlertContainerRef, UAlertContainerProps>(
  ({ position = 'top-right' }, ref) => {
    const [alerts, setAlerts] = useState<Alert[]>([]);

    const addAlert = useCallback(
      (
        type: 'info' | 'success' | 'warning' | 'error',
        message: React.ReactNode,
      ) => {
        setAlerts((currentAlerts) => [...currentAlerts, { type, message }]);
      },
      [],
    );

    React.useImperativeHandle(ref, () => ({
      addAlert,
    }));

    const alertContainerClass = useMemo(
      () => `${styles.AlertContainer} ${styles[`alert-${position}`]}`,
      [position],
    );

    return (
      <div className={alertContainerClass}>
        {alerts.map((alert, index) => (
          <UAlert
            id={`${index}`}
            key={index}
            type={alert.type}
            message={alert.message}
            onClose={() =>
              setAlerts((currentAlerts) =>
                currentAlerts.filter((_, alertIndex) => alertIndex !== index),
              )
            }
          />
        ))}
      </div>
    );
  },
);

UAlertContainer.displayName = 'UAlertContainer';

export default UAlertContainer;
