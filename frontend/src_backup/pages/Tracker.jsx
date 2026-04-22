import React, { useState } from 'react';
export default function Tracker(){
  const [water,setWater]=useState(0);
  const [mood,setMood]=useState('😊');
  const [sleep,setSleep]=useState(7);
  return (
    <div className='grid md:grid-cols-3 gap-6'>
      <div className='bg-white p-4 rounded shadow'>
        <h3 className='font-semibold'>Water</h3>
        <p className='text-2xl'>{water} glasses</p>
        <div className='mt-2'>
          <button className='px-3 py-2 bg-indigo-600 text-white rounded' onClick={()=>setWater(w=>w+1)}>+1</button>
          <button className='ml-2 px-3 py-2 border rounded' onClick={()=>setWater(0)}>Reset</button>
        </div>
      </div>
      <div className='bg-white p-4 rounded shadow'>
        <h3 className='font-semibold'>Mood</h3>
        <div className='mt-2 text-3xl'>
          {['😞','😐','😊','😁','🤩'].map(e=>(
            <button key={e} onClick={()=>setMood(e)} className='m-1'>{e}</button>
          ))}
        </div>
        <p className='mt-2'>Current: {mood}</p>
      </div>
      <div className='bg-white p-4 rounded shadow'>
        <h3 className='font-semibold'>Sleep</h3>
        <input type='number' value={sleep} onChange={e=>setSleep(e.target.value)} className='p-2 border rounded w-24' />
        <p className='mt-2'>Hours</p>
      </div>
    </div>
  );
}
