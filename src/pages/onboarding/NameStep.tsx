import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NameStep: React.FC = () => {
  const navigate = useNavigate();
  const [first, setFirst] = useState('');
  const [middle, setMiddle] = useState('');
  const [last, setLast] = useState('');
  const [suffix, setSuffix] = useState('');
  const [preferred, setPreferred] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { first, middle, last, suffix, preferred };
    localStorage.setItem('onboarding.name', JSON.stringify(payload));
    navigate('/onboarding/dob');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow p-8">
        <div className="h-1 bg-red-200 mb-8">
          <div className="h-1 bg-red-600" style={{ width: '15%' }} />
        </div>
        <h1 className="text-3xl font-serif text-gray-900 mb-2">First, what’s your name?</h1>
        <p className="text-gray-600 mb-6">Your full legal name as listed on your birth certificate, driver’s license, or passport.</p>
        <a className="text-red-600 text-sm font-medium inline-block mb-6" href="#">Learn more</a>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First</label>
              <input value={first} onChange={(e)=>setFirst(e.target.value)} required className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-300 focus:border-red-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Middle (optional)</label>
              <input value={middle} onChange={(e)=>setMiddle(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-300 focus:border-red-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last</label>
              <input value={last} onChange={(e)=>setLast(e.target.value)} required className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-300 focus:border-red-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Jr, Sr, etc. (optional)</label>
              <input value={suffix} onChange={(e)=>setSuffix(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-300 focus:border-red-400" />
            </div>
          </div>
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Preferred name (optional)</label>
            <input value={preferred} onChange={(e)=>setPreferred(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-300 focus:border-red-400" />
          </div>
          <div className="flex justify-between items-center mt-8">
            <button type="button" onClick={()=>history.back()} className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 inline-flex items-center">
              <span className="mr-2">←</span> Back
            </button>
            <button type="submit" className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700">Save & continue</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NameStep;