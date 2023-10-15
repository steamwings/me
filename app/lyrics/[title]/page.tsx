import Layout from 'components/layout';
import { listLyrics, getLyric } from 'lib/static/lyrics';
import Song from 'components/song';

export default async function Page({ params }) {
  console.log(params)
  const { title, mine } = params
  const { title: _title, content, mine: _mine } = await getLyric(title, mine);
  return (
    <Song name={title}
          lyrics={content}>
    </Song>
  )
}

export async function generateStaticParams() {
  return listLyrics()
}
