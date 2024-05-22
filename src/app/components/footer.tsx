import logoSrc from '../assets/images/bh-logo.svg'
import rmLogoSrc from '../assets/images/RM_Logo_NoStrap_White.png'
import Image from 'next/image'
import { Copyright } from './copyright'
import { MailIcon, PhoneIcon } from 'lucide-react'
import Link from 'next/link'
import { H4 } from './typography'

export function Footer() {
  return (
    <footer className="flex flex-wrap gap-24 justify-center sm:justify-between p-10 relative z-10 bg-background">
      <div className="flex flex-wrap justify-center sm:justify-start gap-24">
        <div className="flex flex-col gap-4 items-center sm:items-start">
          <div className="w-[100px] h-[100px]">
            <Image src={logoSrc} alt="Broadhill Estate" />
          </div>
          <Copyright />
        </div>
        <div className="text-center sm:text-left">
          <H4 className="mb-1">Head office</H4>
          <p className="text-sm text-neutral-300 leading-6">
            4 Old Park Lane
            <br />
            Mayfair
            <br />
            London
            <br />
            W1K 1QW
            <br />
          </p>
        </div>
        <div className="text-center sm:text-left">
          <H4 className="mb-1">East London office</H4>
          <p className="text-sm text-neutral-300 leading-6">
            2 Roding Lane South
            <br />
            Redbridge
            <br />
            Ilford
            <br />
            IG4 5NX
            <br />
          </p>
        </div>
        <div className="text-center sm:text-left">
          <H4 className="mb-1">Get in touch</H4>
          <div className="flex flex-col gap-2 items-center sm:items-start">
            <div className="flex gap-2 items-center">
              <label>
                <MailIcon size={18} />
              </label>
              <Link
                className="text-primary text-sm"
                href="mailto:info@broadhillestate.com"
              >
                info@broadhillestate.com
              </Link>
            </div>
            <div className="flex gap-2 items-center">
              <label>
                <PhoneIcon size={18} />
              </label>
              <Link className="text-primary text-sm" href="tel:02045680706">
                0204 568 0706
              </Link>
            </div>
            <Link className="text-primary text-sm" href="/privacy-policy">
              Privacy policy
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 items-center sm:items-start">
        <H4 className="text-neutral-300">Find us on</H4>
        <Link href="https://www.rightmove.co.uk/estate-agents/agent/Broadhill/Ilford-82863.html">
          <Image className="w-[140px]" src={rmLogoSrc} alt="Rightmove" />
        </Link>
      </div>
    </footer>
  )
}
