import { compileMDX } from 'next-mdx-remote/rsc'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import type { MDXComponents } from 'mdx/types'

interface CompileMDXOptions {
  source: string
  components?: MDXComponents
}

export async function compileMdxContent({ source, components = {} }: CompileMDXOptions) {
  return compileMDX({
    source,
    components,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: 'wrap',
              properties: {
                className: ['anchor-link'],
                ariaLabel: 'Link to section',
              },
            },
          ],
        ],
      },
    },
  })
}
