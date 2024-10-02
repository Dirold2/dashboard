'use client';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useSession } from 'next-auth/react';
import React, { useRef } from 'react';
import { UAlertContainer, AlertContainerRef } from '@ui/UAlert';

const Page: React.FC = (): JSX.Element => {
  const { data: session } = useSession();
  const t = useTranslations('Account');
  const alertContainerRef = useRef<AlertContainerRef | null>(null);

  const userImage = session?.user?.image?.replace(/"/g, '') || '';

  const showAlert = (): void => {
    alertContainerRef.current?.addAlert(
      'error',
      <span> Это новое сообщение</span>,
    );
  };

  return (
    <div>
      <div>
        {t('welcome')} {session?.user?.name}!
      </div>
      <div>
        <div>
          <Image
            src={userImage ?  userImage : `https://ui-avatars.com/api/?format=svg&size=128&name=${session?.user?.name}`}
            alt="userImageAlt"
            width={100}
            height={100}
            priority
          />
        </div>
      </div>
      {/* Дополнительная информация о профиле, доступная только аутентифицированным пользователям */}
      <button onClick={showAlert}>Показать новое сообщение</button>
      <UAlertContainer ref={alertContainerRef} />
    </div>
  );
}

export default Page;