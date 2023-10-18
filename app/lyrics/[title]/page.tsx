import { listLyrics, getLyric } from 'lib/ssr/lyrics';
import Song from 'components/song';

export default async function Page({ params }) {
  const { title } = params
  const { content, mine: _mine } = await getLyric(title);
  return (
    <Song name={title}
          lyrics={content}/>
  )
}

export async function generateStaticParams() {
  return listLyrics()
}
