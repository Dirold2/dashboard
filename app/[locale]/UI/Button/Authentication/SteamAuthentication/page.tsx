'use client';
import { JSX } from 'react/jsx-runtime';
import styles from '../../style/button.module.css';
import { signIn } from 'next-auth/react';

const Authentication = (): JSX.Element => {
  return (
    <button
      onClick={() => signIn(`steam`)}
      className={`${styles['button']} ${styles['Steam_Button']}`}
    >
      <i className={`bi bi-steam`}></i> Steam
    </button>
  );
};

export default Authentication;
