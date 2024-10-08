'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { DollarSign, CreditCard, PieChart, TrendingUp, Plus, FileText, X, Calendar, User, Bell, Menu, Percent, Users, Clipboard } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from 'next/navigation'

const FeatureButton: React.FC<{ icon: React.ReactNode; title: string; href: string }> = ({ icon, title, href }) => {
  const router = useRouter()
  return (
    <Button 
      variant="outline" 
      className="w-full justify-start space-x-2 h-auto py-4 px-4 bg-white hover:bg-gray-50"
      onClick={() => router.push(href)}
    >
      {icon}
      <span>{title}</span>
    </Button>
  )
}

export default function CentroMedicoHomeRedesigned() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-cover bg-center">
      <div className="min-h-screen bg-white/90 backdrop-blur-sm">
      <header className="bg-white/80 shadow-sm backdrop-blur-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Centro Médico Arévalo</h1>
        <nav className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
          <Button variant="ghost">
            <Menu className="h-5 w-5 mr-2" />
            Menú
          </Button>
        </nav>
      </div>
    </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h2 className="text-4xl font-light text-gray-900 mb-4">Bienvenido, Dr. Arévalo</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              "La salud no lo es todo, pero sin ella, todo lo demás es nada." - Arthur Schopenhauer
            </p>
          </motion.section>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4"
            >
              <FeatureButton 
                icon={<Calendar className="h-5 w-5 text-blue-600" />}
                title="Gestión de Citas"
                href="/centro-medico/citas"
              />
              <FeatureButton 
                icon={<Users className="h-5 w-5 text-green-600" />}
                title="Pacientes"
                href="/centro-medico/pacientes"
              />
              <FeatureButton 
                icon={<Clipboard className="h-5 w-5 text-yellow-600" />}
                title="Inventario"
                href="/centro-medico/inventario"
              />
              <FeatureButton 
                icon={<Bell className="h-5 w-5 text-red-600" />}
                title="Notificaciones"
                href="/centro-medico/notificaciones"
              />
              <FeatureButton 
                icon={<PieChart className="h-5 w-5 text-purple-600" />}
                title="Reportes"
                href="/centro-medico/reportes"
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="md:col-span-2"
            >
              <Card className="bg-white/70 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-medium text-gray-900 mb-4">Próximas Citas</h3>
                  <ul className="space-y-4">
                    {[
                      { patient: "María López", date: "Hoy", time: "15:00" },
                      { patient: "Juan Pérez", date: "Mañana", time: "10:30" },
                      { patient: "Ana García", date: "Miércoles", time: "14:15" },
                      { patient: "Carlos Rodríguez", date: "Jueves", time: "11:00" }
                    ].map((item, index) => (
                      <li key={index} className="flex justify-between items-center border-b border-gray-200 pb-2">
                        <span className="font-medium">{item.patient}</span>
                        <span className="text-sm text-gray-600">{item.date} - {item.time}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 text-center"
          >
            <h3 className="text-2xl font-medium text-gray-900 mb-4">Estadísticas del Día</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="bg-white/70 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <h4 className="text-lg font-medium text-gray-700">Pacientes Atendidos</h4>
                  <p className="text-3xl font-bold text-blue-600">12</p>
                </CardContent>
              </Card>
              <Card className="bg-white/70 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <h4 className="text-lg font-medium text-gray-700">Citas Pendientes</h4>
                  <p className="text-3xl font-bold text-green-600">5</p>
                </CardContent>
              </Card>
              <Card className="bg-white/70 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <h4 className="text-lg font-medium text-gray-700">Nuevos Pacientes</h4>
                  <p className="text-3xl font-bold text-purple-600">3</p>
                </CardContent>
              </Card>
            </div>
          </motion.section>
        </main>
      </div>
    </div>
  )
}