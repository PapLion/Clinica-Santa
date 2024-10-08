'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import LoginRegister from './auth'
import HomePage from './home'

export default function EntryPoint() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for authentication status
    const checkAuth = async () => {
      // Replace this with your actual authentication check
      const auth = localStorage.getItem('isAuthenticated')
      setIsAuthenticated(auth === 'true')
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return isAuthenticated ? <HomePage /> : <LoginRegister onLogin={() => setIsAuthenticated(true)} />
}