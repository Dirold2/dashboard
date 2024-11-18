'use client';
import { JSX } from 'react/jsx-runtime';
import styles from '../../style/button.module.css';
import { signIn } from 'next-auth/react';

const Authentication = (): JSX.Element => {
  return (
    <button
      onClick={() => signIn(`github`)}
      className={`${styles['button']} ${styles['GitHub_Button']}`}
    >
      <i className={`bi bi-github`}></i> GitHub
    </button>
  );
};

export default Authentication;
