'use client';

import { FormLogin, FormRegister } from '@component/Form';
import { Authentication } from '@ui/Button';
import { Grid, Item } from '@ui/Grid';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import { JSX } from 'react/jsx-runtime';

type ProviderStyle = {
  bg: string;
  text: string;
};

type Provider = Promise<{
  id: string;
  name: string;
  style: ProviderStyle;
}>;

function ClientComponent(): JSX.Element {
  const t = useTranslations(``);

  const [isRegistered, setIsRegistered] = useState(false);
  const [providers, setProviders] = useState<Provider[]>([]);

  const toggleRegister = (): void => setIsRegistered(!isRegistered);

  useEffect(() => {
    const fetchProviders = async (): Promise<void> => {
      try {
        const response = await fetch(`/api/provider`);
        if (!response.ok) {
          throw new Error('Failed to fetch provider data');
        }
        const data: Provider[] = await response.json();
        setProviders(
          data.filter((provider): provider is Provider => provider !== null),
        );
      } catch (error) {
        console.error('Error fetching provider data:', error);
      }
    };

    fetchProviders();
  }, []);

  return (
    <>
      <main className="center">
        <div style={{ width: `100%` }}>
          {isRegistered ? <FormRegister /> : <FormLogin />}

          <hr />
          <div className="center">
            <button onClick={toggleRegister}>
              {isRegistered ? t(`Login.Login`) : t(`Login.Register`)}
            </button>
          </div>
        </div>
      </main>
      {providers ? (
        <main className="center">
          <Grid flow="column">
            <Item>
              {providers.map((provider, index) => (
                <Authentication key={index} params={provider} />
              ))}
            </Item>
          </Grid>
        </main>
      ) : (
        []
      )}
    </>
  );
}

export default ClientComponent;
