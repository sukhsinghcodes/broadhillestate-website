'use client'

import { H1 } from '@/app/components/typography'
import { useProperty } from '../queries'

export type PropertyProps = {
  id: string
}

export function Property({ id }: PropertyProps) {
  const { data, isLoading, error } = useProperty(id)

  return (
    <div>
      <H1>{data?.name}</H1>
    </div>
  )
}
