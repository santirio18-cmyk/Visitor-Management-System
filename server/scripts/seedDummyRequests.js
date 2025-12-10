const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { format, addDays } = require('date-fns');

const dbPath = path.join(__dirname, '../database/vendor_management.db');
const db = new sqlite3.Database(dbPath);

// Dummy visitor requests data
const dummyRequests = [
  {
    visitor_name: 'John Smith',
    visitor_email: 'john.smith@techcorp.com',
    visit_date: format(addDays(new Date(), 3), 'yyyy-MM-dd'),
    purpose: 'Product inspection and quality check',
    company_name: 'TechCorp Solutions',
    contact_number: '+1-555-0101',
    number_of_visitors: 2,
    additional_visitor_names: 'Jane Doe, Mike Johnson',
    coming_from: 'New York, USA',
    visitor_type: 'External',
    status: 'pending'
  },
  {
    visitor_name: 'Sarah Williams',
    visitor_email: 'sarah.w@logisticspro.com',
    visit_date: format(addDays(new Date(), 5), 'yyyy-MM-dd'),
    purpose: 'Warehouse capacity assessment',
    company_name: 'Logistics Pro Inc',
    contact_number: '+1-555-0102',
    number_of_visitors: 1,
    additional_visitor_names: null,
    coming_from: 'Los Angeles, USA',
    visitor_type: 'External',
    status: 'pending'
  },
  {
    visitor_name: 'Robert Chen',
    visitor_email: 'r.chen@internal.com',
    visit_date: format(addDays(new Date(), 4), 'yyyy-MM-dd'),
    purpose: 'Internal audit and compliance review',
    company_name: 'Internal Operations',
    contact_number: '+1-555-0103',
    number_of_visitors: 3,
    additional_visitor_names: 'Lisa Park, David Kim',
    coming_from: 'San Francisco, USA',
    visitor_type: 'Internal',
    status: 'pending'
  },
  {
    visitor_name: 'Emily Davis',
    visitor_email: 'emily.d@supplychain.com',
    visit_date: format(addDays(new Date(), 7), 'yyyy-MM-dd'),
    purpose: 'Supply chain optimization meeting',
    company_name: 'Supply Chain Experts',
    contact_number: '+1-555-0104',
    number_of_visitors: 2,
    additional_visitor_names: 'Tom Wilson',
    coming_from: 'Chicago, USA',
    visitor_type: 'External',
    status: 'approved'
  },
  {
    visitor_name: 'Michael Brown',
    visitor_email: 'm.brown@vendorplus.com',
    visit_date: format(addDays(new Date(), 6), 'yyyy-MM-dd'),
    purpose: 'Vendor onboarding and training',
    company_name: 'Vendor Plus LLC',
    contact_number: '+1-555-0105',
    number_of_visitors: 1,
    additional_visitor_names: null,
    coming_from: 'Houston, USA',
    visitor_type: 'External',
    status: 'rejected'
  },
  {
    visitor_name: 'Jennifer Martinez',
    visitor_email: 'j.martinez@qualityassure.com',
    visit_date: format(addDays(new Date(), 8), 'yyyy-MM-dd'),
    purpose: 'Quality assurance inspection',
    company_name: 'Quality Assurance Group',
    contact_number: '+1-555-0106',
    number_of_visitors: 4,
    additional_visitor_names: 'Alex Taylor, Chris Anderson, Pat Lee',
    coming_from: 'Miami, USA',
    visitor_type: 'External',
    status: 'pending'
  },
  {
    visitor_name: 'James Wilson',
    visitor_email: 'j.wilson@internal.com',
    visit_date: format(addDays(new Date(), 10), 'yyyy-MM-dd'),
    purpose: 'Internal team meeting and facility tour',
    company_name: 'Internal Operations',
    contact_number: '+1-555-0107',
    number_of_visitors: 5,
    additional_visitor_names: 'Rachel Green, Monica Geller, Ross Geller, Chandler Bing',
    coming_from: 'Seattle, USA',
    visitor_type: 'Internal',
    status: 'pending'
  },
  {
    visitor_name: 'Amanda Taylor',
    visitor_email: 'a.taylor@distributors.com',
    visit_date: format(addDays(new Date(), 9), 'yyyy-MM-dd'),
    purpose: 'Distribution agreement discussion',
    company_name: 'Global Distributors',
    contact_number: '+1-555-0108',
    number_of_visitors: 2,
    additional_visitor_names: 'Kevin White',
    coming_from: 'Boston, USA',
    visitor_type: 'External',
    status: 'approved'
  },
  {
    visitor_name: 'Daniel Lee',
    visitor_email: 'd.lee@inventorymgmt.com',
    visit_date: format(addDays(new Date(), 11), 'yyyy-MM-dd'),
    purpose: 'Inventory management system review',
    company_name: 'Inventory Management Solutions',
    contact_number: '+1-555-0109',
    number_of_visitors: 1,
    additional_visitor_names: null,
    coming_from: 'Denver, USA',
    visitor_type: 'External',
    status: 'pending'
  },
  {
    visitor_name: 'Olivia Garcia',
    visitor_email: 'o.garcia@internal.com',
    visit_date: format(addDays(new Date(), 12), 'yyyy-MM-dd'),
    purpose: 'Safety protocol review and training',
    company_name: 'Internal Safety Department',
    contact_number: '+1-555-0110',
    number_of_visitors: 3,
    additional_visitor_names: 'Sophia Brown, Emma Davis',
    coming_from: 'Phoenix, USA',
    visitor_type: 'Internal',
    status: 'approved'
  }
];

