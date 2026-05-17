import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/posts'
import { compileMdxContent } from '@/lib/mdx'
import { buildMetadata, buildArticleJsonLd } from '@/lib/seo'
import { mdxComponents } from '@/components/mdx/MDXComponents'
import PostHeader from '@/components/post/PostHeader'
import PostBody from '@/components/post/PostBody'
import RelatedPosts from '@/components/post/RelatedPosts'
import Container from '@/components/layout/Container'

interface PostPageProps {
  params: { slug: string }
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return {}

  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/writing/${post.slug}`,
    publishedTime: post.date,
    tags: post.tags,
  })
}

export default async function PostPage({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const { content } = await compileMdxContent({
    source: post.content,
    components: mdxComponents,
  })

  const relatedPosts = getRelatedPosts(post.slug, post.category)
  const jsonLd = buildArticleJsonLd({
    title: post.title,
    description: post.excerpt,
    date: post.date,
    slug: post.slug,
    tags: post.tags,
  })

  return (
    <>
      <Script
        id="article-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="py-16">
        <Container size="reading">
          <PostHeader post={post} />
          <PostBody>{content}</PostBody>
          <RelatedPosts posts={relatedPosts} />
        </Container>
      </div>
    </>
  )
}
