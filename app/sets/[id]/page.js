
import Layout from 'components/layout'
import Song from 'components/song'
import utilStyles from 'styles/utils.module.css'
import { Destination } from 'lib/nav';
import { getSet, listSets } from 'lib/sets'

export default async function set({ params }) {
  const { id } = params
  const { title, note, readings, songs } = await getSet(id)
  return (
    <Layout backNav={Destination.None}>
      <h1>{title}</h1>
      <p className={utilStyles.note}>{note} &nbsp;</p>
      { readings && readings.length > 0 &&
        <div>
          <h3>Recommended Readings</h3>
          <ul>
            {
              readings.map(r => (<li key={r}>{r}</li>))
            }
          </ul>
        </div>
      }
      { songs && songs.length > 0 &&
        <div>
          <h3>Lyrics</h3>
          {
            songs.map((song) => (<div key={song.name}>

              <Song name={song.name}
                    lyrics={song.lyrics}>
              </Song>
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
