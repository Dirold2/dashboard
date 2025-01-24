'use client';
import { signIn } from 'next-auth/react';
import { JSX } from 'react/jsx-runtime';

import styles from '../../style/button.module.scss';

const Authentication = (): JSX.Element => {
  return (
    <button
      onClick={() => signIn(`github`)}
      className={`${styles['button']} ${styles['GitHub_Button']}`}
    >
      <i className="fa-brands fa-github"></i> GitHub
    </button>
  );
};

export default Authentication;
