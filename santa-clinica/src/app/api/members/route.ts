// app/api/members/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getAllMembers, createMember, deleteMember } from '@/lib/db'

export async function GET() {
  console.log('GET /api/members called')
  try {
    console.log('Attempting to fetch members from database...')
    const members = await getAllMembers()
    console.log('Members fetched successfully:', members)
    return NextResponse.json(members)
  } catch (error) {
    console.error('Error fetching members:', error)
    return NextResponse.json(
      { error: 'Error fetching members', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  console.log('POST /api/members called')
  try {
    const body = await request.json()
    console.log('Received body:', body)
    
    const { name, age, joinDate, ministry, address, phone, email, notes } = body
    
    if (!name || !age || !joinDate || !ministry) {
      console.error('Missing required fields')
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    console.log('Attempting to insert member...')
    const result = await createMember({
      name, age, joinDate, ministry, address, phone, email, notes
    })
    
    console.log('Member inserted successfully:', result)
    return NextResponse.json({ id: result.id })
  } catch (error) {
    console.error('Error creating member:', error)
    return NextResponse.json(
      { error: 'Error creating member', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  console.log('DELETE /api/members called')
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  
  if (!id) {
    console.error('Missing ID parameter')
    return NextResponse.json({ error: 'ID is required' }, { status: 400 })
  }
  
  try {
    console.log('Attempting to delete member with ID:', id)
    await deleteMember(Number(id))
    console.log('Member deleted successfully')
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting member:', error)
    return NextResponse.json(
      { error: 'Error deleting member', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}