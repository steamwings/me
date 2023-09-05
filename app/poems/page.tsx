import Layout from '../../components/layout'
import { listPoems } from '../../lib/poems';
import { humanize } from '../../lib/format';

export default async function Page({ params }) {
  const poems = await listPoems();
  return (
    <Layout>
      <h1>A few poems</h1>
      <ul>
        {poems.map(({title}) => (
          <li key={title}>
            <a href={`/poems/${title}`}>{humanize(title)}</a>
          </li>
        ))}
      </ul>
    </Layout>
  )
}
