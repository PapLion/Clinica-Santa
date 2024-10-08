'use client'

import React, { useState } from 'react'
import { Calendar, Clock, MapPin, Users, Plus, Search, Filter, X, FileText, Bell, Menu, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Event {
  id: number;
  name: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  description: string;
}

const events: Event[] = [
  { id: 1, name: "Servicio Dominical", date: "2024-10-06", time: "10:00", location: "Auditorio Principal", attendees: 150, description: "oli" },
  { id: 2, name: "Estudio Bíblico", date: "2024-10-08", time: "19:00", location: "Sala de Conferencias", attendees: 30, description: "oli2" },
  { id: 3, name: "Retiro de Jóvenes", date: "2024-10-15", time: "08:00", location: "Campamento El Redentor", attendees: 50, description: "oli3" },
]

function Header() {
  return (
    <header className="bg-white/80 shadow-sm backdrop-blur-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Iglesia Monte Moriah</h1>
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

function NuevoEventoModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Nuevo Evento</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <form className="space-y-4">
          <div>
            <Label htmlFor="name">Nombre del Evento</Label>
            <Input id="name" placeholder="Nombre del evento" />
          </div>
          <div>
            <Label htmlFor="date">Fecha</Label>
            <Input type="date" id="date" />
          </div>
          <div>
            <Label htmlFor="time">Hora</Label>
            <Input type="time" id="time" />
          </div>
          <div>
            <Label htmlFor="location">Ubicación</Label>
            <Input id="location" placeholder="Lugar del evento" />
          </div>
          <div>
            <Label htmlFor="description">Descripción</Label>
            <Textarea id="description" placeholder="Descripción del evento" />
          </div>
          <div>
            <Label htmlFor="type">Tipo de Evento</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Servicio">Servicio</SelectItem>
                <SelectItem value="Estudio Bíblico">Estudio Bíblico</SelectItem>
                <SelectItem value="Retiro">Retiro</SelectItem>
                <SelectItem value="Alcance">Alcance Comunitario</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>Cancelar</Button>
            <Button type="submit">Guardar Evento</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

function DetalleEventoModal({ isOpen, onClose, event }: { isOpen: boolean; onClose: () => void; event: Event | null }) {
  if (!isOpen || !event) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Detalle del Evento</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-blue-500" />
            <span className="font-semibold">{event.name}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-5 w-5 mr-2 text-green-500" />
            <span>{event.date} a las {event.time}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-yellow-500" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-5 w-5 mr-2 text-purple-500" />
            <span>Asistentes esperados: {event.attendees}</span>
          </div>
          <div className="flex items-start">
            <FileText className="h-5 w-5 mr-2 text-indigo-500 mt-1" />
            <span>{event.description || 'No hay descripción disponible.'}</span>
          </div>
        </div>
        <div className="mt-8 flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>Cerrar</Button>
          <Button>Editar Evento</Button>
        </div>
      </div>
    </div>
  )
}

export default function EventosPage() {
  const [selectedDate, setSelectedDate] = useState("")
  const [isNuevoEventoOpen, setIsNuevoEventoOpen] = useState(false)
  const [isDetalleEventoOpen, setIsDetalleEventoOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  const handleOpenDetalleEvento = (event: Event) => {
    setSelectedEvent(event)
    setIsDetalleEventoOpen(true)
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Eventos de la Iglesia</h1>
        
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-4 items-center">
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-40"
            />
            <div className="relative">
              <Input
                type="text"
                placeholder="Buscar evento..."
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
          <div className="space-x-2">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filtrar
            </Button>
            <Button onClick={() => setIsNuevoEventoOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Evento
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card key={event.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {event.name}
                </CardTitle>
                <Calendar className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600 space-y-1">
                  <p className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                    {event.date}
                  </p>
                  <p className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-gray-400" />
                    {event.time}
                  </p>
                  <p className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                    {event.location}
                  </p>
                  <p className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-gray-400" />
                    {event.attendees} asistentes
                  </p>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button size="sm" onClick={() => handleOpenDetalleEvento(event)}>
                    Ver Detalles
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      
      <NuevoEventoModal isOpen={isNuevoEventoOpen} onClose={() => setIsNuevoEventoOpen(false)} />
      <DetalleEventoModal 
        isOpen={isDetalleEventoOpen} 
        onClose={() => setIsDetalleEventoOpen(false)} 
        event={selectedEvent}
      />
    </div>
  )
}