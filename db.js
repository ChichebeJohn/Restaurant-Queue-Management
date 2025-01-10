const Database = require('better-sqlite3');

// Connect to the SQLite database
const db = new Database('./restaurant.db');

module.exports = db;
