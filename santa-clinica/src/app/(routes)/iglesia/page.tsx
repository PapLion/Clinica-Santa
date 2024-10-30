// app/iglesia/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Users, UserPlus, ArrowLeft, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

interface Member {
  id: number;
  name: string;
  age: number;
  joinDate: string;
  ministry: string;
  address: string;
  phone: string;
  email: string;
  notes: string;
}

export default function IglesiaPage() {
  const { toast } = useToast()
  const [miembros, setMiembros] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [nuevoMiembro, setNuevoMiembro] = useState<Omit<Member, 'id'>>({
    name: '', age: 0, joinDate: '', ministry: '', address: '', phone: '', email: '', notes: ''
  })
  const [mostrarFormulario, setMostrarFormulario] = useState(false)

  useEffect(() => {
    fetchMiembros()
  }, [])

  const fetchMiembros = async () => {
    try {
      const response = await fetch('/api/members')
      if (!response.ok) throw new Error('Error fetching members')
      const data = await response.json()
      setMiembros(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los miembros",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const agregarMiembro = async () => {
    if (!nuevoMiembro.name || !nuevoMiembro.age || !nuevoMiembro.joinDate || !nuevoMiembro.ministry) {
      toast({
        title: "Error",
        description: "Por favor complete todos los campos requeridos",
        variant: "destructive",
      })
      return
    }

    setSubmitting(true)
    try {
      const response = await fetch('/api/members', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...nuevoMiembro,
          age: Number(nuevoMiembro.age)
        }),
      })

      if (!response.ok) throw new Error('Error creating member')

      await fetchMiembros()
      setNuevoMiembro({ name: '', age: 0, joinDate: '', ministry: '', address: '', phone: '', email: '', notes: '' })
      setMostrarFormulario(false)
      toast({
        title: "Éxito",
        description: "Miembro agregado correctamente",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo agregar el miembro",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const eliminarMiembro = async (id: number) => {
    if (!confirm('¿Está seguro de eliminar este miembro?')) return

    try {
      const response = await fetch(`/api/members?id=${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Error deleting member')

      await fetchMiembros()
      toast({
        title: "Éxito",
        description: "Miembro eliminado correctamente",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo eliminar el miembro",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <Link href="/">
        <Button variant="outline" className="mb-8 text-black border-black hover:bg-gray-100">
          <ArrowLeft className="mr-2 h-6 w-6" /> Volver al Inicio
        </Button>
      </Link>
      
      <h1 className="text-4xl font-bold text-center mb-8 text-black">Gestión de Miembros de la Iglesia</h1>
      
      <div className="max-w-4xl mx-auto">
        {!mostrarFormulario ? (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button 
              onClick={() => setMostrarFormulario(true)}
              className="w-full text-xl py-8 mb-8 bg-black text-white hover:bg-gray-800"
            >
              <UserPlus className="mr-2 h-8 w-8" /> Agregar Nuevo Miembro
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="mb-8 border-2 border-black">
              <CardHeader>
                <CardTitle className="text-2xl">Agregar Nuevo Miembro</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <Input
                    placeholder="Nombre"
                    value={nuevoMiembro.name}
                    onChange={(e) => setNuevoMiembro({...nuevoMiembro, name: e.target.value})}
                    className="text-xl p-6 border-2 border-black"
                    disabled={submitting}
                  />
                  <Input
                    placeholder="Edad"
                    type="number"
                    value={nuevoMiembro.age || ''}
                    onChange={(e) => setNuevoMiembro({...nuevoMiembro, age: Number(e.target.value)})}
                    className="text-xl p-6 border-2 border-black"
                    disabled={submitting}
                  />
                  <Input
                    placeholder="Fecha de ingreso"
                    type="date"
                    value={nuevoMiembro.joinDate}
                    onChange={(e) => setNuevoMiembro({...nuevoMiembro, joinDate: e.target.value})}
                    className="text-xl p-6 border-2 border-black"
                    disabled={submitting}
                  />
                  <Select
                    value={nuevoMiembro.ministry}
                    onValueChange={(value) => setNuevoMiembro({...nuevoMiembro, ministry: value})}
                    disabled={submitting}
                  >
                    <SelectTrigger className="text-xl p-6 border-2 border-black">
                      <SelectValue placeholder="Seleccionar ministerio" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Adoración">Adoración</SelectItem>
                      <SelectItem value="Enseñanza">Enseñanza</SelectItem>
                      <SelectItem value="Evangelismo">Evangelismo</SelectItem>
                      <SelectItem value="Servicio">Servicio</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Dirección"
                    value={nuevoMiembro.address}
                    onChange={(e) => setNuevoMiembro({...nuevoMiembro, address: e.target.value})}
                    className="text-xl p-6 border-2 border-black"
                    disabled={submitting}
                  />
                  <Input
                    placeholder="Teléfono"
                    value={nuevoMiembro.phone}
                    onChange={(e) => setNuevoMiembro({...nuevoMiembro, phone: e.target.value})}
                    className="text-xl p-6 border-2 border-black"
                    disabled={submitting}
                  />
                  <Input
                    placeholder="Email"
                    type="email"
                    value={nuevoMiembro.email}
                    onChange={(e) => setNuevoMiembro({...nuevoMiembro, email: e.target.value})}
                    className="text-xl p-6 border-2 border-black"
                    disabled={submitting}
                  />
                  <Textarea
                    placeholder="Notas"
                    value={nuevoMiembro.notes}
                    onChange={(e) => setNuevoMiembro({...nuevoMiembro, notes: e.target.value})}
                    className="text-xl p-6 border-2 border-black"
                    disabled={submitting}
                  />
                  <div className="flex space-x-4">
                    <Button 
                      onClick={agregarMiembro} 
                      className="flex-1 text-xl py-6 bg-black text-white hover:bg-gray-800"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Guardando...
                        </>
                      ) : (
                        'Guardar'
                      )}
                    </Button>
                    <Button 
                      onClick={() => setMostrarFormulario(false)} 
                      variant="outline" 
                      className="flex-1 text-xl py-6 border-2 border-black text-black hover:bg-gray-100"
                      disabled={submitting}
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="border-2 border-black">
            <CardHeader>
              <CardTitle className="flex items-center text-3xl">
                <Users className="mr-2 h-8 w-8" /> Lista de Miembros
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center items-center p-8">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : miembros.length === 0 ? (
                <p className="text-center text-gray-500 p-8">No hay miembros registrados</p>
              ) : (
                miembros.map((miembro) => (
                  <div key={miembro.id} className="bg-gray-100 p-6 rounded-lg shadow-md mb-4 text-xl">
                    <div className="flex justify-between items-start">
                      <h3 className="text-2xl font-bold mb-2">{miembro.name}</h3>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => eliminarMiembro(miembro.id)}
                      >
                        Eliminar
                      </Button>
                    </div>
                    <p><strong>Edad:</strong> {miembro.age} años</p>
                    <p><strong>Fecha de ingreso:</strong> {miembro.joinDate}</p>
                    <p><strong>Ministerio:</strong> {miembro.ministry}</p>
                    <p><strong>Dirección:</strong> {miembro.address}</p>
                    <p><strong>Teléfono:</strong> {miembro.phone}</p>
                    <p><strong>Email:</strong> {miembro.email}</p>
                    <p><strong>Notas:</strong> 

 {miembro.notes}</p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}