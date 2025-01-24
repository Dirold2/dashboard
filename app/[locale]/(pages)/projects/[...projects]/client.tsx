'use client'

import { useState } from 'react';
import { JSX } from 'react/jsx-runtime';

import styles from '@styles/projects.module.scss';

export default function ProjectDownload({ fileUrl }: { fileUrl: string }): JSX.Element {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(fileUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Ошибка при копировании ссылки:', error);
    }
  };

  return (
    <div className={styles.projects}>
      <span className={styles.projectsText}>{fileUrl}</span>
      <button
        className={styles.projectsButton}
        onClick={copyToClipboard}
        style={{ cursor: 'pointer' }}
      >
        <i className={`bi ${isCopied ? 'bi-check' : 'bi-copy'}`} />
      </button>
    </div>
  );
}