// Insert dummy requests
function insertDummyRequests() {
  console.log('Creating 10 dummy visitor requests...\n');

  const insertQuery = `
    INSERT INTO visit_requests 
    (visitor_id, visitor_name, visitor_email, visit_date, purpose, company_name, 
     contact_number, number_of_visitors, additional_visitor_names, coming_from, 
     visitor_type, status, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
  `;

  let completed = 0;
  const total = dummyRequests.length;

  dummyRequests.forEach((request, index) => {
    db.run(
      insertQuery,
      [
        null, // visitor_id (null for public requests)
        request.visitor_name,
        request.visitor_email,
        request.visit_date,
        request.purpose,
        request.company_name,
        request.contact_number,
        request.number_of_visitors,
        request.additional_visitor_names,
        request.coming_from,
        request.visitor_type,
        request.status
      ],
      function(err) {
        if (err) {
          console.error(`Error inserting request ${index + 1}:`, err.message);
        } else {
          completed++;
          console.log(`✓ Created request ${index + 1}: ${request.visitor_name} from ${request.company_name} (Status: ${request.status})`);
        }

        if (completed === total) {
          console.log(`\n✅ Successfully created ${completed} dummy requests!`);
          db.close((err) => {
            if (err) {
              console.error('Error closing database:', err.message);
            } else {
              console.log('Database connection closed.');
              process.exit(0);
            }
          });
        }
      }
    );
  });
}

// Check if database exists and create requests
db.serialize(() => {
  db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='visit_requests'", (err, row) => {
    if (err) {
      console.error('Error checking database:', err.message);
      process.exit(1);
    }
    
    if (!row) {
      console.error('Error: visit_requests table does not exist. Please run the server first to initialize the database.');
      process.exit(1);
    }

    // Check if there are existing requests
    db.get("SELECT COUNT(*) as count FROM visit_requests", (err, row) => {
      if (err) {
        console.error('Error checking existing requests:', err.message);
        process.exit(1);
      }

      if (row.count > 0) {
        console.log(`⚠️  Warning: Database already contains ${row.count} requests.`);
        console.log('Adding 10 more dummy requests...\n');
      }

      insertDummyRequests();
    });
  });
});

