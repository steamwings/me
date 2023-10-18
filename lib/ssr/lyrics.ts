import path from 'path'
import {promises as fs} from 'fs'
import {cache} from 'react'
export const MY_LYRICS_DIR = path.join(process.cwd(), 'private', 'my_lyrics');
export const NOT_MY_LYRICS_DIR = path.join(process.cwd(), 'private', 'not_my_lyrics');

async function listLyricFiles(dir : string, attrs : {
  mine : boolean
}) {
  const files = await fs.readdir(dir);
  return files.map(file => ({
    title: file.split('.')[0],
    ...attrs
  }));
}

async function _listMyLyrics() {
  return listLyricFiles(MY_LYRICS_DIR, {mine: true});
}

async function _listLyrics() {
  const notMyLyrics = await listLyricFiles(NOT_MY_LYRICS_DIR, {mine: false});
  const myLyrics = await listMyLyrics();
  return notMyLyrics.concat(myLyrics);
}

export async function getLyric(title : string) {
  const lyric = (await listLyrics()).find(lyric => lyric.title === title);
  if (lyric == undefined) 
    throw new Error(`No lyrics found for ${title}`);
  
  const mine = lyric.mine;
  const dir = mine ? MY_LYRICS_DIR : NOT_MY_LYRICS_DIR;
  const content = await fs.readFile(path.join(dir, `${title}.txt`), 'utf-8');
  return {content, mine};
}

export const listMyLyrics = cache(_listMyLyrics);
export const listLyrics = cache(_listLyrics);
