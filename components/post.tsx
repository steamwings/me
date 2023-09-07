import { toLongDate } from '../lib/format'
import utilStyles from '../styles/utils.module.css'

export default function Post({children, metadata}: {children: any, metadata: PostMetadata}) {
  return (
    <section>
      <h1>{metadata.title}</h1>
      <p className={utilStyles.lightText}>
        written {toLongDate(metadata.written)}
      </p>
      <p className={utilStyles.lightText}>
        last updated {toLongDate(metadata.updated)}
      </p>
      <p className={utilStyles.preline}>
        {children}
      </p>
    </section>
  )
}
