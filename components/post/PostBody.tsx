import { cn } from '@/lib/utils'

interface PostBodyProps {
  children: React.ReactNode
  className?: string
}

export default function PostBody({ children, className }: PostBodyProps) {
  return (
    <div
      className={cn(
        'prose prose-vassi max-w-none',
        className
      )}
    >
      {children}
    </div>
  )
}
