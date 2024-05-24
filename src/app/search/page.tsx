'use client'

import { Suspense } from 'react'
import { Search } from './search'
import { H2 } from '../components/typography'

export default function SearchPage() {
  return (
    <Suspense fallback={<H2>Page failed to load.</H2>}>
      <Search />
    </Suspense>
  )
}
