import { signIn } from 'next-auth/react';
import { JSX } from 'react/jsx-runtime';

import styles from '../style/button.module.scss';

type Params = Promise<{ id: string; name: string }>;

const Authentication = async ({
  params,
}: {
  params: Params;
}): Promise<JSX.Element> => {
  return (
    <button
      onClick={async () => signIn(`${(await params).id}`)}
      className={`${styles['button']} ${
        styles[`${(await params).name}_Button`]
      }`}
    >
      <i className={`fa-brands fa-${(await params).id}`}></i>{' '}
      {(await params).name}
    </button>
  );
};

export default Authentication;
