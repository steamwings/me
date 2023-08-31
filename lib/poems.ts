import path from 'path'
import { promises as fs } from 'fs'
import { cache } from 'react'

export const POEM_DIR = path.join(process.cwd(), 'public', 'poems');

async function _listPoems() {
  const files = await fs.readdir(POEM_DIR);
  return files.map(file => ({ title: file.split('.')[0] }) );
}

export async function getPoem(title: string) {
  const file = await fs.readFile(path.join(POEM_DIR, `${title}.txt`), 'utf-8');
  return { title, content: file };
}

export const listPoems = cache(_listPoems);
