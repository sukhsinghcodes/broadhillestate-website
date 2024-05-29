'use client'

import { H1, H2, H3, H4 } from '@/app/components/typography'
import { useProperty } from '../queries'
import { Spinner } from '@/app/components/spinner'
import { getAvailabilityLabel, pound } from '@/app/utils'
import { PropertyStatus, TransactionType } from '@/app/types'
import { BedIcon, SofaIcon, BathIcon } from 'lucide-react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

export type PropertyProps = {
  id: string
}

export function Property({ id }: PropertyProps) {
  const { data, isLoading, error } = useProperty(id)

  if (error) {
    return <H3 className="text-red-600">An unknown error occured</H3>
  }

  if (isLoading) {
    return <Spinner />
  }

  if (!data) {
    return <H3 className="text-red-600">Property not found</H3>
  }

  return (
    <>
      <div className="w-full">Gallery Hero</div>
      <div className="flex gap-8 w-full max-w-screen-2xl">
        <div className="basis-2/3 flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <H1>{data.name}</H1>
            <H3 className="text-neutral-200">
              {data.numberOfBedrooms} Bedroom {data.propertyType}{' '}
              {getAvailabilityLabel(
                data.transactionType as TransactionType,
                data.status as PropertyStatus
              )}
            </H3>
            <H2 className="text-neutral-400">{pound.format(data.price)}</H2>
            <div className="flex gap-6 items-center">
              <div className="flex gap-2 items-center">
                <div>
                  <BedIcon className="text-neutral-300 stroke-1" size={20} />
                </div>
                <div className="">{data.numberOfBedrooms} Bed</div>
              </div>
              <div className="flex gap-2 items-center">
                <div>
                  <SofaIcon className="text-neutral-300 stroke-1" size={20} />
                </div>
                <div className="">
                  {data.numberOfReceptions} Reception
                  {data.numberOfReceptions > 1 ? 's' : ''}
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <div>
                  <BathIcon className="text-neutral-300 stroke-1" size={20} />
                </div>
                <div className="">{data.numberOfBathrooms} Bathroom</div>
              </div>
            </div>
          </div>
          <div className="mt-2">
            <H3 className="font-bold text-neutral-400">Property Features</H3>
            <ul className="grid grid-rows-4 grid-flow-col mt-4">
              {data.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
          <div className="">
            <H3 className="font-bold text-neutral-400">About This Property</H3>
            <div className="mt-6">
              {documentToReactComponents(data.description, {
                preserveWhitespace: true,
              })}
            </div>
          </div>
        </div>
        <div className="basis-1/3">Side panel</div>
      </div>
    </>
  )
}
