declare module '*.mdx' {
  import { MDXProps } from 'mdx/types'

  export const frontmatter: {
    title: string
    written: string
    updated: string
  }

  export default function MDXContent(props: MDXProps): JSX.Element
}
