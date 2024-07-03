'use client'

import { useCallback, useEffect, useState } from 'react'
import { PropertyType, TransactionType } from '../types'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectSeparator,
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
import { useRouter, useSearchParams } from 'next/navigation'
import { SelectResetButton } from '../components/select-reset-button'
import { usePropertiesSearch } from './queries'
import { Spinner } from '../components/spinner'
import { H4 } from '../components/typography'
import { PropertyListItem } from './property-list-item'

export function Properties() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [location, setLocation] = useState<string>('')
  const [transactionType, setTransactionType] = useState<TransactionType>(
    TransactionType.Sales
  )
  const [propertyType, setPropertyType] = useState<PropertyType | string>('')
  const [minPrice, setMinPrice] = useState<string>('')
  const [maxPrice, setMaxPrice] = useState<string>('')
  const [minBeds, setMinBeds] = useState<string>('')
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('')
  const [filterParams, setFilterParams] = useState<string>('')

  const isSales = transactionType === TransactionType.Sales

  const minPriceOptions = isSales ? minPricesSales : minPricesLettings
  const maxPriceOptions = isSales ? maxPricesSales : maxPricesLettings

  const handleSearch = useCallback(() => {
    const params = new URLSearchParams()
    if (location) params.set('location', location)
    if (transactionType) params.set('transactionType', transactionType)
    if (propertyType) params.set('propertyType', propertyType)
    if (minPrice) params.set('minPrice', minPrice)
    if (maxPrice) params.set('maxPrice', maxPrice)
    if (minBeds) params.set('minBeds', minBeds)
    if (availabilityFilter) params.set('availabilityFilter', availabilityFilter)
    router.push('/properties?' + params.toString())
    setFilterParams(params.toString())
  }, [
    availabilityFilter,
    location,
    maxPrice,
    minBeds,
    minPrice,
    propertyType,
    router,
    transactionType,
  ])

  useEffect(() => {
    handleSearch()
  }, [handleSearch])

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    const values = {
      location: params.get('location') || '',
      transactionType: params.get('transactionType') || TransactionType.Sales,
      propertyType: params.get('propertyType') || '',
      minPrice: params.get('minPrice') || '',
      maxPrice: params.get('maxPrice') || '',
      minBeds: params.get('minBeds') || '',
      availabilityFilter: params.get('availabilityFilter') || '',
    }
    setLocation(values.location)
    setTransactionType(values.transactionType as TransactionType)
    setPropertyType(values.propertyType)
    setMinPrice(values.minPrice)
    setMaxPrice(values.maxPrice)
    setMinBeds(values.minBeds)
    setAvailabilityFilter(values.availabilityFilter)
  }, [searchParams])

  const { data, isLoading, error } = usePropertiesSearch(filterParams)

  return (
    <div className="p-4 md:p-8 flex flex-col gap-8 items-center max-w-screen-2xl justify-stretch">
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
      {isLoading ? (
        <Spinner />
      ) : data && data.length > 0 ? (
        data.map((item) => <PropertyListItem key={item.id} property={item} />)
      ) : (
        <H4>No results</H4>
      )}
    </div>
  )
}
