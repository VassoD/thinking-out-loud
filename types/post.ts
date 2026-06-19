export const CATEGORIES = [
  'Engineering',
  'Leadership',
  'UX & Product',
  'AI',
  'Philosophy',
  'Growth',
] as const

export type Category = (typeof CATEGORIES)[number]

export interface PostFrontmatter {
  title: string
  excerpt: string
  date: string
  category: Category
  tags: string[]
  featured: boolean
  published: boolean
  readingTime?: number
}

export interface Post extends PostFrontmatter {
  slug: string
  computedReadingTime: number
}

export interface PostWithContent extends Post {
  content: string
}
