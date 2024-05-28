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
