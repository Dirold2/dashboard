'use client';
import { signIn } from 'next-auth/react';
import { JSX } from 'react/jsx-runtime';

import styles from '../../style/button.module.scss';

const Authentication = (): JSX.Element => {
  return (
    <button
      onClick={() => signIn(`steam`)}
      className={`${styles['button']} ${styles['Steam_Button']}`}
    >
      <i className="fa-brands fa-square-steam"></i> Steam
    </button>
  );
};

export default Authentication;
