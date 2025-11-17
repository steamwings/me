import Layout from 'components/layout'
import { listPoems } from 'lib/ssr/poems';
import { humanize } from 'lib/format';

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
        <li key="My Country 'Tis for Thee">
          <a href='/blog/my-country-tis-for-thee'>My Country 'Tis for Thee</a>
        </li>
      </ul>
    </Layout>
  )
}
