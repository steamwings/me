import Layout from '../../../components/layout';
import { listPoems, getPoem } from '../../../lib/poems';

export default async function Page({ params }) {
  const { title } = params
  const { content } = await getPoem(title);
  return (
    <Layout>
      <h1>{title.replaceAll('_',' ')}</h1>
      <p style={{ whiteSpace: 'pre-wrap' }}>{content}</p>
    </Layout>
  )
}

export async function generateStaticParams() {
  return listPoems()
}
