import type { MDXComponents } from 'mdx/types'
import { TwoColumn, ColumnBreak } from './components/two-column'
import { h3 } from './lib/anchors'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h3,
    TwoColumn,
    ColumnBreak,
    ...components,
  }
}
