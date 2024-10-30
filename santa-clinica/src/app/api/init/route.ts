// app/api/init/route.ts
import { NextResponse } from 'next/server'
import { initializeTables } from '@/lib/db'

export async function GET() {
  try {
    await initializeTables()
    return NextResponse.json({ success: true, message: 'Tables initialized successfully' })
  } catch (error) {
    console.error('Failed to initialize tables:', error)
    return NextResponse.json(
      { error: 'Failed to initialize tables', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}