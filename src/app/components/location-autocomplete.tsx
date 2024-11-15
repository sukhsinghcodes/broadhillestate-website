import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { PlaceAutocompleteResponseData } from '@googlemaps/google-maps-services-js';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';

type LocationAutocompleteProps = {
  value: string;
  onChange: (value: string) => void;
};

export function LocationAutocomplete({ value, onChange }: LocationAutocompleteProps) {
  const [showResults, setShowResults] = useState(false);
  const debouncedValue = useDebounce(value, 500);

  const { data } = useQuery<PlaceAutocompleteResponseData>({
    queryKey: ['maps', 'autocomplete', debouncedValue],
    queryFn: async () => {
      return fetch(`/api/maps/autocomplete?input=${debouncedValue}`).then((res) => res.json());
    },
    enabled: !!debouncedValue,
  });

  return (
    <div className="w-full relative">
      <Command>
        <CommandInput
          placeholder="e.g. Redbridge, E11 or Wanstead"
          value={value}
          onValueChange={(value) => {
            onChange(value);
            setShowResults(!!value);
          }}
        />
        <CommandGroup
          className={cn(
            'absolute top-full left-0 right-0 z-10 h-auto overflow-y-auto bg-black',
            showResults ? 'visible' : 'invisible'
          )}
        >
          <CommandList>
            {data &&
              data.predictions.map((item) => (
                <CommandItem
                  key={item.place_id}
                  value={item.description}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? '' : currentValue);
                    setShowResults(false);
                  }}
                >
                  {item.description}
                </CommandItem>
              ))}
          </CommandList>
        </CommandGroup>
      </Command>
    </div>
  );
}
