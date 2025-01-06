'use client';

import { useEffect, useState } from 'react';
// import styles from '../../globals.css';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [orderFeedback, setOrderFeedback] = useState(false);

  useEffect(() => {
    // Retrieve favorites from localStorage
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleRemoveFavorite = (index) => {
    const updatedFavorites = [...favorites];
    updatedFavorites.splice(index, 1);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const handleAddToOrder = (item) => {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push({ ...item, quantity: 1 });
    localStorage.setItem('orders', JSON.stringify(orders));

    // Show feedback for 2 seconds
    setOrderFeedback(true);
    setTimeout(() => setOrderFeedback(false), 2000);
  };

  return (
    <div className="favorites">
      <header className="menu-heading">
        <h2>Favorites</h2>
      </header>

      <div className="favorite-items-container">
        {favorites.length === 0 ? (
          <p>No favorite items yet!</p>
        ) : (
          favorites.map((item, index) => (
            <div className="favorite-item" key={index}>
              <div className="grid-item">
                <img src={item.imgSrc} alt={item.name} />
                <h3>{item.name}</h3>
                <p>{item.price}</p>
                <div className="container-button">
                  <button
                    className="order-button"
                    onClick={() => handleAddToOrder(item)}
                  >
                    Order
                  </button>
                  <button
                    className="remove-favorite-button"
                    onClick={() => handleRemoveFavorite(index)}
                  >
                    Remove from Favorites
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {orderFeedback && (
        <div id="order-feedback" className="feedback-message">
          Item added to order successfully!
        </div>
      )}

      <footer className="footer-nava">
        <button className="footer-btna">
          <a href="/menu" style={{textDecoration:'none', color:'inherit'}}>Menu</a>
        </button>
        <button className="footer-btna">
          <a href="/favorites" style={{textDecoration:'none', color:'inherit'}}>Favorites</a>
        </button>
        <button className="footer-btna">
          <a href="/order" style={{textDecoration:'none', color:'inherit'}}>View Order</a>
        </button>
      </footer>
    </div>
  );
}
