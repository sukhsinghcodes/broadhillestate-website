import {
  LettingsStatusLabels,
  PropertyStatus,
  SalesStatusLabels,
  TransactionType,
} from './types'

export const pound = Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

export function getAvailabilityLabel(
  transactionType: TransactionType,
  status: PropertyStatus
) {
  if (transactionType === TransactionType.Sales) {
    return SalesStatusLabels[status]
  } else {
    return LettingsStatusLabels[status]
  }
}

export function getSlug(input: string) {
  // Remove punctuation marks
  const noPunctuation = input.replace(/[^\w\s]|_/g, '').replace(/\s+/g, ' ')
  // Convert to lowercase
  const lowercased = noPunctuation.toLowerCase()
  // Replace spaces with hyphens
  const hyphenated = lowercased.replace(/\s+/g, '-')
  return hyphenated
}
