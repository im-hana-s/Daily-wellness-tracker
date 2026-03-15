import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Tracker from './pages/Tracker';
import Reports from './pages/Reports';
import Feedback from './pages/Feedback';
import About from './pages/About';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App(){
  return (
    <div>
      <Navbar />
      <div className='max-w-4xl mx-auto p-6'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/tracker' element={<Tracker />} />
          <Route path='/reports' element={<Reports />} />
          <Route path='/feedback' element={<Feedback />} />
          <Route path='/about' element={<About />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </div>
    </div>
  );
}
