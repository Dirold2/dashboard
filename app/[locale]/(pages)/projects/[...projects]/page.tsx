import { Item } from '@ui/Grid';
import { Metadata } from 'next';
import Link from 'next/link';
import { JSX } from 'react';

import { hostNameFiles } from '@config';
import styles from '@styles/projects.module.scss';

import ProjectDownload from './client';

export const metadata: Metadata = {
  title: 'Projects',
};

export default async function Page({
  params,
}: {
  params: Promise<{ projects: string }>;
}): Promise<JSX.Element> {
  const projects = decodeURIComponent((await params).projects);
  const fileUrl = `${hostNameFiles}${projects}.zip`;

  return (
    <main className="center">
      <div
        style={{
          background: 'var(--background-back)',
          height: '100%',
          maxWidth: `80%`,
          padding: '20px',
          margin: '20px',
          borderRadius: 'var(--border-radius)',
        }}
      >
        <h2>{projects}</h2>
        <br />
        <Item style={{ padding: '2rem' }}>
          <div style={{width: `100%`}}>
            <ProjectDownload fileUrl={fileUrl} />
            <Link href={fileUrl}>
              <span className={styles.button}>
                <i className="bi bi-download" />
              </span>
            </Link>
          </div>
        </Item>
      </div>
    </main>
  );
}