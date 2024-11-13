import { SelectResetButton } from '@/app/components/select-reset-button';
import { TransactionType, PropertyType } from '@/app/types';
import { pound } from '@/app/utils';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AvailabilityFilter } from '../availability-filter';
import { minPricesSales, minPricesLettings, maxPricesSales, maxPricesLettings } from '../data';

type FiltersUIProps = {
  location: string;
  setLocation: (location: string) => void;
  transactionType: TransactionType;
  setTransactionType: (transactionType: TransactionType) => void;
  minPrice: string;
  setMinPrice: (minPrice: string) => void;
  maxPrice: string;
  setMaxPrice: (maxPrice: string) => void;
  minBeds: string;
  setMinBeds: (minBeds: string) => void;
  propertyType: string;
  setPropertyType: (propertyType: string) => void;
  availabilityFilter: string;
  setAvailabilityFilter: (availabilityFilter: string) => void;
};

export function FiltersUI({
  location,
  setLocation,
  transactionType,
  setTransactionType,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  minBeds,
  setMinBeds,
  propertyType,
  setPropertyType,
  availabilityFilter,
  setAvailabilityFilter,
}: FiltersUIProps) {
  const isSales = transactionType === TransactionType.Sales;

  const minPriceOptions = isSales ? minPricesSales : minPricesLettings;
  const maxPriceOptions = isSales ? maxPricesSales : maxPricesLettings;

  return (
    <div className="flex flex-col md:flex-row gap-2 flex-wrap items-stretch md:items-center md:justify-center w-full">
      <Input
        className="w-full md:w-[200px] hidden"
        placeholder="Location"
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <Select
        value={transactionType}
        onValueChange={(value) => {
          setTransactionType(value as TransactionType);
          setMinPrice('');
          setMaxPrice('');
          setMinBeds('');
          setPropertyType('');
          setAvailabilityFilter('');
        }}
      >
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Sales / Lettings" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {Object.values(TransactionType).map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select value={minPrice} onValueChange={setMinPrice}>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Min Price £" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {minPriceOptions.map((item) => (
              <SelectItem key={item} value={item.toString()}>
                {pound.format(item)}
                {!isSales && ' PCM'}
              </SelectItem>
            ))}
          </SelectGroup>
          <SelectSeparator />
          <SelectResetButton setFn={setMinPrice} />
        </SelectContent>
      </Select>
      <Select value={maxPrice} onValueChange={setMaxPrice}>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Max Price £" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {maxPriceOptions.map((item) => (
              <SelectItem key={item} value={item.toString()}>
                {pound.format(item)}
                {!isSales && ' PCM'}
              </SelectItem>
            ))}
          </SelectGroup>
          <SelectSeparator />
          <SelectResetButton setFn={setMaxPrice} />
        </SelectContent>
      </Select>
      <Select value={minBeds} onValueChange={setMinBeds}>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Min Beds" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="4">4</SelectItem>
            <SelectItem value="5">5</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectResetButton setFn={setMinBeds} />
        </SelectContent>
      </Select>
      <Select
        value={propertyType}
        onValueChange={(value) => setPropertyType(value as PropertyType)}
      >
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Property Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {Object.values(PropertyType).map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectGroup>
          <SelectSeparator />
          <SelectResetButton setFn={setPropertyType} />
        </SelectContent>
      </Select>
      <AvailabilityFilter
        value={availabilityFilter}
        onValueChange={setAvailabilityFilter}
        transactionType={transactionType}
      />
    </div>
  );
}
