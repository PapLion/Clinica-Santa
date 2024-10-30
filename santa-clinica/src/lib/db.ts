// src/lib/db.ts
import { sql } from '@vercel/postgres';

// Types
export interface Medication {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  status: string;
}

export interface Member {
  id: number;
  name: string;
  age: number;
  joinDate: string;
  ministry: string;
  address: string;
  phone: string;
  email: string;
  notes: string;
}

// Database functions for Medications
export async function getAllMedications() {
  const { rows } = await sql`SELECT * FROM Medications`;
  return rows;
}

export async function createMedication(medication: Omit<Medication, 'id'>) {
  const { rows } = await sql`
    INSERT INTO Medications (name, quantity, unit, status)
    VALUES (${medication.name}, ${medication.quantity}, ${medication.unit}, ${medication.status})
    RETURNING id
  `;
  return rows[0];
}

export async function deleteMedication(id: number) {
  await sql`DELETE FROM Medications WHERE id = ${id}`;
}

// Database functions for Members
export async function getAllMembers() {
  const { rows } = await sql`SELECT * FROM Members`;
  return rows;
}

export async function createMember(member: Omit<Member, 'id'>) {
  const { rows } = await sql`
    INSERT INTO Members (name, age, joinDate, ministry, address, phone, email, notes)
    VALUES (${member.name}, ${member.age}, ${member.joinDate}, ${member.ministry}, 
            ${member.address}, ${member.phone}, ${member.email}, ${member.notes})
    RETURNING id
  `;
  return rows[0];
}

export async function deleteMember(id: number) {
  await sql`DELETE FROM Members WHERE id = ${id}`;
}

// Initialize tables
export async function initializeTables() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS Medications (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        quantity INTEGER NOT NULL,
        unit VARCHAR(50) NOT NULL,
        status VARCHAR(50) NOT NULL
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS Members (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        age INTEGER,
        joinDate DATE,
        ministry VARCHAR(100),
        address TEXT,
        phone VARCHAR(50),
        email VARCHAR(255),
        notes TEXT
      );
    `;

    console.log('Tables initialized successfully');
  } catch (error) {
    console.error('Error initializing tables:', error);
    throw error;
  }
}