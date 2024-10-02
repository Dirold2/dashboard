'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

import Order from './cmp/Button';
import Profile from './cmp/Profile';
import ProfilePrisma from './cmp/ProfilePrisma';

import { Grid, Item } from '@ui/Grid';
import { getSecondPathPart } from '@cmp/Utils';
import { NotificationButton, SignOutAuthentication } from '@ui/Button';
import { Skeleton } from '@ui/Skeleton';

const MemoizedProfile = React.memo(Profile);
const MemoizedProfilePrisma = React.memo(ProfilePrisma);

function Page({ params }: { params: { account: string } }): JSX.Element {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const path = getSecondPathPart(pathname);

  if (status === 'loading') {
    return <main className={`center`}>
      <div className="center">
        <Skeleton width="50px" height="20px" />
      </div>
      <div>
        <div>
          <Skeleton width="100px" height="100px" />
        </div>
      </div>
    </main>;
  }

  return (
    <>
      <main className={`center`}>
        <Grid cols={200}>
          {`/${session?.user.name}` === path? (
            <Item>
              <MemoizedProfile />
            </Item>
          ) : (
            <Item>
              <MemoizedProfilePrisma params={params} />
            </Item>
          )}

          {session && `/${session?.user.name}` === path && (
            <Item>
              <SignOutAuthentication />
              <Order />
              <NotificationButton />
            </Item>
          )}
        </Grid>
      </main>
    </>
  );
}

export default Page;