import { listLyrics, getLyric } from 'lib/ssr/lyrics';
import Song from 'components/song';
import Layout from 'components/layout'
import { Destination } from 'lib/nav';

export default async function Page(props) {
  const params = await props.params;
  const { title } = params
  const { content, mine: _mine } = await getLyric(title);
  return (
    <Layout>
      <Song name={title}
            lyrics={content}/>
    </Layout>
  )
}

export async function generateStaticParams() {
  return listLyrics()
}
