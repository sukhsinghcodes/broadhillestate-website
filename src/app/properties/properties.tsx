'use client';

import { useState } from 'react';
import { usePropertiesSearch } from './queries';
import { Spinner } from '../components/spinner';
import { H2, H4 } from '../components/typography';
import { PropertyListItem } from './property-list-item';
import { Filters } from './filters/filters';
import { TransactionType } from '../types';

export function Properties() {
  const [filterParams, setFilterParams] = useState<string>(
    `transactionType=${TransactionType.Sales}`
  );
  const { data, isLoading, error } = usePropertiesSearch(filterParams);

  if (error) {
    return (
      <div className="p-4 md:p-8 flex flex-col gap-8 items-center max-w-screen-2xl justify-center w-full h-full">
        <H2 className="text-red-500">Sorry, something went wrong</H2>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 flex flex-col gap-8 items-center max-w-screen-2xl justify-stretch w-full">
      <Filters setFilterParams={setFilterParams} />
      {isLoading ? (
        <Spinner />
      ) : data && data.length > 0 ? (
        data.map((item) => <PropertyListItem key={item.id} property={item} />)
      ) : (
        <H4>No results</H4>
      )}
    </div>
  );
}
