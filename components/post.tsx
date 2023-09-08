import ReactMarkdown from 'react-markdown'
import { toLocaleDate } from 'lib/format'
import utilStyles from 'styles/utils.module.css'

export default function Post({post}: {post: Post}) {
  return (
    <section>
      <h1>{post.title}</h1>
      <p className={utilStyles.lightText}>
        written {toLocaleDate(post.written)}
      </p>
      <p className={utilStyles.lightText}>
        last updated {toLocaleDate(post.updated)}
      </p>
      <ReactMarkdown>{post.content}</ReactMarkdown>
    </section>
  )
}
