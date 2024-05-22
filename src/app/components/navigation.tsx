'use client'

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
  }, [])

  return (
    <header className="main-nav-bar py-6 px-10 fixed z-50 top-0 w-full transition-[background]">
      <nav className="flex justify-between items-center ">
        <Link href="/" className="text-2xl">
          Broadhill Estate
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link href="/search">Search</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
