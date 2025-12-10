const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const path = require('path');

const dbPath = path.join(__dirname, '../database/vendor_management.db');
const db = new sqlite3.Database(dbPath);

// Approver credentials
const approvers = [
  {
    name: 'Jagadeesan Jayseelan',
    email: 'jagadeeshan.jayaseelan@tvs.in',
    password: 'J@ga2024#TVS!Warehouse',
    role: 'warehouse_manager'
  },
  {
    name: 'Varadarajan Krishnamachari',
    email: 'varadarajan.krishnamachari@tvs.in',
    password: 'V@ra2024#TVS!Approver2',
    role: 'second_level_approver'
  }
];

async function createApprovers() {
  console.log('Creating approver accounts...\n');

  for (const approver of approvers) {
    try {
      // Check if user already exists
      db.get('SELECT * FROM users WHERE email = ?', [approver.email], async (err, existingUser) => {
        if (err) {
          console.error(`Error checking user ${approver.email}:`, err.message);
          return;
        }

        if (existingUser) {
          console.log(`⚠️  User ${approver.email} already exists. Updating password...`);
          
          // Update password
          const hashedPassword = await bcrypt.hash(approver.password, 10);
          db.run(
            'UPDATE users SET password = ?, name = ?, role = ? WHERE email = ?',
            [hashedPassword, approver.name, approver.role, approver.email],
            function(updateErr) {
              if (updateErr) {
                console.error(`Error updating user ${approver.email}:`, updateErr.message);
              } else {
                console.log(`✓ Updated: ${approver.name}`);
                console.log(`  Email: ${approver.email}`);
                console.log(`  Role: ${approver.role}`);
                console.log(`  Password: ${approver.password}\n`);
              }
            }
          );
        } else {
          // Create new user
          const hashedPassword = await bcrypt.hash(approver.password, 10);
          db.run(
            'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
            [approver.name, approver.email, hashedPassword, approver.role],
            function(insertErr) {
              if (insertErr) {
                console.error(`Error creating user ${approver.email}:`, insertErr.message);
              } else {
                console.log(`✓ Created: ${approver.name}`);
                console.log(`  Email: ${approver.email}`);
                console.log(`  Role: ${approver.role}`);
                console.log(`  Password: ${approver.password}\n`);
              }
            }
          );
        }
      });
    } catch (error) {
      console.error(`Error processing ${approver.email}:`, error.message);
    }
  }

  // Wait a bit for async operations to complete
  setTimeout(() => {
    console.log('✅ Approver accounts setup complete!\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📋 LOGIN CREDENTIALS:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('1️⃣  FIRST LEVEL APPROVER:');
    console.log('   Name: Jagadeesan Jayseelan');
    console.log('   Email: jagadeeshan.jayaseelan@tvs.in');
    console.log('   Password: J@ga2024#TVS!Warehouse');
    console.log('   Role: Warehouse Manager (First Level)\n');
    console.log('2️⃣  SECOND LEVEL APPROVER:');
    console.log('   Name: Varadarajan Krishnamachari');
    console.log('   Email: varadarajan.krishnamachari@tvs.in');
    console.log('   Password: V@ra2024#TVS!Approver2');
    console.log('   Role: Second Level Approver\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    db.close((err) => {
      if (err) {
        console.error('Error closing database:', err.message);
      } else {
        process.exit(0);
      }
    });
  }, 2000);
}

// Check if database exists
db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='users'", (err, row) => {
  if (err) {
    console.error('Error checking database:', err.message);
    process.exit(1);
  }
  
  if (!row) {
    console.error('Error: users table does not exist. Please run the server first to initialize the database.');
    process.exit(1);
  }

  createApprovers();
});

