'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Navigation() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname.startsWith(path)

  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">
        <li><Link href="/" className={isActive('/') ? 'font-bold' : ''}>Inicio</Link></li>
        <li><Link href="/centro-medico" className={isActive('/centro-medico') ? 'font-bold' : ''}>Centro Médico</Link></li>
        <li><Link href="/iglesia" className={isActive('/iglesia') ? 'font-bold' : ''}>Iglesia</Link></li>
      </ul>
    </nav>
  )
}