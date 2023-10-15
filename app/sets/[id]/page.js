
import Layout from 'components/layout'
import Link from 'next/link'
import Song from 'components/song'
import ReactMarkdown from 'react-markdown'
import utilStyles from 'styles/utils.module.css'
import { dehumanize } from 'lib/format'
import { Destination } from 'lib/nav';
import { getSet, listSets } from 'lib/static/sets'

export default async function set({ params }) {
  const { id } = params
  const { title, note, readings, songs } = await getSet(id)
  return (
    <Layout backNav={Destination.None}>
      <h1>{title}</h1>
      <p className={utilStyles.note}>{note} &nbsp;</p>
      { readings && readings.length > 0 &&
        <div>
          <h3>Readings</h3>
          <ul>
            {
              // TODO ReactMarkdown here for links is lazy. Switch to YAML config
              readings.map(r => (<li key={r}>
                <ReactMarkdown>{r}</ReactMarkdown>
              </li>))
            }
          </ul>
        </div>
      }
      { songs && songs.length > 0 &&
        <div>
          <h3>Lyrics</h3>
          {
            songs.map((song) => (<div key={song.name}>
              <Link href={"/lyrics/" + dehumanize(song.name)}>
                {song.name}
              </Link>
            </div>))
          }
        </div>
      }
    </Layout>
  )
}

export async function generateStaticParams() {
  return listSets()
}
