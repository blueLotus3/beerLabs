import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from './Cart.js';


const Nav = () => {
    const { cartItems } = useContext(CartContext);
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0)

    return (
            <header className="header">
            <nav className="navbar">
            <input className="menu-btn" type="checkbox" id="menu-btn" />
            <label className="menu-icon" htmlFor="menu-btn" id="nav"><span className="navicon"></span></label>
            {totalItems > 0 && <span className="cart-badge" id="cart-count">{totalItems}</span>}
                <ul className="menu">
            <Link to ='/'>
                <li className="nav-item"><p className="nav-link">Home</p></li>
                </Link>
            <Link to ='/cart'>
                <li className="nav-item">
    <p className="nav-link">Shopping Cart ({totalItems})</p>
                    </li>
                </Link>
                </ul>
                </nav>
                </header>
    )
}



export default Nav