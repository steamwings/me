import Layout from 'components/layout';
import utilStyles from 'styles/utils.module.css'
import { listPoems, getPoem } from 'lib/poems';

export default async function Page({ params }) {
  const { title } = params
  const { content } = await getPoem(title);
  return (
    <Layout>
      <h1>{title.replaceAll('_',' ')}</h1>
      <p className={utilStyles.preline}>{content}</p>
    </Layout>
  )
}

export async function generateStaticParams() {
  return listPoems()
}
