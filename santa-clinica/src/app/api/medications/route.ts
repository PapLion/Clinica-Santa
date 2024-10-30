// app/api/medications/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { medicationsDB } from '@/lib/db'

export async function GET(request: NextRequest) {
  console.log('GET /api/medications called')
  try {
    console.log('Attempting to fetch medications from database...')
    const medications = await medicationsDB.all('SELECT * FROM Medications')
    console.log('Medications fetched successfully:', medications)
    return NextResponse.json(medications)
  } catch (error) {
    console.error('Error fetching medications:', error)
    return NextResponse.json(
      { error: 'Error fetching medications', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  console.log('POST /api/medications called')
  try {
    const body = await request.json()
    console.log('Received body:', body)
    
    const { name, quantity, unit, status } = body
    
    if (!name || !quantity || !unit || !status) {
      console.error('Missing required fields')
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    console.log('Attempting to insert medication...')
    const result = await medicationsDB.run(
      'INSERT INTO Medications (name, quantity, unit, status) VALUES (?, ?, ?, ?)',
      [name, quantity, unit, status]
    )
    
    console.log('Medication inserted successfully:', result)
    return NextResponse.json({ id: result.lastID })
  } catch (error) {
    console.error('Error creating medication:', error)
    return NextResponse.json(
      { error: 'Error creating medication', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  console.log('DELETE /api/medications called')
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  
  if (!id) {
    console.error('Missing ID parameter')
    return NextResponse.json({ error: 'ID is required' }, { status: 400 })
  }
  
  try {
    console.log('Attempting to delete medication with ID:', id)
    await medicationsDB.run('DELETE FROM Medications WHERE id = ?', [id])
    console.log('Medication deleted successfully')
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting medication:', error)
    return NextResponse.json(
      { error: 'Error deleting medication', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}