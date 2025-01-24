'use client';

import { DiscordAuthentication, GithubAuthentication } from '@ui/Button';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { JSX } from 'react/jsx-runtime';
import { Logger } from 'tslog';

import { hostName } from '@config';

const logger = new Logger();

function Order(): JSX.Element {
  const { data: session, status } = useSession();
  const [providerState, setProviderState] = useState<{
    providers: string[];
    isLoading: boolean;
  }>({
    providers: [],
    isLoading: true,
  });

  useEffect(() => {
    const fetchProviders = async (): Promise<void> => {
      if (status === 'authenticated') {
        try {
          const response = await fetch(`${hostName}${session.user.name}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setProviderState({ providers: data, isLoading: false });
        } catch (error) {
          logger.error('Error fetching providers:', error);
          setProviderState({ providers: [], isLoading: false });
        }
      } else {
        setProviderState({ providers: [], isLoading: false });
      }
    };

    fetchProviders();
  }, [status, session]);

  if (providerState.isLoading) {
    return <></>;
  }

  if (status === 'authenticated') {
    const { providers } = providerState;
    if (!providers.includes('discord')) {
      return <DiscordAuthentication />;
    }
    if (!providers.includes('github')) {
      return <GithubAuthentication />;
    }
  }

  return <></>;
}

export default Order;
