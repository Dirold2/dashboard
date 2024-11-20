import { Metadata } from 'next';
import { SignOutAuthentication } from '@ui/Button';
import { Grid, Item } from '@ui/Grid';
import Order from './cmp/Button';
import React from 'react';
import Profile from './cmp/Profile';
import ProfilePrisma from './cmp/ProfilePrisma';
import { auth } from '.auth/auth';
import { isUserPath } from './client';

const MemoizedProfile = React.memo(Profile);
const MemoizedProfilePrisma = React.memo(ProfilePrisma);

export const metadata: Metadata = {
  title: 'Account',
};

export default async function Page({
  params,
}: {
  params: Promise<{ account: string }>;
}) {
  const session = await auth()
  const account = (await params).account
  // Передаем параметры на клиентскую сторону
  return (
    <main className="center">
      <Grid>
        {/* Показываем профиль в зависимости от пути */}
        <Item>
          {isUserPath ? (
            <MemoizedProfile />
          ) : (
            <MemoizedProfilePrisma account={account} />
          )}
        </Item>

        {/* Кнопки доступны только для авторизованного пользователя на его странице */}
        {session && isUserPath && (
          <Item>
            <SignOutAuthentication />
            <Order />
          </Item>
        )}
      </Grid>
    </main>
  );
}
