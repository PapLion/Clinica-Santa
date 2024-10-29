'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Pill, PlusCircle, ArrowLeft, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  status: string;
}

export default function ClinicaPage() {
  const [medicamentos, setMedicamentos] = useState<InventoryItem[]>([
    { id: 1, name: 'Paracetamol', quantity: 100, unit: 'tabletas', status: 'En stock' },
    { id: 2, name: 'Ibuprofeno', quantity: 50, unit: 'tabletas', status: 'Bajo stock' },
  ])
  const [nuevoMedicamento, setNuevoMedicamento] = useState({ name: '', quantity: '', unit: '', status: '' })
  const [mostrarFormulario, setMostrarFormulario] = useState(false)

  const agregarMedicamento = () => {
    if (nuevoMedicamento.name && nuevoMedicamento.quantity && nuevoMedicamento.unit && nuevoMedicamento.status) {
      setMedicamentos([...medicamentos, { 
        id: medicamentos.length + 1, 
        name: nuevoMedicamento.name, 
        quantity: parseInt(nuevoMedicamento.quantity), 
        unit: nuevoMedicamento.unit,
        status: nuevoMedicamento.status
      }])
      setNuevoMedicamento({ name: '', quantity: '', unit: '', status: '' })
      setMostrarFormulario(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'En stock':
        return <CheckCircle className="h-6 w-6 text-green-500" />
      case 'Bajo stock':
        return <AlertCircle className="h-6 w-6 text-yellow-500" />
      case 'Sin stock':
        return <XCircle className="h-6 w-6 text-red-500" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <Link href="/">
        <Button variant="outline" className="mb-8 text-black border-black hover:bg-gray-100">
          <ArrowLeft className="mr-2 h-6 w-6" /> Volver al Inicio
        </Button>
      </Link>
      
      <h1 className="text-4xl font-bold text-center mb-8 text-black">Gestión de Inventario de Medicamentos</h1>
      
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
              <PlusCircle className="mr-2 h-8 w-8" /> Agregar Nuevo Medicamento
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
                <CardTitle className="text-2xl">Agregar Nuevo Medicamento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <Input
                    placeholder="Nombre del medicamento"
                    value={nuevoMedicamento.name}
                    onChange={(e) => setNuevoMedicamento({...nuevoMedicamento, name: e.target.value})}
                    className="text-xl p-6 border-2 border-black"
                  />
                  <Input
                    placeholder="Cantidad"
                    type="number"
                    value={nuevoMedicamento.quantity}
                    onChange={(e) => setNuevoMedicamento({...nuevoMedicamento, quantity: e.target.value})}
                    className="text-xl p-6 border-2 border-black"
                  />
                  <Input
                    placeholder="Unidad (ej: tabletas, ml)"
                    value={nuevoMedicamento.unit}
                    onChange={(e) => setNuevoMedicamento({...nuevoMedicamento, unit: e.target.value})}
                    className="text-xl p-6 border-2 border-black"
                  />
                  <Select
                    value={nuevoMedicamento.status}
                    onValueChange={(value) => setNuevoMedicamento({...nuevoMedicamento, status: value})}
                  >
                    <SelectTrigger className="text-xl p-6 border-2 border-black">
                      <SelectValue placeholder="Seleccionar estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="En stock">En stock</SelectItem>
                      <SelectItem value="Bajo stock">Bajo stock</SelectItem>
                      <SelectItem value="Sin stock">Sin stock</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex space-x-4">
                    <Button onClick={agregarMedicamento} className="flex-1 text-xl py-6 bg-black text-white hover:bg-gray-800">Guardar</Button>
                    <Button onClick={() => setMostrarFormulario(false)} variant="outline" className="flex-1 text-xl py-6 border-2 border-black text-black hover:bg-gray-100">Cancelar</Button>
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
                <Pill className="mr-2 h-8 w-8" /> Inventario de Medicamentos
              </CardTitle>
            </CardHeader>
            <CardContent>
              {medicamentos.map((medicamento) => (
                <div key={medicamento.id} className="bg-gray-100 p-6 rounded-lg shadow-md mb-4 text-xl">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-2xl">{medicamento.name}</h3>
                    <div className="flex items-center">
                      {getStatusIcon(medicamento.status)}
                      <span className="ml-2">{medicamento.status}</span>
                    </div>
                  </div>
                  <p><strong>Cantidad:</strong> {medicamento.quantity} {medicamento.unit}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}