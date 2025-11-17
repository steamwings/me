import path from 'path'
import {promises as fs} from 'fs'
import matter from 'gray-matter'

export async function getPostMetadata(mdxPath: string) {
  const content = await fs.readFile(mdxPath, 'utf8')
  const { data } = matter(content)

  return {
    title: data.title as string,
    written: data.written as string,
    updated: data.updated as string,
  }
}
