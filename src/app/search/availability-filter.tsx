import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  LettingsStatusLabels,
  PropertyStatus,
  SalesStatusLabels,
  TransactionType,
} from '../types'
import { SelectResetButton } from '../components/select-reset-button'

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
      <SelectTrigger className="w-full md:w-[180px]">
        <SelectValue placeholder="Availability Filter" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {Object.values(PropertyStatus).map((item) => (
            <SelectItem key={item} value={item}>
              {transactionType === TransactionType.Sales
                ? SalesStatusLabels[item as PropertyStatus]
                : LettingsStatusLabels[item as PropertyStatus]}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectSeparator />
        <SelectResetButton setFn={onValueChange} />
      </SelectContent>
    </Select>
  )
}
