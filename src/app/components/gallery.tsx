import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Asset, ChainModifiers } from 'contentful'
import Image from 'next/image'

export type GalleryProps = {
  Trigger: React.ReactNode
  images: Asset<ChainModifiers, string>[]
}

export function Gallery({ Trigger, images }: GalleryProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{Trigger}</DialogTrigger>
      <DialogContent className="min-w-full h-full overflow-hidden">
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
        >
          <CarouselContent>
            {images.map((image) => (
              <CarouselItem key={image.sys.id} className="h-screen pb-12">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https:${image.fields.file?.url?.toString()}?fm=jpg&q=80&w=2000`}
                  alt={`${image.fields.title}`}
                  className="w-full h-full object-contain"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </DialogContent>
    </Dialog>
  )
}
