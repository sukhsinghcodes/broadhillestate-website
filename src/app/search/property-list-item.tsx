import { H3 } from '../components/typography'
import { Property, PropertyStatus, TransactionType } from '../types'
import Image from 'next/image'
import { getAvailabilityLabel, pound } from '../utils'
import { BathIcon, BedIcon, HomeIcon, SofaIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

export type PropertyListItemProps = {
  property: Property
}

export function PropertyListItem({
  property: {
    name,
    gallery,
    description,
    price,
    transactionType,
    status,
    propertyType,
    numberOfBathrooms,
    numberOfBedrooms,
    numberOfReceptions,
  },
}: PropertyListItemProps) {
  return (
    <div className="w-full flex flex-col md:flex-row bg-neutral-600">
      <div className="md:basis-1/4">
        <Image
          src={`https:${gallery?.[0].fields.file?.url?.toString()}?fit=thumb&f=top_left&w=500&h=300`}
          alt={`${name} featured`}
          width={500}
          height={300}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="basis-3/4 p-4 md:p-8 flex flex-col gap-3 md:gap-6 justify-between">
        <H3 className="m-0 font-normal">{name}</H3>
        <h4 className="text-3xl md:text-4xl">{`${pound.format(price)}${
          transactionType === TransactionType.Lettings ? ' PCM' : ''
        }`}</h4>
        <div className="text-sm">{documentToReactComponents(description)}</div>
        <div className="flex justify-between gap-4 pt-3">
          <div className="flex gap-4">
            <Badge variant="secondary" className="uppercase">
              {getAvailabilityLabel(
                transactionType as TransactionType,
                status as PropertyStatus
              )}
            </Badge>
            <div className="flex gap-2">
              <HomeIcon size={20} />
              <div className="">{propertyType}</div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex gap-2">
              <div className="">{numberOfBedrooms}</div>
              <div>
                <BedIcon size={20} />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="">{numberOfReceptions}</div>
              <div>
                <SofaIcon size={20} />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="">{numberOfBathrooms}</div>
              <div>
                <BathIcon size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
