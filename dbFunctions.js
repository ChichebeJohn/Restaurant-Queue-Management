const db = require('./db'); // Import the database connection

/**
 * Add a new order to the queue
 * @param {string} email - User's email address
 * @param {Array} orderDetails - List of ordered items
 * @param {number} totalTime - Total preparation time for the order
 */
function addOrder(email, orderDetails, totalTime) {
  // Calculate the user's position in the queue
  const position = db.prepare('SELECT COUNT(*) AS count FROM queue').get().count + 1;

  const stmt = db.prepare(`
    INSERT INTO queue (email, order_details, total_time, time_remaining, position)
    VALUES (?, ?, ?, ?, ?)
  `);

  stmt.run(email, JSON.stringify(orderDetails), totalTime, totalTime, position);
}

module.exports = { addOrder };
