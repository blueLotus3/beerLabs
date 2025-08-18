import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Beer from './components/Beer.js'
import './App.css';

function App() {

  return (
    <div className="App">
      <Routes>
          <Route path='/' element={<Beer/>} />
      </Routes>
        </div>
  );
}

export default App;
