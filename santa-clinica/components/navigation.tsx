import Link from 'next/link'

export function Navigation() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">
        <li><Link href="/centro-medico/citas">Citas</Link></li>
        <li><Link href="/centro-medico/pacientes">Pacientes</Link></li>
        <li><Link href="/centro-medico/inventario">Inventario</Link></li>
        <li><Link href="/centro-medico/notificaciones">Notificaciones</Link></li>
        <li><Link href="/centro-medico/reportes">Reportes</Link></li>
        <li><Link href="/iglesia/miembros">Miembros</Link></li>
        <li><Link href="/iglesia/eventos">Eventos</Link></li>
        <li><Link href="/iglesia/donaciones-finanzas">Donaciones</Link></li>
        <li><Link href="/iglesia/ministerios">Ministerios</Link></li>
        <li><Link href="/iglesia/recursos">Recursos</Link></li>
      </ul>
    </nav>
  )
}