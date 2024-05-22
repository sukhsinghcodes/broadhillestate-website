'use client'

import { Button } from '@/components/ui/button'
import { FacebookIcon, InstagramIcon, MenuIcon, SearchIcon } from 'lucide-react'
import Link from 'next/link'
import { use, useEffect } from 'react'
import { useIsMobile } from '../hooks/useIsMobile'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

export function Navigation() {
  useEffect(() => {
    const navBar = document.querySelector('.main-nav-bar')
    if (!navBar) return

    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        navBar.classList.add('bg-black')
      } else {
        navBar.classList.remove('bg-black')
      }
    })

    if (window.scrollY > 10) {
      navBar.classList.add('bg-black')
    }
  }, [])

  const isMobile = useIsMobile('md')

  return (
    <header className="main-nav-bar fixed z-50 top-0 w-full transition-all p-4 md:py-6 md:px-10">
      <nav className="flex justify-between items-center gap-8">
        <Link href="/" className="text-2xl">
          Broadhill Estate
        </Link>
        {isMobile ? (
          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <SearchIcon />
            </Button>
            <Sheet>
              <SheetTrigger>
                <Button variant="ghost" size="icon">
                  <MenuIcon />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <ul className="flex flex-col gap-2">
                  <li>
                    <Link href="/search">
                      <Button variant="ghost">Rent</Button>
                    </Link>
                  </li>
                  <li>
                    <Link href="/search">
                      <Button variant="ghost">Buy</Button>
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact">
                      <Button variant="ghost">Contact</Button>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.instagram.com/broadhillestate/"
                      target="_blank"
                    >
                      <Button variant="ghost" size="icon">
                        <InstagramIcon className="stroke-1" />
                      </Button>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.facebook.com/broadhillestate"
                      target="_blank"
                    >
                      <Button variant="ghost" size="icon">
                        <FacebookIcon className="stroke-1" />
                      </Button>
                    </Link>
                  </li>
                </ul>
              </SheetContent>
            </Sheet>
          </div>
        ) : (
          <ul className="flex flex-wrap space-x-8 items-center">
            <li>
              <Link href="/search">
                <Button variant="ghost" size="icon">
                  <SearchIcon />
                </Button>
              </Link>
            </li>
            <li>
              <Link href="/search?">
                <Button variant="ghost">Rent</Button>
              </Link>
            </li>
            <li>
              <Link href="/search?">
                {' '}
                <Button variant="ghost">Buy</Button>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                {' '}
                <Button variant="ghost">Contact</Button>
              </Link>
            </li>
            <li>
              <Link
                href="https://www.instagram.com/broadhillestate/"
                target="_blank"
              >
                <Button variant="ghost" size="icon">
                  <InstagramIcon className="stroke-1" />
                </Button>
              </Link>
            </li>
            <li>
              <Link
                href="https://www.facebook.com/broadhillestate"
                target="_blank"
              >
                <Button variant="ghost" size="icon">
                  <FacebookIcon className="stroke-1" />
                </Button>
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  )
}
