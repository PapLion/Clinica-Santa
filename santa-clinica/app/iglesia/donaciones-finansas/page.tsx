'use client'

import React, { useState } from 'react'
import { DollarSign, CreditCard, PieChart, TrendingUp, Plus, FileText, X, Calendar, User, Bell, Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart as RechartsPieChart, Pie, Cell } from 'recharts'

const donationData = [
  { month: 'Ene', amount: 5000 },
  { month: 'Feb', amount: 5500 },
  { month: 'Mar', amount: 4800 },
  { month: 'Abr', amount: 6000 },
  { month: 'May', amount: 5200 },
  { month: 'Jun', amount: 5800 },
]

const expenseData = [
  { category: 'Mantenimiento', value: 2000 },
  { category: 'Servicios', value: 1500 },
  { category: 'Programas', value: 3000 },
  { category: 'Misiones', value: 2500 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

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

function NuevaDonacionModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Nueva Donación</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <form className="space-y-4">
          <div>
            <Label htmlFor="amount">Monto</Label>
            <Input type="number" id="amount" placeholder="Monto de la donación" />
          </div>
          <div>
            <Label htmlFor="date">Fecha</Label>
            <Input type="date" id="date" />
          </div>
          <div>
            <Label htmlFor="donor">Donante</Label>
            <Input id="donor" placeholder="Nombre del donante" />
          </div>
          <div>
            <Label htmlFor="method">Método de Pago</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar método" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Efectivo">Efectivo</SelectItem>
                <SelectItem value="Tarjeta">Tarjeta de Crédito/Débito</SelectItem>
                <SelectItem value="Transferencia">Transferencia Bancaria</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="category">Categoría</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Diezmo">Diezmo</SelectItem>
                <SelectItem value="Ofrenda">Ofrenda</SelectItem>
                <SelectItem value="Misiones">Misiones</SelectItem>
                <SelectItem value="Proyectos Especiales">Proyectos Especiales</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>Cancelar</Button>
            <Button type="submit">Registrar Donación</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function DonacionesFinanzasPage() {
  const [isNuevaDonacionOpen, setIsNuevaDonacionOpen] = useState(false)

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Donaciones y Finanzas</h1>
          <Button onClick={() => setIsNuevaDonacionOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nueva Donación
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Donaciones</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$32,300</div>
              <p className="text-xs text-muted-foreground">+15% respecto al mes anterior</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Donantes Activos</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">145</div>
              <p className="text-xs text-muted-foreground">+5 nuevos este mes</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Gastos del Mes</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$28,500</div>
              <p className="text-xs text-muted-foreground">-3% respecto al mes anterior</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Balance</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$3,800</div>
              <p className="text-xs text-muted-foreground">Superávit este mes</p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="donaciones" className="space-y-4">
          <TabsList>
            <TabsTrigger value="donaciones">Donaciones</TabsTrigger>
            <TabsTrigger value="gastos">Gastos</TabsTrigger>
          </TabsList>
          <TabsContent value="donaciones" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Donaciones por Mes</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={donationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="amount" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="gastos" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Distribución de Gastos</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={expenseData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {expenseData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Últimas Transacciones</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th className="pb-2">Fecha</th>
                  <th className="pb-2">Descripción</th>
                  <th className="pb-2">Monto</th>
                  <th className="pb-2">Tipo</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2">2024-10-01</td>
                  <td>Diezmo - María López</td>
                  <td>$100.00</td>
                  <td>Ingreso</td>
                </tr>
                <tr>
                  <td className="py-2">2024-10-02</td>
                  <td>Pago de servicios</td>
                  <td>$250.00</td>
                  <td>Gasto</td>
                </tr>
                <tr>
                  <td className="py-2">2024-10-03</td>
                  <td>Ofrenda - Juan Pérez</td>
                  <td>$50.00</td>
                  <td>Ingreso</td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      </main>
      
      <NuevaDonacionModal isOpen={isNuevaDonacionOpen} onClose={() => setIsNuevaDonacionOpen(false)} />
    </div>
  )
}