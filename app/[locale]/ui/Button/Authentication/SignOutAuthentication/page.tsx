'use client';
import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { JSX } from 'react/jsx-runtime';

import styles from '../../style/button.module.scss';

const Authentication = (): JSX.Element => {
  const t = useTranslations('Login');

  return (
    <button
      onClick={() => signOut()}
      className={`${styles['button']} ${styles['SignOut_Button']}`}
    >
      {t('LogOut')}
    </button>
  );
};

export default Authentication;
