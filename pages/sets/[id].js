import { promises as fs } from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import Layout from '../../components/layout'
import Song from '../../components/song'
import utilStyles from '../../styles/utils.module.css'

export default function set({ title, readings, songs }) {
  return (
    <Layout hideBackToHome>
      <h1>{title}</h1>
      <p className={utilStyles.note}>Thanks for joining us!&nbsp;</p>
      <div>
       <h3>Recommended Readings</h3>
        <ul>
          {
            readings.map(r => (<li key={r}>{r}</li>))
          }
        </ul> 
      </div>
      {
        songs.map((song) => (<div key={song.name}>
          <h3>Lyrics</h3>
          <Song name={song.name} 
                lyrics={song.lyrics}>
          </Song>
        </div>))
      }
    </Layout>
  )
}

export async function getStaticProps(context) {
  const { id } = context['params']
  const setDir = path.join(process.cwd(), 'private', 'sets');
  const content = yaml.load(await fs.readFile(setDir + '/' + id + '.yml'));
  const { title, readings, songs } = content;

  const songDir = path.join(process.cwd(), 'public', 'lyrics');
  const songObjs = await Promise.all(songs.map(async (song) => {
    const fileContents = await fs.readFile(songDir + '/' + song + '.txt', 'utf8');
    return {
      name: song.split('_').map(s => s[0].toUpperCase() + s.substring(1)).join(' '), // TODO How to put this in a function?
      lyrics: fileContents
    }
  }))

  return {
    props: { title, readings, songs: songObjs }
  }
}

export async function getStaticPaths() {
  console.log('getStaticPaths')
  const dir = path.join(process.cwd(), 'private', 'sets');
  const files = await fs.readdir(dir);
  const result = files.map((f) => ({params: {id: f.split('.')[0]}}))

  return {
    paths: result,
    fallback: false
  }
}