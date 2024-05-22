import Image from 'next/image'
import bgImage from '@/app/assets/images/st-pauls-bg.jpg'
import { Button } from '@/components/ui/button'
import { H1, H2 } from './components/typography'

export default function Home() {
  return (
    <div>
      <div className="z-0 absolute w-full h-full top-0 left-0 overflow-hidden">
        <Image
          className="saturate-50 brightness-50 select-none pointer-events-none"
          src={bgImage}
          alt="St Pauls Cathedral"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="relative z-10 w-[80vw] h-[600px] flex items-center">
        <div>
          <H1 className="mb-4">Broadhill Estate</H1>
          <H2 className="mb-6">
            Residential, commercial, sales, lettings and property management
          </H2>
          <Button variant="default" className="uppercase">
            Book a free valuation
          </Button>
        </div>
      </div>
    </div>
  )
}
