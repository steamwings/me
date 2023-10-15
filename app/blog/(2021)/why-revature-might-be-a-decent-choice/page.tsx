import Post from 'components/post'
import { getPost } from 'lib/static/posts';

export default async function Revature({ params }) {
  const post = await getPost(__dirname.split('/').slice(-1)[0]);
  return (
    <Post post={post}/>
  );
}
