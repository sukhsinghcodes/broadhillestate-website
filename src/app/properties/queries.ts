import { useQuery } from '@tanstack/react-query';
import { Property } from '../types';

export function usePropertiesSearch(filterParams: string) {
  return useQuery<Property[]>({
    queryKey: ['property-search', filterParams],
    queryFn: async () => {
      const response = await fetch(`/api/properties?${filterParams}`);
      return response.json();
    },
  });
}

export function useProperty(id: string) {
  return useQuery<Property>({
    queryKey: ['property', id],
    queryFn: async () => {
      const response = await fetch(`/api/property?id=${id}`);
      return response.json();
    },
  });
}
