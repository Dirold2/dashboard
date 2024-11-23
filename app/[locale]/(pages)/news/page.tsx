import { Grid, Item } from '@ui/Grid';
import styles from '@styles/news.module.css';
import Image from 'next/image';
import { Metadata } from 'next';
import { JSX } from 'react/jsx-runtime';

export const metadata: Metadata = {
  title: 'News',
};

async function fetchFacts(): Promise<string[]> {
  const requests = Array.from({ length: 20 }, () =>
    fetch(`https://catfact.ninja/fact`, { cache: 'no-store' }).then(res => res.json())
  );

  const responses = await Promise.all(requests);
  const facts = responses.map(response => response.fact);

  // Удаляем дубликаты и добавляем случайные факты, если их меньше 20
  const uniqueFacts = Array.from(new Set(facts));
  while (uniqueFacts.length < 20) {
    uniqueFacts.push(`Generated Fact #${uniqueFacts.length + 1}`);
  }

  return uniqueFacts;
}

export default async function NewsBlock(): Promise<JSX.Element> {
  const facts = await fetchFacts();

  return (
    <main className='center'>
      <Grid style={{maxWidth: `80%`}} cols={2}>
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
}
