'use client';
import { JSX } from 'react/jsx-runtime';
import styles from '../../style/button.module.css';
import { signIn } from 'next-auth/react';

const Authentication = (): JSX.Element => {
  return (
    <button
      onClick={() => signIn(`discord`)}
      className={`${styles['button']} ${styles['Discord_Button']}`}
    >
      <i className={`bi bi-discord`}></i> Discord
    </button>
  );
};

export default Authentication;
