import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type FormType = 'login' | 'register'

export default function LoginRegister({ onLogin }: { onLogin: () => void }) {
  const [activeForm, setActiveForm] = useState<FormType>('login')
  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '' })

  const switchForm = (form: FormType) => {
    setActiveForm(form)
    setLoginData({ email: '', password: '' })
    setRegisterData({ name: '', email: '', password: '' })
  }

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value })
  }

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log(activeForm === 'login' ? loginData : registerData)
    
    // Simulating a successful login
    if (activeForm === 'login') {
      // Replace this with actual login logic
      localStorage.setItem('isAuthenticated', 'true')
      onLogin()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md"
      >
        <div className="flex mb-8">
          <Button
            onClick={() => switchForm('login')}
            className={`flex-1 ${activeForm === 'login' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            Iniciar Sesión
          </Button>
          <Button
            onClick={() => switchForm('register')}
            className={`flex-1 ${activeForm === 'register' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            Registrarse
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {activeForm === 'register' && (
            <div>
              <Label htmlFor="name" className="text-sm font-medium text-gray-700">Nombre</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={registerData.name}
                onChange={handleRegisterChange}
                className="mt-1"
                required
              />
            </div>
          )}
          <div>
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">Correo Electrónico</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={activeForm === 'login' ? loginData.email : registerData.email}
              onChange={activeForm === 'login' ? handleLoginChange : handleRegisterChange}
              className="mt-1"
              required
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">Contraseña</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={activeForm === 'login' ? loginData.password : registerData.password}
              onChange={activeForm === 'login' ? handleLoginChange : handleRegisterChange}
              className="mt-1"
              required
            />
          </div>
          <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700">
            {activeForm === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
          </Button>
        </form>

        {activeForm === 'login' && (
          <p className="mt-4 text-center text-sm text-gray-600">
            ¿Olvidaste tu contraseña?{' '}
            <a href="#" className="text-blue-600 hover:underline">
              Recupérala aquí
            </a>
          </p>
        )}
      </motion.div>
    </div>
  )
}