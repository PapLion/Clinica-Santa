'use client'

import React, { useState } from 'react'
import { Search, User, Plus, FileText, X, Calendar, Phone, Mail, MapPin } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const patients = [
  { id: 1, name: "María López", age: 35, lastVisit: "2024-09-28", condition: "Hipertensión" },
  { id: 2, name: "Juan Pérez", age: 42, lastVisit: "2024-09-30", condition: "Diabetes Tipo 2" },
  { id: 3, name: "Ana García", age: 28, lastVisit: "2024-10-02", condition: "Asma" },
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

function NuevoPacienteModal({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Nuevo Paciente</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <form className="space-y-4">
          <div>
            <Label htmlFor="name">Nombre Completo</Label>
            <Input id="name" placeholder="Nombre del paciente" />
          </div>
          <div>
            <Label htmlFor="age">Edad</Label>
            <Input type="number" id="age" placeholder="Edad del paciente" />
          </div>
          <div>
            <Label htmlFor="birthdate">Fecha de Nacimiento</Label>
            <Input type="date" id="birthdate" />
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
            <Textarea id="address" placeholder="Dirección del paciente" />
          </div>
          <div>
            <Label htmlFor="medicalHistory">Historial Médico</Label>
            <Textarea id="medicalHistory" placeholder="Breve resumen del historial médico" />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>Cancelar</Button>
            <Button type="submit">Guardar Paciente</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

function DetallePacienteModal({ isOpen, onClose, patient }) {
  if (!isOpen || !patient) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Detalle del Paciente</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center">
              <User className="h-5 w-5 mr-2 text-blue-500" />
              <span className="font-semibold">{patient.name}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-green-500" />
              <span>Edad: {patient.age} años</span>
            </div>
            <div className="flex items-center">
              <Phone className="h-5 w-5 mr-2 text-yellow-500" />
              <span>Teléfono: {patient.phone || 'No disponible'}</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-5 w-5 mr-2 text-purple-500" />
              <span>Email: {patient.email || 'No disponible'}</span>
            </div>
            <div className="flex items-start">
              <MapPin className="h-5 w-5 mr-2 text-red-500 mt-1" />
              <span>Dirección: {patient.address || 'No disponible'}</span>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-indigo-500" />
              Historial Médico
            </h3>
            <p className="text-sm text-gray-600">{patient.medicalHistory || 'No hay historial médico disponible.'}</p>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="font-semibold mb-2">Últimas Visitas</h3>
          <ul className="space-y-2">
            <li className="text-sm">2024-09-28: Chequeo de presión arterial</li>
            <li className="text-sm">2024-08-15: Consulta por dolor de cabeza</li>
            <li className="text-sm">2024-07-03: Vacunación anual</li>
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

export default function PacientesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isNuevoPacienteOpen, setIsNuevoPacienteOpen] = useState(false)
  const [isDetallePacienteOpen, setIsDetallePacienteOpen] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState(null)

  const handleOpenDetallePaciente = (patient) => {
    setSelectedPatient(patient)
    setIsDetallePacienteOpen(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Gestión de Pacientes</h1>
        
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-64">
            <Input
              type="text"
              placeholder="Buscar paciente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          <Button onClick={() => setIsNuevoPacienteOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Paciente
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {patients.map((patient) => (
            <Card key={patient.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {patient.name}
                </CardTitle>
                <User className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Edad: {patient.age}</p>
                  <p>Última visita: {patient.lastVisit}</p>
                  <p>Condición: {patient.condition}</p>
                </div>
                <div className="mt-4 flex justify-between">
                  <Button variant="outline" size="sm" onClick={() => handleOpenDetallePaciente(patient)}>
                    <FileText className="mr-2 h-4 w-4" />
                    Ver Historial
                  </Button>
                  <Button size="sm">Editar</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      
      <NuevoPacienteModal isOpen={isNuevoPacienteOpen} onClose={() => setIsNuevoPacienteOpen(false)} />
      <DetallePacienteModal 
        isOpen={isDetallePacienteOpen} 
        onClose={() => setIsDetallePacienteOpen(false)} 
        patient={selectedPatient}
      />
    </div>
  )
}