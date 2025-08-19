import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Beer from './components/Beer.js'
import IndivBeer from './components/IndivBeer.js'
import './App.css';

function App() {

  return (
    <div className="App">
      <Routes>
          <Route path='/' element={<Beer/>} />
          <Route path='/IndivBeer/:id' element={<IndivBeer />}/>
      </Routes>
        </div>
  );
}

export default App;
