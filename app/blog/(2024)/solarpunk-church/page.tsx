import Post from 'components/post'
import Content, { frontmatter } from './content.mdx'

export default function SolarpunkJesus() {
  return (
    <Post metadata={frontmatter}>
      <Content />
    </Post>
  );
}
