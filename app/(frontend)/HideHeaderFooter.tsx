'use client'

import { useEffect } from 'react'

export default function HideHeaderFooter() {
  useEffect(() => {
    const header = document.querySelector('.site-header')
    const footer = document.querySelector('.footer')
    if (header) header.style.display = 'none'
    if (footer) footer.style.display = 'none'
    return () => {
      if (header) header.style.display = ''
      if (footer) footer.style.display = ''
    }
  }, [])
  return null
}
