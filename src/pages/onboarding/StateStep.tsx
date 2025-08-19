import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const states = [
  'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'
];

const StateStep: React.FC = () => {
  const navigate = useNavigate();
  const [state, setState] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!state) return;
    localStorage.setItem('onboarding.state', state);
    navigate('/')
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow p-8">
        <div className="h-1 bg-red-200 mb-8">
          <div className="h-1 bg-red-600" style={{ width: '45%' }} />
        </div>
        <h1 className="text-3xl font-serif text-gray-900 mb-2">What state do you live in?</h1>
        <p className="text-gray-600 mb-6">Documents are state-specific, so choose the state where you’re a current resident (US only).</p>
        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
          <div className="relative">
            <select value={state} onChange={(e)=>setState(e.target.value)} className="w-full appearance-none border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-300 focus:border-red-400">
              <option value="">Select a state</option>
              {states.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">▾</span>
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

export default StateStep;