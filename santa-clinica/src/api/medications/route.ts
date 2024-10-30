// app/api/medications/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { medicationsDB } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const medications = await medicationsDB.all('SELECT * FROM Medications')
    return NextResponse.json(medications)
  } catch (error) {
    console.error('Error fetching medications:', error)
    return NextResponse.json({ error: 'Error fetching medications' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, quantity, unit, status } = body
    
    const result = await medicationsDB.run(
      'INSERT INTO Medications (name, quantity, unit, status) VALUES (?, ?, ?, ?)',
      [name, quantity, unit, status]
    )
    
    return NextResponse.json({ id: result.lastID })
  } catch (error) {
    console.error('Error creating medication:', error)
    return NextResponse.json({ error: 'Error creating medication' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  
  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 })
  }
  
  try {
    await medicationsDB.run('DELETE FROM Medications WHERE id = ?', [id])
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting medication:', error)
    return NextResponse.json({ error: 'Error deleting medication' }, { status: 500 })
  }
}