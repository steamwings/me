import { promises as fs } from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import { dehumanize, toLongDate } from '../format';

const SET_DIR = path.join(process.cwd(), 'private', 'sets');

export async function listSets() {
  const files = await fs.readdir(SET_DIR);
  return files.map(file => ({ id: file.split('.')[0] }) );
}

export async function getSet(id: string) {
  const content = await fs.readFile(path.join(SET_DIR, id + '.yml'))
  // @ts-ignore TODO fix types
  const { title, note, readings, songs } = yaml.load(content);

  const songDir = path.join(process.cwd(), 'private', 'lyrics');
  const songObjs = await Promise.all(songs.map(async (song) => {
    const fileName = songDir + '/' + dehumanize(song) + '.txt'
    const fileContents = await fs.readFile(fileName, 'utf8')
      .catch(_error => 'Failed to retrieve song lyrics. :(');
    return {
      name: song,
      lyrics: fileContents
    }
  }))

  return {
    title: title || toLongDate(id),
    note: note || "Thanks for joining us! Gracias por venir!",
    readings: readings || null,
    songs: songObjs
  }
}
