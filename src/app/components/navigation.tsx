'use client'

import { Button } from '@/components/ui/button'
import { FacebookIcon, InstagramIcon, SearchIcon } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'

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

  return (
    <header className="main-nav-bar py-6 px-10 fixed z-50 top-0 w-full transition-[background]">
      <nav className="flex justify-between items-center gap-8">
        <Link href="/" className="text-2xl">
          Broadhill Estate
        </Link>
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
      </nav>
    </header>
  )
}
