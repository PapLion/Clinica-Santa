'use client'

import React, { useState } from 'react'
import { Bell, Calendar, Clock, User, Filter, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const notifications = [
  { id: 1, type: 'Cita', message: 'Recordatorio: Cita con María López mañana a las 10:00 AM', date: '2024-10-05', time: '09:00' },
  { id: 2, type: 'Inventario', message: 'Stock bajo: Jeringuillas 5ml', date: '2024-10-04', time: '14:30' },
  { id: 3, type: 'Sistema', message: 'Actualización del sistema programada para esta noche', date: '2024-10-03', time: '18:00' },
  { id: 4, type: 'Cita', message: 'Cita cancelada: Juan Pérez - 2024-10-06', date: '2024-10-03', time: '11:45' },
]

function Header() {
  return (
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
  )
}

function NotificationCard({ notification }) {
  return (
    <Card className="mb-4">
      <CardContent className="flex items-center p-4">
        <div className="mr-4">
          {notification.type === 'Cita' && <Calendar className="h-8 w-8 text-blue-500" />}
          {notification.type === 'Inventario' && <Package className="h-8 w-8 text-yellow-500" />}
          {notification.type === 'Sistema' && <Settings className="h-8 w-8 text-purple-500" />}
        </div>
        <div className="flex-grow">
          <p className="font-semibold">{notification.message}</p>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{notification.date}</span>
            <Clock className="h-4 w-4 ml-2 mr-1" />
            <span>{notification.time}</span>
          </div>
        </div>
        <Button variant="ghost" size="sm">
          <X className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  )
}

export default function NotificacionesPage() {
  const [selectedTab, setSelectedTab] = useState('todas')
  const [dateFilter, setDateFilter] = useState('')

  const filteredNotifications = notifications.filter(notification => {
    if (selectedTab !== 'todas' && notification.type.toLowerCase() !== selectedTab) {
      return false
    }
    if (dateFilter && notification.date !== dateFilter) {
      return false
    }
    return true
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Notificaciones</h1>
        
        <div className="flex justify-between items-center mb-6">
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList>
              <TabsTrigger value="todas">Todas</TabsTrigger>
              <TabsTrigger value="cita">Citas</TabsTrigger>
              <TabsTrigger value="inventario">Inventario</TabsTrigger>
              <TabsTrigger value="sistema">Sistema</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex items-center space-x-2">
            <Input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-40"
            />
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filtrar
            </Button>
          </div>
        </div>
        
        <div className="space-y-4">
          {filteredNotifications.map(notification => (
            <NotificationCard key={notification.id} notification={notification} />
          ))}
        </div>
        
        {filteredNotifications.length === 0 && (
          <Card>
            <CardContent className="p-6 text-center text-gray-500">
              No hay notificaciones que coincidan con los filtros seleccionados.
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}