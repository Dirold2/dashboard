import Link from 'next/link'
 
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