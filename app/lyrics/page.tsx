import Layout from 'components/layout'
import { listMyLyrics } from 'lib/ssr/lyrics';
import { humanize } from 'lib/format';

export default async function Page({ params }) {
  const lyrics = await listMyLyrics();
  return (
    <Layout>
      <h1>Some of my lyrics</h1>
      <ul>
        {lyrics.map(({title}) => (
          <li key={title}>
            <a href={`/lyrics/${title}`}>{humanize(title)}</a>
          </li>
        ))}
      </ul>
    </Layout>
  )
}
