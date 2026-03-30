import Image from 'next/image'
import React from 'react'

import './styles.css'

export default function HomePage() {
  return (
    <div className="home">
      <div className="content">
        <Image
          alt="The Financial Brief"
          height={200}
          src="/logo-reverse.svg"
          width={500}
          priority
        />
        <p className="tagline">Clear financial insights. No noise. No jargon.</p>
        <div className="links">
          <a className="admin" href="/admin">
            Admin Panel
          </a>
        </div>
      </div>
    </div>
  )
}
