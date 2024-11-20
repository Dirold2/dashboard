import { Metadata } from 'next';
import Link from 'next/link'
import { JSX } from 'react/jsx-runtime'
 
export const metadata: Metadata = {
  title: 'Not Found',
};

export default async function NotFound(): Promise<JSX.Element> {
  return (
    <div>
      <h2>Not Found: 404</h2>
      <p>Could not find requested resource</p>
      <p>
        View <Link href="/blog">all posts</Link>
      </p>
    </div>
  )
}