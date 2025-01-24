'use client';
import { signIn } from 'next-auth/react';
import { JSX } from 'react/jsx-runtime';

import styles from '../../style/button.module.scss';

const Authentication = (): JSX.Element => {
  return (
    <button
      onClick={() => signIn(`discord`)}
      className={`${styles['button']} ${styles['Discord_Button']}`}
    >
      <i className="fa-brands fa-discord"></i> Discord
    </button>
  );
};

export default Authentication;
