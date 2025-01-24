import { Grid, Item } from '@ui/Grid';
import { Metadata } from 'next';
import Link from 'next/link';
import { JSX } from 'react';

import styles from '@styles/projects.module.scss';

interface Project {
  name: string;
  products: Product[];
}

interface Product {
  name: string;
  version: string;
}

const projects: Project[] = [
  {
    name: 'minecraft',
    products: [
      {
        name: 'Lost Souls Optimize',
        version: '1.14.2'
      },
      {
        name: 'END DAY',
        version: '0.0.1'
      }
    ]
  }
];

export const metadata: Metadata = {
  title: 'Projects',
};

type Params = Promise<{ locale: string }>

export default async function Page({ params }: { params: Params }): Promise<JSX.Element> {
  return (
    <main className="center">
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {projects.map((project, index) => (
          <div
            key={index}
            style={{
              background: 'var(--background-back)',
              height: '100%',
              padding: '20px',
              margin: '20px',
              borderRadius: 'var(--border-radius)',
            }}
          >
            <h2>{project.name.toUpperCase()}</h2>
            <br />
            <Grid flow="row">
              {project.products.map(async (product: Product, index) => (
                <Item colSpan={3} key={index}>
                  <div style={{ minWidth: '12em', height: '4rem' }}>
                    <h2>{product.name}</h2>
                    <span className={styles.version}>{product.version}</span>
                    <Link href={`/${(await params).locale}/projects/${product.name}`}>
                      <span className={styles.button}>
                        <i className="bi bi-arrow-down-right" />
                      </span>
                    </Link>
                  </div>
                </Item>
              ))}
            </Grid>
          </div>
        ))}
      </div>
    </main>
  );
}