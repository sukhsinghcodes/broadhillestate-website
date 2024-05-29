import { cn } from '@/lib/utils'

export type TypographyProps = {
  children: React.ReactNode
  className?: string
}

export function H1({ children, className }: TypographyProps) {
  return <h1 className={cn('text-2xl md:text-4xl', className)}>{children}</h1>
}

export function H2({ children, className }: TypographyProps) {
  return <h2 className={cn('text-xl md:text-3xl', className)}>{children}</h2>
}

export function H3({ children, className }: TypographyProps) {
  return <h3 className={cn('text-lg md:text-xl', className)}>{children}</h3>
}

export function H4({ children, className }: TypographyProps) {
  return <h4 className={cn('font-bold', className)}>{children}</h4>
}
