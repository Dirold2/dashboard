'use client';

import { useCallback, useRef } from 'react';

import { AlertType } from './ualert';
import { AlertContainerRef } from './UAlertContainer';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useAlerts = () => {
  const alertContainerRef = useRef<AlertContainerRef>(null);

  const showAlert = useCallback((type: AlertType, message: React.ReactNode) => {
    alertContainerRef.current?.addAlert(type, message);
  }, []);

  return { alertContainerRef, showAlert };
};
