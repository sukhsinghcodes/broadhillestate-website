import { useQuery } from '@tanstack/react-query'
import { TypePropertyFields } from '../generated-types'

export function usePropertiesSearch(filterParams: string) {
  return useQuery<TypePropertyFields[]>({
    queryKey: ['property-search', filterParams],
    queryFn: async () => {
      const response = await fetch(`/api/properties?${filterParams}`)
      return response.json()
    },
  })
}
