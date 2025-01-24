import { SignOutAuthentication } from '@ui/Button';
import { Grid, Item } from '@ui/Grid';
import { Metadata } from 'next';
// import Order from './cmp/Button';
import React from 'react';
// import { UseAccountClient } from './client';
import { JSX } from 'react/jsx-runtime';

import { auth } from '.auth/auth';
import Profile from './cmp/Profile';
import ProfilePrisma from './cmp/ProfilePrisma';

const MemoizedProfile = React.memo(Profile);
const MemoizedProfilePrisma = React.memo(ProfilePrisma);

export const metadata: Metadata = {
  title: 'Account',
};

export default async function Page({
  params,
}: {
  params: Promise<{ account: string }>;
}): Promise<JSX.Element> {
  const session = await auth();
  const account = (await params).account;

  return (
    <main className="center">
      <Grid>
        <Item>
          {session?.user ? (
            <MemoizedProfile />
          ) : (
            <MemoizedProfilePrisma account={account} />
          )}
        </Item>

        {session && (
          <Item>
            <SignOutAuthentication />
            {/* <Order /> */}
          </Item>
        )}
      </Grid>
    </main>
  );
}
