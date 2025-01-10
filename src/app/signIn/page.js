'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Correct import for App Router

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const router = useRouter(); // Using next/navigation

  const handleViewMenuClick = (e) => {
    e.preventDefault();

    if (!email) {
      setError('Please enter a valid email address.');
      return;
    }

    // Pass the email to the next page using query params
    router.push(`/menu?email=${encodeURIComponent(email)}`);
  };

  return (
    <div className="signin">
      <div className="wrapper">
        <div className="left-border"></div>
        <div className="content">
          <p>To continue, please input a valid email address.</p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="email-form"
          >
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(''); // Clear error when typing
              }}
              required
            />
            {error && <p className="error">{error}</p>}
          </form>

          <div className="image-container">
            <Image src="/menu.png" alt="Menu" width={500} height={500} />
          </div>
        </div>
        <div className="right-border"></div>
      </div>

      <button
        className="view-menu-btn"
        onClick={handleViewMenuClick}
      >
        View Menu
      </button>
    </div>
  );
}
