import React from 'react';

import Link from 'next/link';
import {AiOutlineShopping} from 'react-icons/ai';

import { Cart } from './';
import {useStateContext} from '../context/StateContext';

// renders the logo header and cart component
const Navbar = () => {
  // getting the show cart state to determine if the cart is currently open
  const { showCart, setShowCart, totalQuantities} = useStateContext();
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">FINE Headphones</Link>
      </p>
      {/* change the cart state to True for open when the cart is clicked */}
      <button type="button" className="cart-icon" onClick={() => setShowCart(true)}>
        <AiOutlineShopping/>
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>
      {/* only display cart if state is true */}
      {showCart && <Cart />}
    </div>
  )
}

export default Navbar