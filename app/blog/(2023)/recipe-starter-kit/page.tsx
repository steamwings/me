import Post from 'components/post'
import Content, { frontmatter } from './content.mdx'

export default function Tasty() {
  return (
    <Post metadata={frontmatter}>
      <Content />
    </Post>
  );
}
