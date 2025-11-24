import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Beer from './components/Beer.js'
import IndivBeer from './components/IndivBeer.js'
import Nav from './components/Nav.js'
import { CartProvider } from './components/Cart.js'
import CartPage from './pages/CartPage.js'
import './App.css';

function App() {
  return (
    <div className="App">
      <CartProvider>
      <Nav />
      <Routes>
          <Route path='/' element={<Beer/>} />
          <Route path='/IndivBeer/:id' element={<IndivBeer />}/>
          <Route path='/cart' element={<CartPage />} />
      </Routes>
      </CartProvider>
        </div>
  );
}

export default App;
