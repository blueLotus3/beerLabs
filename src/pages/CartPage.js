import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import { CartContext } from '../components/Cart.js';

const CartPage = () => {
  const {cartItems, removeFromCart, updateQuantity} = useContext(CartContext);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);



  /* Variables for calculating shipping cost */
  const itemsPrice = cartItems.reduce((a, c) => a + c.gearPrice * (c.quantity || 1),0);
  const taxPrice = itemsPrice * 0.14;
  const roundedTax = Math.round(taxPrice * 100) / 100;
  const totalPrice = itemsPrice + taxPrice;
  const roundedTotal = Math.round(totalPrice * 100) / 100;

  return (
    <aside className="block col-1">
      <Link to='/cart'>
  <h2>Cart Items: {totalItems}</h2>
    <div>
        {cartItems.length === 0 && <div>Cart is Empty</div>}
    </div>
    {cartItems.map((item) => (
        <div key={item.id} className="row">
            <div className="col-2">{item.name}</div>
            <img src={item.image || "https://res.cloudinary.com/ds7w3ysag/image/upload/v1755718610/bottle_prjaf2.jpg" }
                 alt={item.name}
                 onError={(e) => {
                     e.target.onError = null;
                     e.target.src = "https://res.cloudinary.com/ds7w3ysag/image/upload/v1755718610/bottle_prjaf2.jpg";
                 }} 
                 />
            <div className="col-2">
            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="add">+</button>    
            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="remove">-</button>
            <button onClick={() => removeFromCart(item.id)} className="deletebtn">Remove</button>
            </div>
            <div className="col-2 text-right">
                {item.quantity} x ${item.gearPrice}
            </div>
        </div>
    ))}
    {cartItems.length !== 0 && (
        <>
        <hr></hr>
        <div className="row">
            <div className="col-2">Items Price</div>
            <div className="col-1 text-right">${itemsPrice}</div>
        </div>
        <div className="row">
            <div className="col-2">Tax Price</div>
            <div className="col-1 text-right">${roundedTax}</div>
        </div>
        <div className="row">
            <div className="col-2"><strong>Total Price</strong></div>
            <div className="col-1 text-right">${roundedTotal}</div>
        </div>
        <hr/>
        <div className="row">
            <button onClick={() => alert('Implement Checkout')} className="checkout">
                Checkout
            </button>
        </div>
        </>
    )}
    </Link>
</aside>
)
}

export default CartPage;