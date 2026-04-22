import React, { useState } from 'react';
import API from '../api/axiosInstance';
export default function Register(){
  const [name,setName]=useState(''); const [email,setEmail]=useState(''); const [password,setPassword]=useState('');
  const submit=async(e)=>{ e.preventDefault(); await API.post('/auth/register',{name,email,password}); alert('Registered'); };
  return (<form onSubmit={submit} className='max-w-md space-y-3'><h2 className='text-xl'>Register</h2><input value={name} onChange={e=>setName(e.target.value)} className='w-full p-2 border rounded' placeholder='Name' /><input value={email} onChange={e=>setEmail(e.target.value)} className='w-full p-2 border rounded' placeholder='Email' /><input type='password' value={password} onChange={e=>setPassword(e.target.value)} className='w-full p-2 border rounded' placeholder='Password' /><button className='px-4 py-2 bg-green-600 text-white rounded'>Register</button></form>);
}
