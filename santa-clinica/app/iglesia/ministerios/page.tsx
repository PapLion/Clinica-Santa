'use client'

import React, { useState } from 'react'

import { Users, Music, Book, Heart, Plus, Search, FileText, X, Calendar, User, Bell, Menu } from 'lucide-react'

import { Button } from "@/components/ui/button"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"

import { Textarea } from "@/components/ui/textarea"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Definir la interfaz para un ministerio
interface Ministerio {
  id: number;
  name: string;
  leader: string;
  members: number;
  description: string;
}

const ministerios = [
  { id: 1, name: "Alabanza", leader: "Carlos Rodríguez", members: 15, description: "Ministerio de música y adoración" },
  { id: 2, name: "Escuela Dominical", leader: "Ana Martínez", members: 8, description: "Enseñanza bíblica para niños" },
  { id: 3, name: "Jóvenes", leader: "David López", members: 25, description: "Actividades y estudios para jóvenes" },
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

function NuevoMinisterioModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Nuevo Ministerio</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <form className="space-y-4">
          <div>
            <Label htmlFor="name">Nombre del Ministerio</Label>
            <Input id="name" placeholder="Nombre del ministerio" />
          </div>
          <div>
            <Label htmlFor="leader">Líder</Label>
            <Input id="leader" placeholder="Nombre del líder" />
          </div>
          <div>
            <Label htmlFor="description">Descripción</Label>
            <Textarea id="description" placeholder="Breve descripción del ministerio" />
          </div>
          <div>
            <Label htmlFor="meetingDay">Día de Reunión</Label>
            <Select>
              <SelectTrigger id="meetingDay">
                <SelectValue placeholder="Seleccionar día" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Lunes">Lunes</SelectItem>
                <SelectItem value="Martes">Martes</SelectItem>
                <SelectItem value="Miércoles">Miércoles</SelectItem>
                <SelectItem value="Jueves">Jueves</SelectItem>
                <SelectItem value="Viernes">Viernes</SelectItem>
                <SelectItem value="Sábado">Sábado</SelectItem>
                <SelectItem value="Domingo">Domingo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="meetingTime">Hora de Reunión</Label>
            <Input type="time" id="meetingTime" />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>Cancelar</Button>
            <Button type="submit">Crear Ministerio</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

function DetalleMinisterioModal({ isOpen, onClose, ministerio }: { isOpen: boolean; onClose: () => void; ministerio: Ministerio | null }) {
  if (!isOpen || !ministerio) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Detalle del Ministerio</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-blue-500" />
              <span className="font-semibold">{ministerio.name}</span>
            </div>
            <div className="flex items-center">
              <User className="h-5 w-5 mr-2 text-green-500" />
              <span>Líder: {ministerio.leader}</span>
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-yellow-500" />
              <span>Miembros: {ministerio.members}</span>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-indigo-500" />
              Descripción
            </h3>
            <p className="text-sm text-gray-600">{ministerio.description}</p>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="font-semibold mb-2">Próximas Actividades</h3>
          <ul className="space-y-2">
            <li className="text-sm flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-gray-400" />
              2024-10-10: Reunión semanal
            </li>
            <li className="text-sm flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-gray-400" />
              2024-10-17: Taller de capacitación
            </li>
            <li className="text-sm flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-gray-400" />
              2024-10-24: Evento especial
            </li>
          </ul>
        </div>
        <div className="mt-8 flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>Cerrar</Button>
          <Button>Editar Ministerio</Button>
        </div>
      </div>
    </div>
  )
}

export default function MinisteriosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isNuevoMinisterioOpen, setIsNuevoMinisterioOpen] = useState(false)
  const [isDetalleMinisterioOpen, setIsDetalleMinisterioOpen] = useState(false)
  const [selectedMinisterio, setSelectedMinisterio] = useState<Ministerio | null>(null)

  const handleOpenDetalleMinisterio = (ministerio: Ministerio) => {
    setSelectedMinisterio(ministerio)
    setIsDetalleMinisterioOpen(true)
  }

  const getMinisterioIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'alabanza':
        return <Music className="h-8 w-8 text-blue-500" />
      case 'escuela dominical':
        return <Book className="h-8 w-8 text-green-500" />
      case 'jóvenes':
        return <Users className="h-8 w-8 text-yellow-500" />
      default:
        return <Heart className="h-8 w-8 text-red-500" />
    }
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Ministerios de la Iglesia</h1>
        
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-64">
            <Input
              type="text"
              placeholder="Buscar ministerio..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          <Button onClick={() => setIsNuevoMinisterioOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Ministerio
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ministerios.map((ministerio) => (
            <Card key={ministerio.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-semibold">
                  {ministerio.name}
                </CardTitle>
                {getMinisterioIcon(ministerio.name)}
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600 space-y-2">
                  <p className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-gray-400" />
                    Líder: {ministerio.leader}
                  </p>
                  <p className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-gray-400" />
                    Miembros: {ministerio.members}
                  </p>
                  <p className="line-clamp-2">{ministerio.description}</p>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button size="sm" onClick={() => handleOpenDetalleMinisterio(ministerio)}>
                    Ver Detalles
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      
      <NuevoMinisterioModal isOpen={isNuevoMinisterioOpen} onClose={() => setIsNuevoMinisterioOpen(false)} />
      <DetalleMinisterioModal 
        isOpen={isDetalleMinisterioOpen} 
        onClose={() => setIsDetalleMinisterioOpen(false)} 
        ministerio={selectedMinisterio}
      />
    </div>
  )
}