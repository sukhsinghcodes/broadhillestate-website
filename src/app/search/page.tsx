'use client'

import { useState } from 'react'
import { PropertyType, TransactionType } from '../types'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { AvailabilityFilter } from './availability-filter'
import {
  maxPricesLettings,
  maxPricesSales,
  minPricesLettings,
  minPricesSales,
} from './data'
import { pound } from '../utils'

export default function Search() {
  const [location, setLocation] = useState<string>('')
  const [transactionType, setTransactionType] = useState<TransactionType>(
    TransactionType.Sales
  )
  const [propertyType, setPropertyType] = useState<PropertyType | ''>('')
  const [minPrice, setMinPrice] = useState<string>('')
  const [maxPrice, setMaxPrice] = useState<string>('')
  const [minBeds, setMinBeds] = useState<string>('')
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('')

  const isSales = transactionType === TransactionType.Sales

  const minPriceOptions = isSales ? minPricesSales : minPricesLettings
  const maxPriceOptions = isSales ? maxPricesSales : maxPricesLettings

  return (
    <div className="flex flex-col gap-8 items-center">
      <div className="flex flex-col md:flex-row gap-2 flex-wrap items-stretch md:items-center md:justify-center w-full">
        <Input
          className="w-full md:w-[200px]"
          placeholder="Location"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <Select
          value={transactionType}
          onValueChange={(value) =>
            setTransactionType(value as TransactionType)
          }
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
          </SelectContent>
        </Select>
        <AvailabilityFilter
          value={availabilityFilter}
          onValueChange={setAvailabilityFilter}
          transactionType={transactionType}
        />
        <Button size="sm">Search</Button>
      </div>
    </div>
  )
}
