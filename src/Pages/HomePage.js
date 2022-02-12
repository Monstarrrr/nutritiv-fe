import React from 'react';
import { useSelector } from 'react-redux';
import Products from '../Components/ProductsTable/ProductsTable';

export default function HomePage() {
  console.log("##### HomePage render #####");
  
  const loggedIn = useSelector(state => state.user.loggedIn)
  
  return (
    <div>
      <h1>Homepage</h1>
      {
        !loggedIn && (
          <div>
            You are not connected
          </div>
        )
      }
      <button>
        Some API call
      </button>
      <Products />
    </div>
  );
}