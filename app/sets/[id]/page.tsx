
import Layout from 'components/layout'
import Link from 'next/link'
import utilStyles from 'styles/utils.module.css'
import { dehumanize } from 'lib/format'
import { Destination } from 'lib/nav';
import { getSet, listSets } from 'lib/ssr/sets'

export default async function set({ params }) {
  const { id } = params
  const { title, note, readings, songs } = await getSet(id)
  return (
    <Layout backNav={Destination.None}>
      <h1>{title}</h1>
      <p className={utilStyles.note}>{note} &nbsp;</p>
      { readings && readings.length > 0 &&
        <div className={utilStyles.preline}>
          <h3>Readings</h3>
          <ul>
            {
              readings.map(r => {
                if (r.url !== undefined) {
                  return (<li key={r}>
                    <Link href={r.url}>{r.id}</Link>
                  </li>);
                }
                return (<li key={r}>
                  {r.id}
                </li>);
              })
            }
          </ul>
        </div>
      }
      { songs && songs.length > 0 &&
        <div>
          <h3>Lyrics</h3>
          <ul>
            {
              songs.map((song) => (<li key={song.name}>
                <Link href={"/lyrics/" + dehumanize(song.name)}>
                  {song.name}
                </Link>
              </li>))
            }
          </ul>
        </div>
      }
    </Layout>
  )
}

export async function generateStaticParams() {
  return listSets()
}
