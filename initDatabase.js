const Database = require('better-sqlite3');

// Create or open the SQLite database file
const db = new Database('./restaurant.db');

// Create the `queue` table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS queue (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    order_details TEXT NOT NULL, -- Store the items as JSON
    total_time INTEGER NOT NULL, -- Total preparation time in minutes
    time_remaining INTEGER NOT NULL, -- Remaining time in minutes
    position INTEGER NOT NULL, -- Position in the queue
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);

console.log('Database initialized and `queue` table ready.');
