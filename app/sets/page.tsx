import Layout from 'components/layout'
import { listSets } from 'lib/ssr/sets';
import { toLongDate } from 'lib/format';

export default async function Page({ params }) {
  const sets = await listSets();
  return (
    <Layout>
      <h1>Some worship sets</h1>
      <ul>
        {sets.reverse().map(({id}) => (
          <li key={id}>
            <a href={`/sets/${id}`}>{toLongDate(id)}</a>
          </li>
        ))}
      </ul>
    </Layout>
  )
}
