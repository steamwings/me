import Layout from '../../components/layout';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <Layout>
        {/* TODO Include shared blog sidebar */}
        {children}
      </Layout>
    </section>
  )
}
