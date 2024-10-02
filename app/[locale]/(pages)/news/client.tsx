import React from 'react';
import { Grid, Item } from '@ui/Grid';
import styles from '@styles/news.module.css';
import Loading from './loading';
import Image from 'next/image';

interface ClientProps {
  facts: string[];
  isLoading: boolean;
}

const Client: React.FC<ClientProps> = ({ facts, isLoading }) => {
  if (!isLoading) {
    return <Loading count={20} />;
  }

  return (
    <main className={`center`}>
      <Grid cols={250}>
        {facts.map((fact, index) => (
          <Item key={index}>
            <div className={styles.newsBlock}>
              <div className={styles.newsBlockTitle}>
                <Image
                  src={`https://placehold.co/200x300`}
                  alt={`Random Kitten ${index + 1}`}
                  width={200}
                  height={300}
                />
                <h2>Fact #{index + 1}</h2>
              </div>
              <p>{fact}</p>
            </div>
          </Item>
        ))}
      </Grid>
    </main>
  );
};

export default Client;
