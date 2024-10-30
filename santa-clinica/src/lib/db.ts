import sqlite3 from 'sqlite3'
import path from 'path'

// Database paths
const MEDICATIONS_DB_PATH = path.join(process.cwd(), 'src', 'database', 'medications.db')
const MEMBERS_DB_PATH = path.join(process.cwd(), 'src', 'database', 'members.db')

// Type definitions
type RunResult = {
  lastID: number;
  changes: number;
}

class Database {
  private db: sqlite3.Database;

  constructor(dbPath: string) {
    this.db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Error connecting to database:', err)
      }
    })
  }

  async all<T = any>(sql: string, params: any[] = []): Promise<T[]> {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) reject(err)
        else resolve(rows as T[])
      })
    })
  }

  async get<T = any>(sql: string, params: any[] = []): Promise<T | undefined> {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, row) => {
        if (err) reject(err)
        else resolve(row as T)
      })
    })
  }

  async run(sql: string, params: any[] = []): Promise<RunResult> {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function(err) {
        if (err) reject(err)
        else resolve({ lastID: this.lastID, changes: this.changes })
      })
    })
  }

  async exec(sql: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.exec(sql, (err) => {
        if (err) reject(err)
        else resolve()
      })
    })
  }

  async close(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
        if (err) reject(err)
        else resolve()
      })
    })
  }
}

// Create database instances
const medicationsDB = new Database(MEDICATIONS_DB_PATH)
const membersDB = new Database(MEMBERS_DB_PATH)

// Initialize tables
async function initializeTables() {
  // Create Medications table
  await medicationsDB.exec(`
    CREATE TABLE IF NOT EXISTS Medications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      unit TEXT NOT NULL,
      status TEXT NOT NULL
    )
  `)

  // Create Members table
  await membersDB.exec(`
    CREATE TABLE IF NOT EXISTS Members (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      age INTEGER,
      joinDate TEXT,
      ministry TEXT,
      address TEXT,
      phone TEXT,
      email TEXT,
      notes TEXT
    )
  `)
}

// Initialize tables on startup
initializeTables().catch(console.error)

// Export database instances and types
export { medicationsDB, membersDB, type RunResult }