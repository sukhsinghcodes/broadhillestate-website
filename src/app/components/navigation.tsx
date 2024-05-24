'use client'

import { Button } from '@/components/ui/button'
import { FacebookIcon, InstagramIcon, MenuIcon, SearchIcon } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useIsMobile } from '../hooks/useIsMobile'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { usePathname } from 'next/navigation'

function toggleClass(el: Element | null) {
  if (!el) return

  if (window.scrollY > 10) {
    el.classList.add('bg-black')
  } else {
    el.classList.remove('bg-black')
  }
}

export function Navigation() {
  const pathname = usePathname()

  useEffect(() => {
    const navBar = document.querySelector('.main-nav-bar')

    function listener() {
      toggleClass(navBar)
    }

    if (pathname !== '/') {
      window.removeEventListener('scroll', listener)
      if (!navBar) return
      navBar.classList.add('bg-black')
      return
    }

    window.addEventListener('scroll', listener)

    toggleClass(navBar)
  }, [pathname])

  const isMobile = useIsMobile('md')
  const [open, setOpen] = useState(false)

  return (
    <header className="main-nav-bar fixed z-50 top-0 w-full transition-all p-4 md:py-6 md:px-10 bg-black">
      <nav className="flex justify-between items-center gap-8">
        <Link href="/" className="text-2xl">
          Broadhill Estate
        </Link>
        {isMobile ? (
          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <SearchIcon />
            </Button>
            <Sheet open={open} onOpenChange={(toggle) => setOpen(toggle)}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setOpen((prev) => !prev)}
                >
                  <MenuIcon />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <ul className="flex flex-col gap-2">
                  <li>
                    <Link href="/">
                      <Button variant="ghost" onClick={() => setOpen(false)}>
                        Home
                      </Button>
                    </Link>
                  </li>
                  <li>
                    <Link href="/search?transactionType=Lettings">
                      <Button variant="ghost" onClick={() => setOpen(false)}>
                        Rent
                      </Button>
                    </Link>
                  </li>
                  <li>
                    <Link href="/search?transactionType=Sales">
                      <Button variant="ghost" onClick={() => setOpen(false)}>
                        Buy
                      </Button>
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact">
                      <Button variant="ghost" onClick={() => setOpen(false)}>
                        Contact
                      </Button>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.instagram.com/broadhillestate/"
                      target="_blank"
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setOpen(false)}
                      >
                        <InstagramIcon className="stroke-1" />
                      </Button>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.facebook.com/broadhillestate"
                      target="_blank"
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setOpen(false)}
                      >
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
              <Link href="/search?transactionType=Lettings">
                <Button variant="ghost">Rent</Button>
              </Link>
            </li>
            <li>
              <Link href="/search?transactionType=Sales">
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
