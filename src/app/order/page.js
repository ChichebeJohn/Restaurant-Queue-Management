'use client';

import { useState, useEffect } from 'react';

export default function OrderSummary() {
  const [orders, setOrders] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    // Retrieve orders from localStorage
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];

    // Normalize and process orders
    const updatedOrders = storedOrders.map((order) => ({
      ...order,
      quantity: order.quantity || 1, // Ensure quantity defaults to 1
      price: typeof order.price === 'string' ? parseFloat(order.price.replace(/[^\d.]/g, '')) : order.price,
      prepTime: parseInt(order.prepTime, 10) || 0, // Default prepTime to 0 if not found
    }));

    setOrders(updatedOrders);
  }, []);

  useEffect(() => {
    const updateTotal = () => {
      let total = 0;
      let totalTime = 0;

      orders.forEach((order) => {
        total += order.price * order.quantity;
        totalTime += order.prepTime * order.quantity;
      });

      setTotalPrice(total);
      setTotalTime(totalTime);
    };

    updateTotal();
  }, [orders]);

  const handleQuantityChange = (order, action) => {
    const updatedOrders = [...orders];
    const orderIndex = updatedOrders.findIndex((o) => o.name === order.name);

    if (orderIndex !== -1) {
      if (action === 'increment') {
        updatedOrders[orderIndex].quantity++;
      } else if (action === 'decrement' && updatedOrders[orderIndex].quantity > 1) {
        updatedOrders[orderIndex].quantity--;
      }

      setOrders(updatedOrders);
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
    }
  };

  const handleClearOrder = () => {
    localStorage.removeItem('orders');
    setOrders([]);
  };

  return (
    <div className="order">
      <header className="order-heading">
        <h2>View Order</h2>
      </header>

      <div id="order-list" className="order-container">
        {orders.length === 0 ? (
          <p>No items in your order yet.</p>
        ) : (
          orders.map((order) => (
            <div className="order-item" key={order.name}>
              <img src={order.imgSrc || '/default-image.png'} alt={order.name || 'Item image'} className="order-item-image" />
              <h3>{order.name}</h3>
              <div className="quantity-container">
                <button
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(order, 'decrement')}
                >
                -
                  
                </button>
                <span className="quantity-display">{order.quantity}</span>
                <button
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(order, 'increment')}
                >
                  +
                </button>
              </div>
              <p>Price: ₦{(order.price * order.quantity).toLocaleString()}</p>
              <p>Prep Time: {order.prepTime * order.quantity} mins</p>
            </div>
          ))
        )}
      </div>

      <div className="order-total">
        <p>Total Price: ₦{totalPrice.toLocaleString()}</p>
        <button id="clear-order-btn" className="clear-order" onClick={handleClearOrder}>
          Clear Order
        </button>
      </div>

      <div className="order-total">
        <p>Total Prep Time: {totalTime} mins</p>
        <button className="join-queue">
          <a href="/trackorder" style={{ textDecoration: 'none', color: 'inherit' }}>
            Place Order To Join Queue
          </a>
        </button>
      </div>

      <footer className="footer-nav">
        <button className="footer-btn">
          <a href="/menu" style={{ textDecoration: 'none', color: 'inherit' }}>
            Menu
          </a>
        </button>
        <button className="footer-btn">
          <a href="/favorites" style={{ textDecoration: 'none', color: 'inherit' }}>
            Favorites
          </a>
        </button>
        <button className="footer-btn">
          <a href="/order" style={{ textDecoration: 'none', color: 'inherit' }}>
            View Order
          </a>
        </button>
      </footer>
    </div>
  );
}
