import path from 'path'
import yaml from 'js-yaml'
import { promises as fs } from 'fs'
import { cache } from 'react'

export const POSTS_DIR = path.join(process.cwd(), 'app', 'blog');

async function _listPosts() {
  const files = await fs.readdir(POSTS_DIR, { recursive: true })
  const metadata = await Promise.all(files
    .filter(file => file.endsWith('.yml'))
    .map(async (file) => ({
      slug: file.split('/').slice(-2,-1)[0], // gets directory name
      content: await fs.readFile(path.join(path.join(POSTS_DIR, file)))
    })));
  return metadata.map(({slug, content}) => {
    const metadata = <object>yaml.load(content.toString());
    return <PostMetadata> {...metadata, slug};
  });
}

// TODO handle undefined case
export async function getPostMetadata(slug: string) {
  return listPosts().then(posts =>
    posts.find(post => post.slug === slug)
  );
}

export const listPosts = cache(_listPosts);
