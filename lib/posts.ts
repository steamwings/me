import path from 'path'
import yaml from 'js-yaml'
import { promises as fs } from 'fs'
import { cache } from 'react'

export const POSTS_DIR = path.join(process.cwd(), 'app', 'blog');

async function _listPosts() {
  const files = await fs.readdir(POSTS_DIR, { recursive: true })
  const postData = await Promise.all(files
    .filter(file => file.endsWith('.yml'))
    .map(async (file) => {
      const qualifiedDir = path.dirname(file);
      const parentDir = path.basename(qualifiedDir);
      file.split('/').slice(-2,-1)[0]
      return {
        slug: parentDir,
        yml: await fs.readFile(path.join(POSTS_DIR, file)),
        content: await fs.readFile(path.join(POSTS_DIR, qualifiedDir, 'page.md'))
      }
    }));
  return postData.map(({slug, yml, content}) => {
    const metadata = <object>yaml.load(yml.toString());
    return <Post>{ content: content.toString(), ...metadata, slug };
  });
}

export async function getPost(slug: string) {
  const post = await listPosts().then(posts =>
    posts.find(post => post.slug === slug)
  );
  if(post === undefined) { // thrown at SSR time
    throw new Error(`Post with slug ${slug} not found`);
  }
  return post;
}

export const listPosts = cache(_listPosts);
