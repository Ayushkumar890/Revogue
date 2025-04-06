<<<<<<< HEAD

function App() {
  return (
    <>
    <div>
      
    </div>
    </>
  )
=======
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
>>>>>>> 40dc30a03cbb568af58d2f871755df24b0a445d8
}

export default App;
