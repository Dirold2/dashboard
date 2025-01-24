import { Skeleton } from '@ui/Skeleton';
import { Metadata } from 'next';
import { JSX } from 'react/jsx-runtime';

export const metadata: Metadata = {
	title: 'Progects',
};

const count = 2;

export default function Loading(): JSX.Element {
	return <main className="center">
		<div style={{display: 'flex', flexWrap: 'wrap'}}>
			{[0, 1, ...Array(count - 2).fill(0)].map((_, index) => (
				<div key={index} style={{background: '#333', padding: '20px', margin: '20px', borderRadius: 'var(--border-radius)'}}>
					<Skeleton width="17rem" height="2rem" /><br />
					<Skeleton width="17rem" height="6rem" />
				</div>
			))}
		</div>
	</main>
}