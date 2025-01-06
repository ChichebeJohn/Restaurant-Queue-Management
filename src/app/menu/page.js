"use client"
import { useState, useEffect, useRef } from 'react';

export default function Menu() {
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState([]);
  const [orderFeedback, setOrderFeedback] = useState(false);
  const searchInputRef = useRef(null); // Create a ref for the search input

  useEffect(() => {
    // Retrieve favorites and orders from localStorage
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setFavorites(storedFavorites);
    setOrders(storedOrders);
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleFavoriteClick = (item) => {
    const updatedFavorites = [...favorites];
    const index = updatedFavorites.findIndex(fav => fav.name === item.name);

    if (index === -1) {
      updatedFavorites.push(item);
    } else {
      updatedFavorites.splice(index, 1);
    }

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const handleAddToOrder = (item) => {
    // Check if the item is already in the orders list
    const isItemInOrder = orders.some(order => order.name === item.name);

    if (!isItemInOrder) {
      const updatedOrders = [...orders, item];
      setOrders(updatedOrders);
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
      setOrderFeedback(true);

      // Hide feedback after 2 seconds
      setTimeout(() => setOrderFeedback(false), 2000);
    } else {
      setOrderFeedback(false); // No feedback if item is already in the order
    }
  };

  const menuItems = [
    { name: 'Cheeseburger', price: '₦ 6,000', prepTime: 2, imgSrc: '/burger b.png' },
    { name: 'Beef Shawarma', price: '₦ 3,500', prepTime: 3, imgSrc: '/shawarma.png' },
    { name: 'Margherita Pizza', price: '₦ 24,000', prepTime: 4, imgSrc: '/pizza.png' },
    { name: 'Spicy Cajun Fries', price: '₦ 8,000', prepTime: 10, imgSrc: '/fries.png' },
  ];

  const handleSearchButtonClick = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus(); // Focus on the search input when the search button is clicked
    }
  };

  return (
    <div className="menu">
      <header className="menu-heading">
        <h2>MENU</h2>
      </header>

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          id="search-input"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearch}
          ref={searchInputRef} // Attach the ref to the input
        />
        <button id="search-btn" onClick={handleSearchButtonClick}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path d="M10 2a8 8 0 0 1 5.93 13.39l5.33 5.34-1.41 1.41-5.34-5.33A8 8 0 1 1 10 2zm0 2a6 6 0 1 0 0 12 6 6 0 0 0 0-12z" />
          </svg>
        </button>
      </div>

      <p className="favorite-message">{orderFeedback ? 'Item added to order successfully!' : ''}</p>

      {/* Menu Items Grid */}
      <div className="grid-container">
        {menuItems.filter(item => item.name.toLowerCase().includes(searchQuery)).map((item) => (
          <div className="grid-item" key={item.name}>
            <div className="favorite-icon" onClick={() => handleFavoriteClick(item)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className={favorites.some(fav => fav.name === item.name) ? 'heart-icon active' : 'heart-icon'}
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6.5 3.5 5 5.5 5c1.54 0 3.04.99 3.57 2.36h.86C9.46 5.99 10.96 5 12.5 5c2 0 3.5 1.5 3.5 3.5 0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
            <img src={item.imgSrc} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.price}</p>
            <button className="add-to-order" onClick={() => handleAddToOrder(item)}>
              Add to Order
            </button>
          </div>
        ))}
      </div>

      {/* Footer Navigation */}
      <footer className="footer-nav">
        <button className="footer-btn">
          <a href="/menu" style={{textDecoration:'none', color:'inherit'}}>Menu</a>
        </button>
        <button className="footer-btn">
          <a href="/favorites" style={{textDecoration:'none', color:'inherit'}}>Favorites</a>
        </button>
        <button className="footer-btn">
          <a href="/order" style={{textDecoration:'none', color:'inherit'}}>View Order</a>
        </button>
      </footer>
    </div>
  );
}
