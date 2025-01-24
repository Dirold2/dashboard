import { Item } from '@ui/Grid';
import { Skeleton } from '@ui/Skeleton';
import { Metadata } from 'next';
import { JSX } from 'react/jsx-runtime';

export const metadata: Metadata = {
  title: 'Charter',
};

export default function Loading(): JSX.Element {
  return (
    <main className="center">
      <div style={{ width: '100%' }}>
        <Item>
          <Skeleton
            height="23rem"
            pulse={false}
            waveLines={false}
            backgroundColor="none"
          />
        </Item>
        <br />
        <Item>
          <Skeleton
            height="23rem"
            pulse={false}
            waveLines={false}
            backgroundColor="none"
          />
        </Item>
        <br />
        <Item>
          <Skeleton
            height="12rem"
            pulse={false}
            waveLines={false}
            backgroundColor="none"
          />
        </Item>
        <br />
        <Item>
          <Skeleton
            height="23rem"
            pulse={false}
            waveLines={false}
            backgroundColor="none"
          />
        </Item>
      </div>
    </main>
  );
}
