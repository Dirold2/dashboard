'use client';
import React, { createContext, ReactNode, useCallback, useState } from 'react';

interface Notification {
  id: number;
  message: string;
}

interface NotificationContextValue {
  notifications: Notification[];
  addNotification: (message: string) => void;
  removeNotification: (id: number) => void;
  removeAllNotifications: () => void;
  notificationCount: number;
}

interface NotificationProviderProps {
  children: ReactNode;
}

const NotificationContext = createContext<NotificationContextValue | undefined>(
  undefined,
);

const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((message: string) => {
    const id = Date.now();
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      { id, message },
    ]);
  }, []);

  const removeNotification = useCallback((id: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id),
    );
  }, []);

  const removeAllNotifications = (): void => {
    notifications.forEach((notification) => {
      removeNotification(notification.id);
    });
  };

  const notificationCount = notifications.length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        removeNotification,
        removeAllNotifications,
        notificationCount,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
