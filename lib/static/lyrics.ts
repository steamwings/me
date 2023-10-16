import path from 'path'
import { promises as fs } from 'fs'
import { cache } from 'react'

export const MY_LYRICS_DIR = path.join(process.cwd(), 'private', 'my_lyrics');
export const NOT_MY_LYRICS_DIR = path.join(process.cwd(), 'private', 'not_my_lyrics');

async function _listMyLyrics() {
  const files = await fs.readdir(MY_LYRICS_DIR);
  return files.map(file => ({ title: file.split('.')[0], mine: true }) );
}

async function _listLyrics() {
  const files = await fs.readdir(NOT_MY_LYRICS_DIR);
  const myLyrics = await listMyLyrics();
  return files.map(file => ({ title: file.split('.')[0], mine: false }) ).concat(myLyrics);
}

export async function getLyric(title: string) {
  const mine = (await listLyrics()).find(lyric => lyric.title === title)?.mine || false;
  const dir = mine ? MY_LYRICS_DIR : NOT_MY_LYRICS_DIR;
  const content = await fs.readFile(path.join(dir, `${title}.txt`), 'utf-8');
  return { content, mine };
}

export const listMyLyrics = cache(_listMyLyrics);
export const listLyrics = cache(_listLyrics);
