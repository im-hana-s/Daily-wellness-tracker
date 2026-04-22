import React, { useState } from 'react';
import API from '../api/axiosInstance';
export default function Login(){
  const [email,setEmail]=useState(''); const [password,setPassword]=useState('');
  const submit=async(e)=>{ e.preventDefault(); const r=await API.post('/auth/login',{email,password}); alert('Logged in'); console.log(r.data); };
  return (<form onSubmit={submit} className='max-w-md space-y-3'><h2 className='text-xl'>Login</h2><input value={email} onChange={e=>setEmail(e.target.value)} className='w-full p-2 border rounded' placeholder='Email' /><input type='password' value={password} onChange={e=>setPassword(e.target.value)} className='w-full p-2 border rounded' placeholder='Password' /><button className='px-4 py-2 bg-indigo-600 text-white rounded'>Login</button></form>);
}
