import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BirthdayStep: React.FC = () => {
  const navigate = useNavigate();
  const [dob, setDob] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('onboarding.name');
      if (stored) {
        const parsed = JSON.parse(stored);
        const full = [parsed.first, parsed.last].filter(Boolean).join(' ');
        setName(full);
      }
    } catch {}
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dob) return;
    localStorage.setItem('onboarding.dob', dob);
    navigate('/onboarding/state');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow p-8">
        <div className="h-1 bg-red-200 mb-8">
          <div className="h-1 bg-red-600" style={{ width: '30%' }} />
        </div>
        <h1 className="text-3xl font-serif text-gray-900 mb-6">Hi {name || 'there'}, nice to meet you. When is your birthday?</h1>
        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date of birth</label>
          <input
            type="date"
            value={dob}
            onChange={(e)=>setDob(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-300 focus:border-red-400"
            placeholder="mm/dd/yyyy"
            required
          />
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

export default BirthdayStep;