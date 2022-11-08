import { promises as fs } from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import Layout from '../../components/layout'
import Song from '../../components/song'
import utilStyles from '../../styles/utils.module.css'

export default function set({ title, note, readings, songs }) {
  return (
    <Layout hideBackToHome>
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

export async function getStaticProps(context) {
  const { id } = context['params']
  const setDir = path.join(process.cwd(), 'private', 'sets');
  const content = yaml.load(await fs.readFile(setDir + '/' + id + '.yml'));
  const { title, note, readings, songs } = content;

  const songDir = path.join(process.cwd(), 'public', 'lyrics');
  const songObjs = await Promise.all(songs.map(async (song) => {
    const fileName = songDir + '/' + dehumanize(song) + '.txt'
    const fileContents = await fs.readFile(fileName, 'utf8')
      .catch(error => 'Failed to retrieve song lyrics. :(');
    return {
      name: song,
      lyrics: fileContents
    }
  }))

  return {
    props: { 
      title: title || toLongDate(id), 
      note: note || "Thanks for joining us! Gracias por venir!", 
      readings: readings || null, 
      songs: songObjs }
  }
}

export async function getStaticPaths() {
  const dir = path.join(process.cwd(), 'private', 'sets');
  const files = await fs.readdir(dir);
  const result = files.map((f) => ({params: {id: f.split('.')[0]}}))

  return {
    paths: result,
    fallback: false
  }
}

function dehumanize(str) {
  return str.toLowerCase().replace(/\s/g, '_').replace(/[^\w]/g, '')
}

function toLongDate(id) {
  const date = Date.UTC(id.slice(0,4), id.slice(4,6) - 1, id.slice(6,8), 5, 0, 0)
  return new Date(date)
    .toLocaleDateString("en-US", 
    { year: 'numeric', month: 'long', day: 'numeric' }
  )
}