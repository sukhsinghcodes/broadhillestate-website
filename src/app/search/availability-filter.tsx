import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  LettingsStatus,
  LettingsStatusLabels,
  SalesStatus,
  SalesStatusLabels,
  TransactionType,
} from '../types'

export type AvailabilityFilterProps = {
  transactionType: TransactionType
  value: string
  onValueChange: (value: string) => void
}

export function AvailabilityFilter({
  transactionType,
  value,
  onValueChange,
}: AvailabilityFilterProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Availability Filter" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {Object.values(
            transactionType === TransactionType.Sales
              ? SalesStatus
              : LettingsStatus
          ).map((item) => (
            <SelectItem key={item} value={item}>
              {transactionType === TransactionType.Sales
                ? SalesStatusLabels[item as SalesStatus]
                : LettingsStatusLabels[item as LettingsStatus]}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
