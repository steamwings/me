import Layout from 'components/layout';
import styles from 'styles/blog.module.css'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Layout>
      {/* TODO Include shared blog sidebar */}
      <section className={styles.root}>
        {children}
      </section>
    </Layout>
  )
}
