'use client';

import { UAlertContainer, useAlerts } from '@ui/UAlert';
import React, { createContext, ReactNode, useContext } from 'react';

const AlertContext = createContext<ReturnType<typeof useAlerts> | null>(null);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const alerts = useAlerts();

  return (
    <AlertContext.Provider value={alerts}>
      {children}
      <UAlertContainer ref={alerts.alertContainerRef} />
    </AlertContext.Provider>
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useAlertContext = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlertContext must be used within an AlertProvider');
  }
  return context;
};
