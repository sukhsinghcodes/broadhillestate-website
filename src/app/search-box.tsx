'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { H4 } from './components/typography';
import { TransactionType } from './types';
import Link from 'next/link';
import { useState } from 'react';
import { LocationAutocomplete } from './components/location-autocomplete';

export function SearchBox() {
  const [search, setSearch] = useState('');

  return (
    <Card className="p-4 mb-8 bg-neutral-800 flex flex-col gap-2">
      <H4 className="font-normal text-sm md:text-base">Search properties for sale and to rent</H4>
      <div className="flex items-center gap-2 flex-wrap md:flex-nowrap">
        <LocationAutocomplete value={search} onChange={setSearch} />
        <Button asChild>
          <Link href={`/properties?transactionType=${TransactionType.Sales}&location=${search}`}>
            For sale
          </Link>
        </Button>
        <Button asChild>
          <Link href={`/properties?transactionType=${TransactionType.Lettings}&location=${search}`}>
            To rent
          </Link>
        </Button>
      </div>
    </Card>
  );
}
