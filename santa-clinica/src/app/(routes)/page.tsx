'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-light text-gray-800 mb-12">Bienvenido Pastor, Elija una opción</h1>
      <div className="flex flex-col sm:flex-row space-y-8 sm:space-y-0 sm:space-x-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-40 h-40 rounded-full bg-blue-50 flex flex-col items-center justify-center text-blue-600 shadow-md hover:shadow-lg transition-shadow"
          onClick={() => router.push('/clinica')}
        >
          <svg className="w-12 h-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <span className="text-center">Centro Médico</span>
          <ChevronRight className="w-4 h-4 mt-2" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-40 h-40 rounded-full bg-green-50 flex flex-col items-center justify-center text-green-600 shadow-md hover:shadow-lg transition-shadow"
          onClick={() => router.push('/iglesia')}
        >
          <svg className="w-12 h-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
          <span className="text-center">Iglesia</span>
          <ChevronRight className="w-4 h-4 mt-2" />
        </motion.button>
      </div>
    </div>
  )
}