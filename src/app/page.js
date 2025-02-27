'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    e.preventDefault();
    // Perform login logic here
    // For demonstration, we'll just redirect to the finance tracker page
    router.push('/FinanceTracker');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6 md:px-12">
      <nav className="w-full flex justify-between items-center py-4">
        <h1 className="text-3xl font-bold text-indigo-600"></h1>
      </nav>
      
      <div className="flex flex-col-reverse md:flex-row items-center justify-between w-full max-w-6xl mt-12">
        {/* Left Side */}
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            FinTrack AI: <br /> AI-Powered Finance Tracker
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
            Join thousands of professionals who apply AI to optimize their job applications.
            Use our AI-powered resume builder and more to create tailored resumes and cover
            letters for specific jobs.
          </p>
          <form onSubmit={handleChange}>
          <button className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700">
            Get Started for Free
          </button>


          </form>
        </div>
        
        {/* Right Side - Mockup Image */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src="/FinanceImage.jpg"
            alt="App Preview"
            className="w-full md:w-4/5 rounded-lg shadow-lg border border-gray-200"
          />
        </div>
      </div>
    </div>
  );
}