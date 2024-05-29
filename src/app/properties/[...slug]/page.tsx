import { H1 } from '@/app/components/typography'
import { Property } from './property'

export type PropertyPageProps = {
  params: { slug: string[] }
}

export default function PropertyPage({ params }: PropertyPageProps) {
  return <Property id={params.slug[0]} />
}
