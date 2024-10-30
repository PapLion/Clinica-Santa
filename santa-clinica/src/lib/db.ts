// src/lib/db.ts
import sqlite3 from 'sqlite3'
import path from 'path'
import fs from 'fs'

// Database paths
const DB_DIR = path.join(process.cwd(), 'src', 'database')
const MEDICATIONS_DB_PATH = path.join(DB_DIR, 'medications.db')
const MEMBERS_DB_PATH = path.join(DB_DIR, 'members.db')

// Ensure database directory exists
if (!fs.existsSync(DB_DIR)) {
  console.log('Creating database directory:', DB_DIR)
  fs.mkdirSync(DB_DIR, { recursive: true })
}

console.log('Database paths:', {
  MEDICATIONS_DB_PATH,
  MEMBERS_DB_PATH
})

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
      } else {
        console.log(`Successfully connected to database: ${dbPath}`)
      }
    })
  }

  async all<T = any>(sql: string, params: any[] = []): Promise<T[]> {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          console.error('Error in all():', err)
          reject(err)
        } else {
          console.log(`Query successful, returned ${rows?.length ?? 0} rows`)
          resolve(rows as T[])
        }
      })
    })
  }

  async get<T = any>(sql: string, params: any[] = []): Promise<T | undefined> {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, row) => {
        if (err) {
          console.error('Error in get():', err)
          reject(err)
        } else {
          console.log('Query successful, returned row:', row)
          resolve(row as T)
        }
      })
    })
  }

  async run(sql: string, params: any[] = []): Promise<RunResult> {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function(err) {
        if (err) {
          console.error('Error in run():', err)
          reject(err)
        } else {
          console.log('Query successful, changes:', this.changes)
          resolve({ lastID: this.lastID, changes: this.changes })
        }
      })
    })
  }

  async exec(sql: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.exec(sql, (err) => {
        if (err) {
          console.error('Error in exec():', err)
          reject(err)
        } else {
          console.log('Exec successful')
          resolve()
        }
      })
    })
  }

  async close(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
        if (err) {
          console.error('Error closing database:', err)
          reject(err)
        } else {
          console.log('Database connection closed')
          resolve()
        }
      })
    })
  }
}

// Create database instances
const medicationsDB = new Database(MEDICATIONS_DB_PATH)
const membersDB = new Database(MEMBERS_DB_PATH)

// Initialize tables
async function initializeTables() {
  console.log('Initializing database tables...')
  try {
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
    console.log('Medications table initialized')

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
    console.log('Members table initialized')

    // Verify tables exist by querying them
    await medicationsDB.get('SELECT 1 FROM Medications LIMIT 1')
    await membersDB.get('SELECT 1 FROM Members LIMIT 1')
    console.log('Tables verified successfully')
  } catch (error) {
    console.error('Error initializing tables:', error)
    throw error
  }
}

// Initialize tables on startup
initializeTables()
  .then(() => console.log('Database initialization complete'))
  .catch(error => {
    console.error('Failed to initialize database:', error)
    process.exit(1)
  })

// Export database instances and types
export { medicationsDB, membersDB, type RunResult }