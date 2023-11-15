import ReactMarkdown from 'react-markdown'
import { toLocaleDate } from 'lib/format'
import utilStyles from 'styles/utils.module.css'
import { h3 } from 'lib/anchors'

export default function Post({post}: {post: Post}) {
  return (
    <section>
      <h1 className={utilStyles.headingLg}>
        {post.title}
      </h1>
      <p className={utilStyles.lightText}>
        written {toLocaleDate(post.written)} | updated {toLocaleDate(post.updated)}
      </p>
      <ReactMarkdown
        components={{
          h3: h3,
        }}
      >{post.content}</ReactMarkdown>
    </section>
  )
}
