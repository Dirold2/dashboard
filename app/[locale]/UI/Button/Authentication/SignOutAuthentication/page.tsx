'use client';
import { useTranslations } from 'next-intl';
import styles from '../../style/button.module.css';
import { signOut } from 'next-auth/react';
import { JSX } from 'react/jsx-runtime';

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
