'use client';

import { useState, useEffect } from 'react';

export default function TrackOrder() {
  const [queue, setQueue] = useState([]);
  const [totalWaitTime, setTotalWaitTime] = useState(0);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    // Retrieve the queue and orders from localStorage
    const storedQueue = JSON.parse(localStorage.getItem('queue')) || [];
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];

    // Normalize and process the orders (ensure proper values for prepTime and quantity)
    const updatedQueue = storedQueue.map(order => ({
      ...order,
      quantity: order.quantity || 1, // Ensure quantity defaults to 1
      prepTime: parseInt(order.prepTime, 10) || 0, // Ensure prepTime defaults to 0 if missing
    }));

    // Insert the user order into the queue
    const userOrder = storedOrders[storedOrders.length - 1]; // Last order is the current user's order
    const userPrepTime = (userOrder ? userOrder.prepTime * userOrder.quantity : 0);

    updatedQueue.push({ ...userOrder, waitTime: userPrepTime });

    // Calculate the user's position (based on FIFO)
    const userPosition = updatedQueue.length - 1;
    setPosition(userPosition);

    // Calculate total wait time for the user by summing the prep times of all orders in front
    let totalTime = 0;
    for (let i = 0; i < userPosition; i++) {
      totalTime += updatedQueue[i].prepTime * updatedQueue[i].quantity; // Account for quantity
    }
    setTotalWaitTime(totalTime);

    // Save the updated queue in localStorage
    localStorage.setItem('queue', JSON.stringify(updatedQueue));
  }, []);

  return (
    <div className="track-order">
      <header className="track-order-heading">
        <h2>Track Order</h2>
      </header>

      <div className="order-tag">
        <h3>Order Placed.</h3>
      </div>

      <div id="queue-status" className="queue-status-container">
        <img src="/clock.svg" className="clock-icon" alt="Clock Icon" />
        <h4 id="estimated-time">Time Left: <strong>{totalWaitTime} MINS</strong></h4>
        <img src="/queue-icon.svg" className="queue-icon" alt="Queue Icon" />
        <h4 id="queue-position">Position in Queue: <strong>{position + 1}</strong></h4>
      </div>

      <div className="order-status">
        <h3>Order Status</h3>
        <p id="order-status-text">Your order is in the queue and is being processed.</p>
      </div>

      <div className="queue-image-container">
        <img src="/Order Placed.png" alt="Order Placed" />
      </div>

      <footer className="footer-nav">
        <button className="footer-btn">
          <a href="/menu" style={{ textDecoration: 'none', color: 'inherit' }}>Menu</a>
        </button>
        <button className="footer-btn">
          <a href="/order" style={{ textDecoration: 'none', color: 'inherit' }}>View Order</a>
        </button>
      </footer>
    </div>
  );
}
