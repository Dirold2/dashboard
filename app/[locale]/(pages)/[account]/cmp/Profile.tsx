'use client';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';
import { JSX } from 'react/jsx-runtime';

const Page: React.FC = (): JSX.Element => {
  const { data: session } = useSession();
  const t = useTranslations('Account');

  const userImage = session?.user?.image?.replace(/"/g, '') || '';

  return (
    <div>
      <div>
        {t('welcome')} {session?.user?.name}!
      </div>
      <div style={{ margin: '20px' }}>
        <div>
          <Image
            src={
              userImage
                ? userImage
                : `https://ui-avatars.com/api/?format=svg&size=128&name=${session?.user?.name}`
            }
            alt="userImageAlt"
            width={100}
            height={100}
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
