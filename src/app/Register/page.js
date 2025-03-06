'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [registerUsername, setUsernameRegister] = useState('');
  const [registerPassword, setPasswordRegister] = useState('');
  const router = useRouter();

  const handleRegister = (e) => {
    e.preventDefault();
    // Perform login logic here
    // For demonstration, we'll just redirect to the finance tracker page
    router.push('/FinanceTracker');
  };
  const handlePasswordVerify = (e) => {
    e.preventDefault();
    if(registerPassword.length < 8){
      alert("Password must be at least 8 characters long Please try again")
    }
  };

  const handleGoBack = (e) => {
    e.preventDefault();
    router.push('/Login')
  };
  

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center font-sans">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Register For Free</h1>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={registerUsername}
              onChange={(e) => setUsernameRegister(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={registerPassword}
              onChange={(e) => setPasswordRegister(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
              required
            />
          </div>
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700"> Verify Password</label>
            <input
                type="verifyPassword"
                value={registerPassword}
                onChange={(e) => handlePasswordVerify(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
                required            
            >
            
            </input>
          </div>
        </form>
        <form onSubmit={handleRegister} className="mt-4">
          <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Register
          </button>
        </form>
        <form onSubmit={handleGoBack} className="mt-4">
          {/*w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" */}
          
        <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Back to Login
            </button>
        </form>

      </div>
    </div>
  );
}