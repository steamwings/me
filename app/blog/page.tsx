import { listPosts } from '../../lib/posts';

export default async function Page({ params }) {
  const posts = await listPosts();
  return (
    <div>
      <h1>A blog</h1>
      <p> A place for meandering thoughts of questionable value on disparate topics. </p>
      <ul>
        {posts.map(post => (
          <li key={post.slug}>
            <a href={`/blog/${post.slug}`}>{post.title}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
