import { NextResponse } from 'next/server'
import { membersDB } from '@/lib/db'

export async function GET() {
  try {
    const members = await membersDB.all('SELECT * FROM Members')
    return NextResponse.json(members)
  } catch (error) {
    console.error('Error fetching members:', error)
    return NextResponse.json({ error: 'Error fetching members' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, age, joinDate, ministry, address, phone, email, notes } = body
    
    const result = await membersDB.run(
      'INSERT INTO Members (name, age, joinDate, ministry, address, phone, email, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [name, age, joinDate, ministry, address, phone, email, notes]
    )
    
    return NextResponse.json({ id: result.lastID })
  } catch (error) {
    console.error('Error creating member:', error)
    return NextResponse.json({ error: 'Error creating member' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }
    
    await membersDB.run('DELETE FROM Members WHERE id = ?', [id])
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting member:', error)
    return NextResponse.json({ error: 'Error deleting member' }, { status: 500 })
  }
}