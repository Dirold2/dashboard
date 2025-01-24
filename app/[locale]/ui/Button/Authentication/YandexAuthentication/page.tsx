'use client';
import { signIn } from 'next-auth/react';
import { JSX } from 'react/jsx-runtime';

import styles from '../../style/button.module.scss';

const Authentication = (): JSX.Element => {
  return (
    <button
      onClick={() => signIn(`yandex`)}
      className={`${styles['button']} ${styles['Yandex_Button']}`}
    >
      <i className="fa-brands fa-yandex"></i> Yandex
    </button>
  );
};

export default Authentication;
