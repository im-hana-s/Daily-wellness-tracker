import React, { useState } from "react";

export default function Tracker(){
  const [water, setWater] = useState(3);
  const [mood, setMood] = useState("😊");
  const [sleep, setSleep] = useState(7);

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="card">
        <h3 className="font-semibold">Water</h3>
        <p className="text-2xl font-bold mt-2">{water} glasses</p>
        <div className="mt-3">
          <button onClick={()=>setWater(w=>Math.min(12,w+1))} className="btn-pink mr-2">+1</button>
          <button onClick={()=>setWater(0)} className="px-3 py-2 border rounded">Reset</button>
        </div>
      </div>

      <div className="card">
        <h3 className="font-semibold">Mood</h3>
        <div className="mt-3 text-3xl">
          {['😞','😐','😊','😁','😴'].map(e=>(
            <button key={e} onClick={()=>setMood(e)} className={`p-2 ${mood===e ? 'bg-pink-50 rounded-lg' : ''}`}>{e}</button>
          ))}
        </div>
      </div>

      <div className="card">
        <h3 className="font-semibold">Sleep</h3>
        <div className="mt-3">
          <input type="number" value={sleep} onChange={e=>setSleep(e.target.value)} className="p-2 border rounded w-24" />
          <p className="text-sm text-gray-500 mt-2">Hours</p>
        </div>
      </div>
    </div>
  );
}
