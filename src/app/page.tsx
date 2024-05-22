import Image from 'next/image'
import bgImage from '@/app/assets/images/st-pauls-bg.jpg'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 pt-0">
      <Image
        className="z-0 saturate-50 brightness-50"
        src={bgImage}
        alt="St Pauls Cathedral"
        layout="fill"
        objectFit="cover"
      />
      <div className="relative z-10 w-[80vw] h-[600px] flex items-center">
        <div>
          <h1 className="text-6xl mb-4">Broadhill Estate</h1>
          <h2 className="text-3xl">
            Residential, commercial, sales, lettings and property management
          </h2>
        </div>
      </div>
    </main>
  )
}
