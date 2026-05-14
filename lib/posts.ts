import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import type { Post, PostWithContent, Category } from '@/types/post'

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts')

function parsePost(slug: string, fileContent: string): Post {
  const { data, content } = matter(fileContent)
  const rt = readingTime(content)
  const frontmatter = data as Omit<Post, 'slug' | 'computedReadingTime'>

  return {
    ...frontmatter,
    slug,
    computedReadingTime: Math.ceil(rt.minutes),
  }
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return []

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.mdx'))

  return files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, '')
      const raw = fs.readFileSync(path.join(POSTS_DIR, filename), 'utf-8')
      return parsePost(slug, raw)
    })
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): PostWithContent | null {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const rt = readingTime(content)
  const frontmatter = data as Omit<Post, 'slug' | 'computedReadingTime'>

  return {
    ...frontmatter,
    slug,
    computedReadingTime: Math.ceil(rt.minutes),
    content,
  }
}

export function getFeaturedPost(): Post | null {
  const posts = getAllPosts()
  return posts.find((p) => p.featured) ?? posts[0] ?? null
}

export function getPostsByCategory(category: Category): Post[] {
  return getAllPosts().filter((p) => p.category === category)
}

export function getRelatedPosts(currentSlug: string, category: Category, limit = 3): Post[] {
  return getAllPosts()
    .filter((p) => p.slug !== currentSlug && p.category === category)
    .slice(0, limit)
}

export function getAllTags(): string[] {
  const posts = getAllPosts()
  const tagSet = new Set<string>()
  posts.forEach((p) => p.tags?.forEach((t) => tagSet.add(t)))
  return Array.from(tagSet).sort()
}
