import { JSX } from 'react';

import styles from './style/header.module.scss';

export default async function Loading(): Promise<JSX.Element> {
  return <span className={styles.search}>Loading...</span>;
}
