import React from 'react';
import { Grid, Item } from '@ui/Grid';
import ld from '@styles/loader.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'News',
};

interface LoadingProps {
  count: number;
}

const Loading: React.FC<LoadingProps> = ({ count }) => {
  return (
    <main>
      <Grid cols={2}>
        {Array.from({ length: count }).map((_, index) => (
          <Item key={index}>
            <div className={ld.loader}>
              <div className={ld.wrapper}>
                <div className={ld.circle} />
                <div className={ld.line_1} />
                <div className={ld.line_2} />
                <div className={ld.line_3} />
                <div className={ld.line_4} />
                <div className={ld.line_5} />
                <div className={ld.line_6} />
              </div>
            </div>
          </Item>
        ))}
      </Grid>
    </main>
  );
};

export default Loading;
