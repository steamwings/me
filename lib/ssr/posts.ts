import path from 'path'
import {promises as fs} from 'fs'
import {cache} from 'react'
import matter from 'gray-matter'

export const POSTS_DIR = path.join(process.cwd(), 'app', 'blog');

async function _listPosts() {
  const files = await fs.readdir(POSTS_DIR, {recursive: true})
  const postData = await Promise.all(files.filter(file => file.endsWith('content.mdx')).map(async (file) => {
    const qualifiedDir = path.dirname(file);
    const parentDir = path.basename(qualifiedDir);
    const content = await fs.readFile(path.join(POSTS_DIR, file), 'utf8')
    const { data } = matter(content)

    return {
      slug: parentDir,
      title: data.title,
      written: data.written,
      updated: data.updated,
    }
  }));

  return postData.sort((a, b) => new Date(b.written).getTime() - new Date(a.written).getTime());
}

export const listPosts = cache(_listPosts);
