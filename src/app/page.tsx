import Image from 'next/image';
import bgImage from '@/app/assets/images/st-pauls-bg.jpg';
import { Button } from '@/components/ui/button';
import { H1, H2, H3, H4 } from './components/typography';
import Link from 'next/link';
import { SearchBox } from './search-box';

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
      <div className="relative z-10 w-[90vw] md:w-[80vw] h-[600px] flex items-center">
        <div>
          <H1 className="text-4xl md:text-6xl mb-4 drop-shadow-md md:drop-shadow-2xl">
            Broadhill Estate
          </H1>
          <H2 className="mb-8 drop-shadow-md md:drop-shadow-2xl">
            Residential, Commercial, Sales, Lettings and Property management
          </H2>
          <SearchBox />
          <Link href="/contact">
            <Button variant="outline" size="lg" className=" drop-shadow-md md:drop-shadow-2xl">
              Book a free valuation
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
