import logoSrc from '../assets/images/bh-logo.svg'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { H4 } from './typography'
import Image from 'next/image'
import { PhoneIcon } from 'lucide-react'
import Link from 'next/link'

export function ContactCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-8">
          <div className="w-[100px] h-[100px]">
            <Image src={logoSrc} alt="Broadhill Estate" />
          </div>
          <div className="flex flex-col gap-6">
            <div>
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
              <div className="flex gap-2 items-center mt-2">
                <label>
                  <PhoneIcon size={18} />
                </label>
                <Link className="text-primary text-sm" href="tel:02045680706">
                  0204 568 0706
                </Link>
              </div>
            </div>

            <Link href="/contact">
              <Button>Arrange a viewing</Button>
            </Link>
          </div>
        </div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  )
}
