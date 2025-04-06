import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/HomePage/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Add your routes here */}
      </Routes>
    </Router>
  );
}

export default App;
