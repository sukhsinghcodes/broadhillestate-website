import { cn } from '@/lib/utils'
import { LoaderCircleIcon } from 'lucide-react'

export function Spinner({ className }: { className?: string }) {
  return (
    <div className={cn('animate-spin text-neutral-400', className)}>
      <LoaderCircleIcon />
    </div>
  )
}
