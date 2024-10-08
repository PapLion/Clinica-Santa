'use client'

import React, { useState } from 'react'
import { Calendar, Clock, User, Plus, Search, Filter, X, FileText, Bell, Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Appointment {
  id: number;
  patient: string;
  date: string;
  time: string;
  reason: string;
}

const appointments: Appointment[] = [
  { id: 1, patient: "María López", date: "2024-10-05", time: "09:00", reason: "Chequeo anual" },
  { id: 2, patient: "Juan Pérez", date: "2024-10-05", time: "10:30", reason: "Seguimiento" },
  { id: 3, patient: "Ana García", date: "2024-10-05", time: "11:45", reason: "Consulta general" },
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

function NuevaCitaModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Nueva Cita</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <form className="space-y-4">
          <div>
            <Label htmlFor="patient">Paciente</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar paciente" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">María López</SelectItem>
                <SelectItem value="2">Juan Pérez</SelectItem>
                <SelectItem value="3">Ana García</SelectItem>
              </SelectContent>
            </Select>
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
            <Label htmlFor="reason">Motivo de la cita</Label>
            <Textarea id="reason" placeholder="Describa brevemente el motivo de la cita" />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>Cancelar</Button>
            <Button type="submit">Guardar Cita</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

function DetalleCitaModal({ isOpen, onClose, appointment }: { isOpen: boolean; onClose: () => void; appointment: Appointment | null }) {
  if (!isOpen || !appointment) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Detalle de la Cita</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center">
            <User className="h-5 w-5 mr-2 text-blue-500" />
            <span className="font-semibold">{appointment.patient}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-green-500" />
            <span>{appointment.date}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-5 w-5 mr-2 text-yellow-500" />
            <span>{appointment.time}</span>
          </div>
          <div className="flex items-start">
            <FileText className="h-5 w-5 mr-2 text-purple-500 mt-1" />
            <span>{appointment.reason}</span>
          </div>
        </div>
        <div className="mt-8 flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>Cerrar</Button>
          <Button>Editar Cita</Button>
        </div>
      </div>
    </div>
  )
}

export default function CitasPage() {
  const [selectedDate, setSelectedDate] = useState("2024-10-05")
  const [isNuevaCitaOpen, setIsNuevaCitaOpen] = useState(false)
  const [isDetalleCitaOpen, setIsDetalleCitaOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)

  const handleOpenDetalleCita = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setIsDetalleCitaOpen(true)
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Gestión de Citas</h1>
        
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
                placeholder="Buscar cita..."
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
            <Button onClick={() => setIsNuevaCitaOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Nueva Cita
            </Button>
          </div>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Citas del Día</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <Card key={appointment.id}>
                  <CardContent className="flex items-center p-4">
                    <div className="flex-grow">
                      <p className="font-semibold">{appointment.patient}</p>
                      <p className="text-sm text-gray-600">{appointment.reason}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-blue-500" />
                        <span className="text-sm">{appointment.time}</span>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleOpenDetalleCita(appointment)}>
                        Ver Detalles
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-500">Total de Citas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-blue-500 mr-2" />
                <span className="text-2xl font-bold">8</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Hoy</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-500">Citas Pendientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-yellow-500 mr-2" />
                <span className="text-2xl font-bold">5</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Por atender</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-500">Citas Completadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <User className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-2xl font-bold">3</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Pacientes atendidos</p>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <NuevaCitaModal isOpen={isNuevaCitaOpen} onClose={() => setIsNuevaCitaOpen(false)} />
      <DetalleCitaModal 
        isOpen={isDetalleCitaOpen} 
        onClose={() => setIsDetalleCitaOpen(false)} 
        appointment={selectedAppointment}
      />
    </div>
  )
}