import Post from '../../../../components/post'
import { getPostMetadata } from '../../../../lib/posts';

export default async function Revature({ params }) {
  const metadata = await getPostMetadata(__dirname.split('/').slice(-1)[0]);
  return (
    <Post metadata={metadata}>
      Blog post stuff
    </Post>
  );
}
