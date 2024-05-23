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

export enum SalesStatus {
  ForSale = 'ForSale',
  Sold = 'Sold',
  SoldSTC = 'SoldSTC',
  UnderOffer = 'UnderOffer',
}

export const SalesStatusLabels = {
  [SalesStatus.ForSale]: 'For Sale',
  [SalesStatus.Sold]: 'Sold',
  [SalesStatus.SoldSTC]: 'Sold STC',
  [SalesStatus.UnderOffer]: 'Under Offer',
}

export enum LettingsStatus {
  Let = 'Let',
  LetAgreed = 'LetAgreed',
  ToLet = 'ToLet',
  UnderOffer = 'UnderOffer',
}

export const LettingsStatusLabels = {
  [LettingsStatus.Let]: 'Let',
  [LettingsStatus.LetAgreed]: 'Let Agreed',
  [LettingsStatus.ToLet]: 'To Let',
  [LettingsStatus.UnderOffer]: 'Under Offer',
}
