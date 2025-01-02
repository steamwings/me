import Post from 'components/post'
import { getPostFromDir } from 'lib/ssr/posts';

export default async function SolarpunkJesus({ params }) {
  const post = await getPostFromDir(__dirname);
  return (
    <Post post={post}/>
  );
}
