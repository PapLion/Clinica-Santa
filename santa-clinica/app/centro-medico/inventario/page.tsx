'use client'

import React, { useState } from 'react'
import { Search, Package, AlertTriangle, Plus, Edit, X, User, Bell, Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  status: string;
}

const inventory: InventoryItem[] = [
  { id: 1, name: "Paracetamol 500mg", quantity: 500, unit: "tabletas", status: "Normal" },
  { id: 2, name: "Jeringuillas 5ml", quantity: 100, unit: "unidades", status: "Bajo" },
  { id: 3, name: "Vendas elásticas", quantity: 50, unit: "rollos", status: "Normal" },
  { id: 4, name: "Alcohol 70%", quantity: 10, unit: "litros", status: "Crítico" },
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

function NuevoItemModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Nuevo Item de Inventario</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <form className="space-y-4">
          <div>
            <Label htmlFor="name">Nombre del Item</Label>
            <Input id="name" placeholder="Nombre del item" />
          </div>
          <div>
            <Label htmlFor="quantity">Cantidad</Label>
            <Input type="number" id="quantity" placeholder="Cantidad" />
          </div>
          <div>
            <Label htmlFor="unit">Unidad de Medida</Label>
            <Input id="unit" placeholder="Ej: tabletas, litros, unidades" />
          </div>
          <div>
            <Label htmlFor="status">Estado</Label>
            <Select defaultValue="Normal">
              <SelectTrigger id="status">
                <SelectValue placeholder="Seleccionar estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Normal">Normal</SelectItem>
                <SelectItem value="Bajo">Bajo</SelectItem>
                <SelectItem value="Crítico">Crítico</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>Cancelar</Button>
            <Button type="submit">Guardar Item</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

function EditarItemModal({ isOpen, onClose, item }: { isOpen: boolean; onClose: () => void; item: InventoryItem | null }) {
  if (!isOpen || !item) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Editar Item de Inventario</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <form className="space-y-4">
          <div>
            <Label htmlFor="name">Nombre del Item</Label>
            <Input id="name" defaultValue={item.name} />
          </div>
          <div>
            <Label htmlFor="quantity">Cantidad</Label>
            <Input type="number" id="quantity" defaultValue={item.quantity} />
          </div>
          <div>
            <Label htmlFor="unit">Unidad de Medida</Label>
            <Input id="unit" defaultValue={item.unit} />
          </div>
          <div>
            <Label htmlFor="status">Estado</Label>
            <Select defaultValue={item.status}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Normal">Normal</SelectItem>
                <SelectItem value="Bajo">Bajo</SelectItem>
                <SelectItem value="Crítico">Crítico</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>Cancelar</Button>
            <Button type="submit">Guardar Cambios</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function InventarioPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isNuevoItemOpen, setIsNuevoItemOpen] = useState(false)
  const [isEditarItemOpen, setIsEditarItemOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null)

  const handleOpenEditarItem = (item: InventoryItem) => {
    setSelectedItem(item)
    setIsEditarItemOpen(true)
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Gestión de Inventario</h1>

        <div className="flex justify-between items-center mb-6">
          <div className="relative w-64">
            <Input
              type="text"
              placeholder="Buscar item..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          <Button onClick={() => setIsNuevoItemOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Item
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Inventario</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Cantidad</TableHead>
                  <TableHead>Unidad</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.unit}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold
                        ${item.status === 'Normal' ? 'bg-green-100 text-green-800' :
                          item.status === 'Bajo' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'}`}>
                        {item.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={() => handleOpenEditarItem(item)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-green-600">Stock Normal</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">2</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-yellow-600">Stock Bajo</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">1</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-red-600">Stock Crítico</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">1</p>
            </CardContent>
          </Card>
        </div>
      </main>

      <NuevoItemModal isOpen={isNuevoItemOpen} onClose={() => setIsNuevoItemOpen(false)} />
      <EditarItemModal
        isOpen={isEditarItemOpen}
        onClose={() => setIsEditarItemOpen(false)}
        item={selectedItem}
      />
    </div>
  )
}