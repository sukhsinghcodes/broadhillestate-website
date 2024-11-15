import { H1, H2, H3 } from '@/app/components/typography';
import { getAvailabilityLabel, pound } from '@/app/utils';
import { PropertyStatus, TransactionType, Property as PropertyType } from '@/app/types';
import {
  BedIcon,
  SofaIcon,
  BathIcon,
  RulerIcon,
  BarChart2Icon,
  ImageIcon,
  VideoIcon,
} from 'lucide-react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import Image from 'next/image';
import { ContactCard } from '@/app/components/contact-card';
import { Button } from '@/components/ui/button';
import { Gallery } from '@/app/components/gallery';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { YoutubePlayer } from '@/app/components/youtube-player';
import { TypeProperty } from '@/app/generated-types';
import { contentfulClient } from '@/app/libs/contenful-client';

export type PropertyProps = {
  id: string;
};

export async function Property({ id }: PropertyProps) {
  let data: PropertyType | null = null;
  let error = false;
  try {
    const property = await contentfulClient.getEntry<TypeProperty>(id);
    data = {
      id: property.sys.id,
      createdAt: property.sys.createdAt,
      updatedAt: property.sys.updatedAt,
      ...property.fields,
    };
  } catch (err) {
    console.error(err);
    error = true;
  }

  if (error) {
    return <H3 className="text-red-600 mt-4">An unknown error occured</H3>;
  }

  if (!data) {
    return <H3 className="text-red-600 mt-4">Property not found</H3>;
  }

  return (
    <>
      <div className="w-full relative">
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {data.gallery?.map((image) => (
              <CarouselItem
                key={image.sys.id}
                className={cn(
                  'h-[300px] md:h-[600px] p-0',
                  data.gallery && data.gallery.length > 1 ? 'md:basis-1/2' : undefined
                )}
              >
                <Image
                  src={`https:${image.fields.file?.url?.toString()}?fit=thumb&w=1000&h=600&fm=avif`}
                  alt={`${image.fields.title}`}
                  width={1000}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="flex gap-4 items-center absolute bottom-4 left-4">
          {data.floorplan && data.floorplan.length > 0 && (
            <Gallery
              Trigger={
                <Button className="shadow shadow-black/40" variant="secondary">
                  <div className="flex gap-2 items-center">
                    <RulerIcon />
                    <div className="hidden md:block">Floor Plan</div>
                  </div>
                </Button>
              }
              images={data.floorplan}
            />
          )}
          {data.epc && (
            <Gallery
              Trigger={
                <Button className="shadow shadow-black/40" variant="secondary">
                  <div className="flex gap-2 items-center">
                    <BarChart2Icon />
                    <div className="hidden md:block">EPC</div>
                  </div>
                </Button>
              }
              images={[data.epc]}
            />
          )}
        </div>
        <div className="flex gap-4 items-center absolute bottom-4 right-4">
          {data.youtubeVideoId && (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="shadow shadow-black/40" variant="secondary">
                  <div className="flex gap-2 items-center">
                    <VideoIcon />
                    <div className="hidden md:block">Video</div>
                  </div>
                </Button>
              </DialogTrigger>
              <DialogContent className="min-w-full h-full">
                <div className="flex flex-col justify-center">
                  <YoutubePlayer title={data.name} videoId={data.youtubeVideoId} />
                </div>
              </DialogContent>
            </Dialog>
          )}
          {data.gallery && (
            <Gallery
              Trigger={
                <Button className="shadow shadow-black/40" variant="secondary">
                  <div className="flex gap-2 items-center">
                    <ImageIcon />
                    <div className="hidden md:block">Gallery</div>
                  </div>
                </Button>
              }
              images={data.gallery}
            />
          )}
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-screen-2xl p-4 md:py-12">
        <div className="basis-full md:basis-2/3 flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <H1>{data.name}</H1>
            <H3 className="text-neutral-200">
              {data.numberOfBedrooms} Bedroom {data.propertyType}{' '}
              {getAvailabilityLabel(
                data.transactionType as TransactionType,
                data.status as PropertyStatus
              )}
            </H3>
            <H2 className="text-neutral-400">{`${pound.format(data.price)}${
              data.transactionType === TransactionType.Lettings ? ' PCM' : ''
            }`}</H2>
            <div className="flex flex-col md:flex-row gap-x-6 gap-y-2 md:items-center">
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
            <ul className="grid md:grid-rows-4 md:grid-flow-col m-0 mt-4">
              {data.features.map((feature, index) => (
                <li key={index} className="ml-6">
                  {feature}
                </li>
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
        <div className="basis-full md:basis-1/3 flex flex-col gap-4">
          <ContactCard />
          <div className="rounded overflow-hidden">
            <iframe
              width="100%"
              height="300"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&q=${data.location.lat},${data.location.lon}&zoom=16`}
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
}
