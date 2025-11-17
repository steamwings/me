import { toLocaleDate } from 'lib/format'
import utilStyles from 'styles/utils.module.css'

export default function Post({metadata, children}: {metadata: {title: string, written: string, updated: string}, children: React.ReactNode}) {
  return (
    <section>
      <h1 className={utilStyles.headingLg}>
        {metadata.title}
      </h1>
      <p className={utilStyles.lightText}>
        written {toLocaleDate(new Date(metadata.written))} | updated {toLocaleDate(new Date(metadata.updated))}
      </p>
      {children}
    </section>
  )
}
