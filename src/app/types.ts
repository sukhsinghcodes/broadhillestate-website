import { TypePropertyFields } from './generated-types'

export enum PropertyType {
  House = 'House',
  Apartment = 'Apartment',
  Commercial = 'Commercial',
}

export enum PropertyTypeHouseFilters {
  Detached = 'Detached',
  SemiDetached = 'SemiDetached',
  Terraced = 'Terraced',
  EndTerrace = 'EndTerrace',
}

export enum TransactionType {
  Sales = 'Sales',
  Lettings = 'Lettings',
}

export enum PropertyStatus {
  Available = 'Available',
  Unavailable = 'Unavailable',
  PendingCompletion = 'PendingCompletion',
  UnderOffer = 'UnderOffer',
}

export const SalesStatusLabels = {
  [PropertyStatus.Available]: 'For Sale',
  [PropertyStatus.Unavailable]: 'Sold',
  [PropertyStatus.PendingCompletion]: 'Sold STC',
  [PropertyStatus.UnderOffer]: 'Under Offer',
}

export const LettingsStatusLabels = {
  [PropertyStatus.Available]: 'To Let',
  [PropertyStatus.Unavailable]: 'Let',
  [PropertyStatus.PendingCompletion]: 'Let Agreed',
  [PropertyStatus.UnderOffer]: 'Under Offer',
}

export type Property = TypePropertyFields & {
  id: string
}
