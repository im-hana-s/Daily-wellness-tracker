import React, { useState } from 'react';
import API from '../api/axiosInstance';
export default function Feedback(){
  const [name,setName]=useState(''); const [email,setEmail]=useState(''); const [msg,setMsg]=useState('');
  const submit = async (e)=>{ e.preventDefault(); await API.post('/feedback', { name, email, message: msg }); alert('Thanks!'); setName(''); setEmail(''); setMsg(''); };
  return (
    <form onSubmit={submit} className='max-w-lg space-y-3'>
      <h2 className='text-xl font-semibold'>Feedback</h2>
      <input value={name} onChange={e=>setName(e.target.value)} className='w-full p-2 border rounded' placeholder='Name' />
      <input value={email} onChange={e=>setEmail(e.target.value)} className='w-full p-2 border rounded' placeholder='Email' />
      <textarea value={msg} onChange={e=>setMsg(e.target.value)} className='w-full p-2 border rounded' placeholder='Message' />
      <button className='px-4 py-2 bg-indigo-600 text-white rounded'>Send</button>
    </form>
  );
}
