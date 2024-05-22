import { useEffect, useState } from 'react'

const breakpoints = {
  sm: 640,
  // => @media (min-width: 640px) { ... }

  md: 768,
  // => @media (min-width: 768px) { ... }

  lg: 1024,
  // => @media (min-width: 1024px) { ... }

  xl: 1280,
  // => @media (min-width: 1280px) { ... }

  '2xl': 1536,
  // => @media (min-width: 1536px) { ... }
}

export const useIsMobile = (breakpoint: 'sm' | 'md' | 'lg' | 'xl' | '2xl') => {
  const [width, setWidth] = useState<number>(0)
  const [isMobile, setIsMobile] = useState(false)
  function handleWindowSizeChange() {
    setWidth(window.innerWidth)
  }

  useEffect(() => {
    setWidth(window.innerWidth)
    setIsMobile(width <= 768)
    window.addEventListener('resize', handleWindowSizeChange)
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange)
    }
  }, [width])

  useEffect(() => {
    setIsMobile(width <= breakpoints[breakpoint])
  }, [breakpoint, width])

  if (isMobile === null) {
    return false
  }

  return isMobile
}
