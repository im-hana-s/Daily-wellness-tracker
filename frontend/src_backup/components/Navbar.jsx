import React from 'react';
import { Link } from 'react-router-dom';
export default function Navbar(){
  return (
    <nav className='bg-white shadow-sm'>
      <div className='max-w-4xl mx-auto p-4 flex items-center gap-4'>
        <Link to='/' className='font-bold text-lg'>Wellness</Link>
        <Link to='/tracker' className='text-sm'>Tracker</Link>
        <Link to='/reports' className='text-sm'>Reports</Link>
        <Link to='/feedback' className='text-sm'>Feedback</Link>
        <div className='ml-auto flex gap-2'>
          <Link to='/login' className='text-sm'>Login</Link>
          <Link to='/register' className='text-sm'>Register</Link>
        </div>
      </div>
    </nav>
  );
}
