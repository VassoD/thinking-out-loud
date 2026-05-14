import { cn } from '@/lib/utils'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
  size?: 'reading' | 'default' | 'wide'
}

const sizeClasses = {
  reading: 'max-w-reading',
  default: 'max-w-3xl',
  wide: 'max-w-5xl',
}

export default function Container({
  children,
  className,
  as: Tag = 'div',
  size = 'default',
}: ContainerProps) {
  return (
    <Tag className={cn('mx-auto w-full px-5 sm:px-8', sizeClasses[size], className)}>
      {children}
    </Tag>
  )
}
