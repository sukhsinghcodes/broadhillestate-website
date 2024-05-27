import type { Asset, EntryFields, EntrySkeletonType } from 'contentful'

export interface TypePropertyFields {
  name: EntryFields.Symbol
  numberOfBedrooms: EntryFields.Integer
  numberOfBathrooms: EntryFields.Integer
  numberOfReceptions: EntryFields.Integer
  price: EntryFields.Number
  transactionType: 'Lettings' | 'Sales'
  propertyType: 'Apartment' | 'Commercial' | 'House'
  status: 'Available' | 'PendingCompletion' | 'Unavailable' | 'UnderOffer'
  description: EntryFields.RichText
  features: EntryFields.Symbol[]
  location: EntryFields.Location
  gallery?: Asset[]
  floorplan?: Asset[]
  epc?: Asset
}

export type TypeProperty = EntrySkeletonType<TypePropertyFields>
