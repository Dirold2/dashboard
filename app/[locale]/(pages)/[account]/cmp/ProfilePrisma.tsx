import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Skeleton } from '@ui/Skeleton';
import { useRouter } from 'next/navigation';
import { getCookie } from '@cmp/Utils';
import React from 'react';

interface AccountData {
  name: string;
  image: string;
}

function Page({ params }: { params: { account: string } }): JSX.Element {

  const locale = getCookie('NEXT_LOCALE');

  const [accountData, setAccountData] = useState<AccountData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async (): Promise<void> => {
      const host = `${process.env.PUBLIC_HOSTNAME}`;
      setIsLoading(true);
      try {
        const response = await fetch(`${host}/api/account/${params.account}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setAccountData(data);
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        router.push(`/${locale}/error`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, [locale, params.account, router]);

  const name = accountData?.name || 'Loading...';
  const userImage = accountData?.image?.replace(/"/g, '') || '';

  if (isLoading) {
    return (
      <div>
        <div className="center">
          <Skeleton width="50px" height="20px" />
        </div>
        <div>
          <div>
            <Skeleton width="100px" height="100px" />
          </div>
        </div>
      </div>
    );
  }

  if (accountData) {
    return (
      <div>
        <div>{name}</div>
        <div>
          <div>
            <Image
              src={userImage ?  userImage : `https://ui-avatars.com/api/?format=svg&size=128&name=${name}`}
              alt={'userImageAlt'}
              width={100}
              height={100}
              priority
            />
          </div>
        </div>
      </div>
    );
  }

  return <></>;
}

export default Page;