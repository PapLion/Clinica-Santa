'use client'

import React, { useState } from 'react'
import { Search, User, Plus, FileText, X, Calendar, Phone, Mail, MapPin, Heart, Bell, Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Member {
  id: number;
  name: string;
  age: number;
  joinDate: string;
  ministry: string;
  address: string;
  phone: number;
  email: string;
  notes: string;
}

const members: Member[] = [
  { id: 1, name: "María López", age: 35, joinDate: "2020-05-15", ministry: "Coro", phone: 997541234, address: "avenida san juan del lurigancho", email: "pepito@gmail.com", notes: "es inteligente" },
  { id: 2, name: "Juan Pérez", age: 42, joinDate: "2018-03-10", ministry: "Escuela Dominical", phone: 997541234, address: "avenida san juan del lurigancho", email: "pepito@gmail.com", notes: "es inteligente"  },
  { id: 3, name: "Ana García", age: 28, joinDate: "2021-09-22", ministry: "Jóvenes", phone: 997541234, address: "avenida san juan del lurigancho", email: "pepito@gmail.com", notes: "es inteligente" },
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

function NuevoMiembroModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Nuevo Miembro</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <form className="space-y-4">
          <div>
            <Label htmlFor="name">Nombre Completo</Label>
            <Input id="name" placeholder="Nombre del miembro" />
          </div>
          <div>
            <Label htmlFor="age">Edad</Label>
            <Input type="number" id="age" placeholder="Edad del miembro" />
          </div>
          <div>
            <Label htmlFor="joinDate">Fecha de Ingreso</Label>
            <Input type="date" id="joinDate" />
          </div>
          <div>
            <Label htmlFor="phone">Teléfono</Label>
            <Input id="phone" placeholder="Número de teléfono" />
          </div>
          <div>
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input type="email" id="email" placeholder="correo@ejemplo.com" />
          </div>
          <div>
            <Label htmlFor="address">Dirección</Label>
            <Textarea id="address" placeholder="Dirección del miembro" />
          </div>
          <div>
            <Label htmlFor="ministry">Ministerio</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar ministerio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Coro">Coro</SelectItem>
                <SelectItem value="Escuela Dominical">Escuela Dominical</SelectItem>
                <SelectItem value="Jóvenes">Jóvenes</SelectItem>
                <SelectItem value="Misiones">Misiones</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="notes">Notas Adicionales</Label>
            <Textarea id="notes" placeholder="Información adicional relevante" />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>Cancelar</Button>
            <Button type="submit">Guardar Miembro</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

function DetalleMiembroModal({ isOpen, onClose, member }: { isOpen: boolean; onClose: () => void; member: Member | null }) {
  if (!isOpen || !member) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Detalle del Miembro</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center">
              <User className="h-5 w-5 mr-2 text-blue-500" />
              <span className="font-semibold">{member.name}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-green-500" />
              <span>Edad: {member.age} años</span>
            </div>
            <div className="flex items-center">
              <Phone className="h-5 w-5 mr-2 text-yellow-500" />
              <span>Teléfono: {member.phone || 'No disponible'}</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-5 w-5 mr-2 text-purple-500" />
              <span>Email: {member.email || 'No disponible'}</span>
            </div>
            <div className="flex items-start">
              <MapPin className="h-5 w-5 mr-2 text-red-500 mt-1" />
              <span>Dirección: {member.address || 'No disponible'}</span>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2 flex items-center">
              <Heart className="h-5 w-5 mr-2 text-pink-500" />
              Ministerio
            </h3>
            <p>{member.ministry}</p>
            <h3 className="font-semibold mt-4 mb-2 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-indigo-500" />
              Notas Adicionales
            </h3>
            <p className="text-sm text-gray-600">{member.notes || 'No hay notas adicionales.'}</p>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="font-semibold mb-2">Participación Reciente</h3>
          <ul className="space-y-2">
            <li className="text-sm">2024-09-28: Asistió al retiro de jóvenes</li>
            <li className="text-sm">2024-08-15: Participó en el coro para el servicio dominical</li>
            <li className="text-sm">2024-07-03: Voluntario en el evento de alcance comunitario</li>
          </ul>
        </div>
        <div className="mt-8 flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>Cerrar</Button>
          <Button>Editar Información</Button>
        </div>
      </div>
    </div>
  )
}

export default function MiembrosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isNuevoMiembroOpen, setIsNuevoMiembroOpen] = useState(false)
  const [isDetalleMiembroOpen, setIsDetalleMiembroOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)

  const handleOpenDetalleMiembro = (member: Member) => {
    setSelectedMember(member)
    setIsDetalleMiembroOpen(true)
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Gestión de Miembros</h1>
        
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-64">
            <Input
              type="text"
              placeholder="Buscar miembro..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          <Button onClick={() => setIsNuevoMiembroOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Miembro
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) => (
            <Card key={member.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {member.name}
                </CardTitle>
                <User className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Edad: {member.age}</p>
                  <p>Fecha de ingreso: {member.joinDate}</p>
                  <p>Ministerio: {member.ministry}</p>
                </div>
                <div className="mt-4 flex justify-between">
                  <Button variant="outline" size="sm" onClick={() => handleOpenDetalleMiembro(member)}>
                    <FileText className="mr-2 h-4 w-4" />
                    Ver Detalles
                  </Button>
                  <Button size="sm">Editar</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      
      <NuevoMiembroModal isOpen={isNuevoMiembroOpen} onClose={() => setIsNuevoMiembroOpen(false)} />
      <DetalleMiembroModal 
        isOpen={isDetalleMiembroOpen} 
        onClose={() => setIsDetalleMiembroOpen(false)} 
        member={selectedMember}
      />
    </div>
  )
}