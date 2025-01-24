'use client';

import { getCookie } from '@component/Utils';
import { Skeleton } from '@ui/Skeleton';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { JSX, useEffect, useState } from 'react';

import { hostName } from '@config';

interface AccountData {
  name: string;
  image: string;
}

export default function Page({ account }: { account: string }): JSX.Element {
  const locale = getCookie('NEXT_LOCALE');
  const router = useRouter();

  const [accountData, setAccountData] = useState<AccountData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchUserData = async (): Promise<void | Error> => {
      setIsLoading(true);
      setError(false);
      try {
        const response = await fetch(`${hostName}/api/account/${account}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setAccountData(data);
      } catch {
        setError(true);
        router.push(`/${locale}/error`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [locale, account, router]);

  const name = accountData?.name || 'Loading...';
  const userImage =
    accountData?.image?.replace(/"/g, '') ||
    `https://ui-avatars.com/api/?format=svg&size=128&name=${name}`;

  if (isLoading) {
    return (
      <div>
        <div className="center">
          <Skeleton width="50px" height="20px" />
        </div>
        <div className="center">
          <Skeleton width="100px" height="100px" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <p>Failed to load user data. Please-in-out try again later.</p>
      </div>
    );
  }

  return (
    <div>
      <div>{name}</div>
      <div>
        <Image
          src={userImage}
          alt="User avatar"
          width={100}
          height={100}
          priority
        />
      </div>
    </div>
  );
}
