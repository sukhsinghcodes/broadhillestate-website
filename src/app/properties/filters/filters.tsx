'use client';

import { TransactionType, PropertyType } from '../../types';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useCallback, useEffect } from 'react';
import { FiltersUI } from './filters-ui';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { pound } from '@/app/utils';

type FilterProps = {
  setFilterParams: (params: string) => void;
};

export function Filters({ setFilterParams }: FilterProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [location, setLocation] = useState<string>('');
  const [transactionType, setTransactionType] = useState<TransactionType>(TransactionType.Sales);
  const [propertyType, setPropertyType] = useState<PropertyType | string>('');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [minBeds, setMinBeds] = useState<string>('');
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const params = new URLSearchParams();
    if (location) params.set('location', location);
    if (transactionType) params.set('transactionType', transactionType);
    if (propertyType) params.set('propertyType', propertyType);
    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);
    if (minBeds) params.set('minBeds', minBeds);
    if (availabilityFilter) params.set('availabilityFilter', availabilityFilter);
    router.push('/properties?' + params.toString());
    setFilterParams(params.toString());
  }, [
    availabilityFilter,
    location,
    maxPrice,
    minBeds,
    minPrice,
    propertyType,
    router,
    setFilterParams,
    transactionType,
  ]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const values = {
      location: params.get('location') || '',
      transactionType: params.get('transactionType') || TransactionType.Sales,
      propertyType: params.get('propertyType') || '',
      minPrice: params.get('minPrice') || '',
      maxPrice: params.get('maxPrice') || '',
      minBeds: params.get('minBeds') || '',
      availabilityFilter: params.get('availabilityFilter') || '',
    };
    if (values.location !== location) setLocation(values.location);
    if (values.transactionType !== transactionType)
      setTransactionType(values.transactionType as TransactionType);
    if (values.propertyType !== propertyType) setPropertyType(values.propertyType);
    if (values.minPrice !== minPrice) setMinPrice(values.minPrice);
    if (values.maxPrice !== maxPrice) setMaxPrice(values.maxPrice);
    if (values.minBeds !== minBeds) setMinBeds(values.minBeds);
    if (values.availabilityFilter !== availabilityFilter)
      setAvailabilityFilter(values.availabilityFilter);
    // We only want to run this effect when the search params change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <>
      <Collapsible className="w-full md:hidden" open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger className="w-full">
          <div className="flex items-center justify-between w-full gap-2 p-2 bg-neutral-700">
            <div className="flex gap-2 flex-wrap">
              {transactionType && <Badge variant="secondary">{transactionType}</Badge>}
              {minPrice && <Badge variant="secondary">{pound.format(Number(minPrice))}</Badge>}
              {maxPrice && <Badge variant="secondary">{pound.format(Number(maxPrice))}</Badge>}
              {minBeds && (
                <Badge variant="secondary">
                  {minBeds} {Number(minBeds) > 1 ? 'Beds' : 'Bed'}
                </Badge>
              )}
              {propertyType && <Badge variant="secondary">{propertyType}</Badge>}
              {availabilityFilter && <Badge variant="secondary">{availabilityFilter}</Badge>}
            </div>
            {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2">
          <FiltersUI
            location={location}
            setLocation={setLocation}
            transactionType={transactionType}
            setTransactionType={setTransactionType}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            minBeds={minBeds}
            setMinBeds={setMinBeds}
            propertyType={propertyType}
            setPropertyType={setPropertyType}
            availabilityFilter={availabilityFilter}
            setAvailabilityFilter={setAvailabilityFilter}
          />
        </CollapsibleContent>
      </Collapsible>
      <div className="hidden md:block">
        <FiltersUI
          location={location}
          setLocation={setLocation}
          transactionType={transactionType}
          setTransactionType={setTransactionType}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          minBeds={minBeds}
          setMinBeds={setMinBeds}
          propertyType={propertyType}
          setPropertyType={setPropertyType}
          availabilityFilter={availabilityFilter}
          setAvailabilityFilter={setAvailabilityFilter}
        />
      </div>
    </>
  );
}
