const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const os = require('os');

// Use /tmp on App Engine (writable), or current directory locally
// Check if we're on App Engine by checking for GAE environment
const isAppEngine = process.env.GAE_ENV || process.env.GOOGLE_CLOUD_PROJECT;
const DB_DIR = isAppEngine ? '/tmp' : __dirname;
const DB_PATH = path.join(DB_DIR, 'vendor_management.db');

// Ensure directory exists
try {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
  console.log(`Database will be stored at: ${DB_PATH}`);
} catch (err) {
  console.error(`Error creating DB directory: ${err.message}`);
}

let db;

const init = () => {
  return new Promise((resolve, reject) => {
    db = new sqlite3.Database(DB_PATH, (err) => {
      if (err) {
        reject(err);
        return;
      }
      console.log('Connected to SQLite database');
      createTables().then(resolve).catch(reject);
    });
  });
};

const createTables = async () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Users table
      db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL CHECK(role IN ('visitor', 'warehouse_manager', 'second_level_approver')),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`, (err) => {
        if (err) {
          reject(err);
          return;
        }
      });

      // Visit requests table
      db.run(`CREATE TABLE IF NOT EXISTS visit_requests (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        visitor_id INTEGER,
        visitor_name TEXT,
        visitor_email TEXT,
        visit_date DATE NOT NULL,
        purpose TEXT NOT NULL,
        company_name TEXT,
        contact_number TEXT,
        number_of_visitors INTEGER DEFAULT 1,
        additional_visitor_names TEXT,
        coming_from TEXT,
        visitor_type TEXT,
        status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending', 'approved', 'rejected', 'pending_second_approval')),
        manager_id INTEGER,
        second_level_approver_id INTEGER,
        manager_notes TEXT,
        second_level_notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (visitor_id) REFERENCES users(id),
        FOREIGN KEY (manager_id) REFERENCES users(id),
        FOREIGN KEY (second_level_approver_id) REFERENCES users(id)
      )`, (err) => {
        if (err) {
          reject(err);
          return;
        }
        // Migrate existing table if needed - add new columns if they don't exist
        db.all("PRAGMA table_info(visit_requests)", (err, columns) => {
          if (!err) {
            const columnNames = columns.map(col => col.name);
            if (!columnNames.includes('visitor_name')) {
              db.run(`ALTER TABLE visit_requests ADD COLUMN visitor_name TEXT`, () => {});
            }
            if (!columnNames.includes('visitor_email')) {
              db.run(`ALTER TABLE visit_requests ADD COLUMN visitor_email TEXT`, () => {});
            }
            if (!columnNames.includes('additional_visitor_names')) {
              db.run(`ALTER TABLE visit_requests ADD COLUMN additional_visitor_names TEXT`, () => {});
            }
            if (!columnNames.includes('coming_from')) {
              db.run(`ALTER TABLE visit_requests ADD COLUMN coming_from TEXT`, () => {});
            }
            if (!columnNames.includes('visitor_type')) {
              db.run(`ALTER TABLE visit_requests ADD COLUMN visitor_type TEXT`, () => {});
            }
            if (!columnNames.includes('second_level_approver_id')) {
              db.run(`ALTER TABLE visit_requests ADD COLUMN second_level_approver_id INTEGER`, () => {});
            }
            if (!columnNames.includes('second_level_notes')) {
              db.run(`ALTER TABLE visit_requests ADD COLUMN second_level_notes TEXT`, () => {});
            }
            
            // Check if visitor_id is NOT NULL and needs to be made nullable
            // SQLite doesn't support ALTER COLUMN, so we need to recreate the table
            const visitorIdColumn = columns.find(col => col.name === 'visitor_id');
            if (visitorIdColumn && visitorIdColumn.notnull === 1) {
              console.log('Migrating visit_requests table to make visitor_id nullable...');
              // SQLite doesn't support ALTER COLUMN, so we'll handle NULL values in the application
              // The constraint will be ignored if we pass NULL explicitly
            }
          }
        });
      });

      // Create default warehouse manager and approvers if they don't exist
      createDefaultManager().then(() => {
        return createApprovers();
      }).then(() => {
        resolve();
      }).catch(reject);
    });
  });
};

const createDefaultManager = async () => {
  return new Promise((resolve, reject) => {
    const defaultEmail = 'manager@warehouse.com';
    const defaultPassword = 'manager123';
    
    db.get('SELECT * FROM users WHERE email = ?', [defaultEmail], async (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      
      if (!row) {
        const hashedPassword = await bcrypt.hash(defaultPassword, 10);
        db.run(
          'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
          ['Warehouse Manager', defaultEmail, hashedPassword, 'warehouse_manager'],
          (err) => {
            if (err) {
              reject(err);
              return;
            }
            console.log('Default warehouse manager created: manager@warehouse.com / manager123');
            resolve();
          }
        );
      } else {
        resolve();
      }
    });
  });
};

const getDb = () => db;

const close = () => {
  return new Promise((resolve, reject) => {
    if (db) {
      db.close((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    } else {
      resolve();
    }
  });
};

module.exports = {
  init,
  getDb,
  close
};

