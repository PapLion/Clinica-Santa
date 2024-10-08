'use client'

import React, { useState } from 'react'
import { Book, Video, Headphones, FileText, Plus, Search, Download, X, Calendar, User, Bell, Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Recurso {
  id: number;
  title: string;
  type: string;
  author: string;
  date: string;
}

const recursos: Recurso[] = [
  { id: 1, title: "Estudio Bíblico: El Libro de Juan", type: "Documento", author: "Pastor García", date: "2024-09-15" },
  { id: 2, title: "Sermón: El Poder de la Oración", type: "Audio", author: "Pastor Rodríguez", date: "2024-09-22" },
  { id: 3, title: "Taller: Liderazgo Cristiano", type: "Video", author: "Dra. Martínez", date: "2024-09-29" },
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

function NuevoRecursoModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Nuevo Recurso</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <form className="space-y-4">
          <div>
            <Label htmlFor="title">Título</Label>
            <Input id="title" placeholder="Título del recurso" />
          </div>
          <div>
            <Label htmlFor="type">Tipo de Recurso</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Documento">Documento</SelectItem>
                <SelectItem value="Audio">Audio</SelectItem>
                <SelectItem value="Video">Video</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="author">Autor</Label>
            <Input id="author" placeholder="Nombre del autor" />
          </div>
          <div>
            <Label htmlFor="description">Descripción</Label>
            <Textarea id="description" placeholder="Breve descripción del recurso" />
          </div>
          <div>
            <Label htmlFor="file">Archivo</Label>
            <Input type="file" id="file" />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>Cancelar</Button>
            <Button type="submit">Subir Recurso</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

function DetalleRecursoModal({ isOpen, onClose, recurso }: { isOpen: boolean; onClose: () => void; recurso: Recurso | null }) {
  if (!isOpen || !recurso) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Detalle del Recurso</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center">
            <FileText className="h-5 w-5 mr-2 text-blue-500" />
            <span className="font-semibold">{recurso.title}</span>
          </div>
          <div className="flex items-center">
            <User className="h-5 w-5 mr-2 text-green-500" />
            <span>Autor: {recurso.author}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-yellow-500" />
            <span>Fecha: {recurso.date}</span>
          </div>
          <div className="flex items-center">
            <FileText className="h-5 w-5 mr-2 text-purple-500" />
            <span>Tipo: {recurso.type}</span>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Descripción</h3>
            <p className="text-sm text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
        <div className="mt-8 flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>Cerrar</Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Descargar
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function RecursosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isNuevoRecursoOpen, setIsNuevoRecursoOpen] = useState(false)
  const [isDetalleRecursoOpen, setIsDetalleRecursoOpen] = useState(false)
  const [selectedRecurso, setSelectedRecurso] = useState<Recurso | null>(null)

  const handleOpenDetalleRecurso = (recurso: Recurso) => {
    setSelectedRecurso(recurso)
    setIsDetalleRecursoOpen(true)
  }

  const getRecursoIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'documento':
        return <FileText className="h-8 w-8 text-blue-500" />
      case 'audio':
        return <Headphones className="h-8 w-8 text-green-500" />
      case 'video':
        return <Video className="h-8 w-8 text-red-500" />
      default:
        return <Book className="h-8 w-8 text-yellow-500" />
    }
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Recursos de la Iglesia</h1>
        
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-64">
            <Input
              type="text"
              placeholder="Buscar recurso..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          <Button onClick={() => setIsNuevoRecursoOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Recurso
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recursos.map((recurso) => (
            <Card key={recurso.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-semibold line-clamp-1">
                  {recurso.title}
                </CardTitle>
                {getRecursoIcon(recurso.type)}
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600 space-y-2">
                  <p className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-gray-400" />
                    {recurso.author}
                  </p>
                  <p className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                    {recurso.date}
                  </p>
                  <p className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-gray-400" />
                    {recurso.type}
                  </p>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Descargar
                  </Button>
                  <Button size="sm" onClick={() => handleOpenDetalleRecurso(recurso)}>
                    Ver Detalles
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      
      <NuevoRecursoModal isOpen={isNuevoRecursoOpen} onClose={() => setIsNuevoRecursoOpen(false)} />
      <DetalleRecursoModal 
        isOpen={isDetalleRecursoOpen} 
        onClose={() => setIsDetalleRecursoOpen(false)} 
        recurso={selectedRecurso}
      />
    </div>
  )
}