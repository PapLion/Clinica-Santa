import React from 'react'
import { motion } from 'framer-motion'
import { Users, Calendar, Heart, BookOpen, DollarSign, Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const FeatureButton: React.FC<{ icon: React.ReactNode; title: string }> = ({ icon, title }) => (
  <Button variant="outline" className="w-full justify-start space-x-2 h-auto py-4 px-4 bg-white hover:bg-gray-50">
    {icon}
    <span>{title}</span>
  </Button>
)

export default function IglesiaHomeRedesigned() {
  return (
    <div className="min-h-screen bg-[url('/church-background.jpg')] bg-cover bg-center">
      <div className="min-h-screen bg-white/90 backdrop-blur-sm">
        <header className="bg-white/80 shadow-sm backdrop-blur-md sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">Iglesia Monte Moriah</h1>
            <nav className="flex items-center space-x-4">
              <Button variant="ghost">
                <Menu className="h-5 w-5 mr-2" />
                Menú
              </Button>
              <Button variant="ghost">Cerrar Sesión</Button>
            </nav>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h2 className="text-4xl font-light text-gray-900 mb-4">Bienvenido, Pastor García</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              "Porque donde están dos o tres congregados en mi nombre, allí estoy yo en medio de ellos." - Mateo 18:20
            </p>
          </motion.section>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4"
            >
              <FeatureButton 
                icon={<Users className="h-5 w-5 text-blue-600" />}
                title="Registro de Miembros"
              />
              <FeatureButton 
                icon={<Calendar className="h-5 w-5 text-green-600" />}
                title="Eventos y Servicios"
              />
              <FeatureButton 
                icon={<Heart className="h-5 w-5 text-red-600" />}
                title="Ministerios"
              />
              <FeatureButton 
                icon={<BookOpen className="h-5 w-5 text-yellow-600" />}
                title="Recursos Espirituales"
              />
              <FeatureButton 
                icon={<DollarSign className="h-5 w-5 text-purple-600" />}
                title="Donaciones y Finanzas"
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="md:col-span-2"
            >
              <Card className="bg-white/70 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-medium text-gray-900 mb-4">Próximos Eventos</h3>
                  <ul className="space-y-4">
                    {[
                      { event: "Servicio Dominical", date: "Domingo", time: "10:00 AM" },
                      { event: "Estudio Bíblico", date: "Miércoles", time: "7:00 PM" },
                      { event: "Reunión de Jóvenes", date: "Viernes", time: "6:30 PM" },
                      { event: "Desayuno de Hombres", date: "Sábado", time: "8:00 AM" }
                    ].map((item, index) => (
                      <li key={index} className="flex justify-between items-center border-b border-gray-200 pb-2">
                        <span className="font-medium">{item.event}</span>
                        <span className="text-sm text-gray-600">{item.date} - {item.time}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 text-center"
          >
            <h3 className="text-2xl font-medium text-gray-900 mb-4">Versículo del Día</h3>
            <blockquote className="italic text-gray-700">
              "El Señor es mi pastor, nada me falta; en verdes pastos me hace descansar."
            </blockquote>
            <p className="text-sm text-gray-600 mt-2">- Salmos 23:1-2</p>
          </motion.section>
        </main>
      </div>
    </div>
  )
}