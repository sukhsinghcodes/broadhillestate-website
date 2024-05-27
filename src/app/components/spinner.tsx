import { LoaderCircleIcon } from 'lucide-react'

export function Spinner() {
  return (
    <div className="animate-spin text-neutral-400">
      <LoaderCircleIcon />
    </div>
  )
}
