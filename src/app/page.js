'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/FinanceTracker');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-20 w-full flex justify-between items-center py-6 px-6 md:px-12">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">F</span>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            FinTrack AI
          </h1>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-slate-300 hover:text-white transition-colors duration-300">Features</a>
          <a href="#pricing" className="text-slate-300 hover:text-white transition-colors duration-300">Pricing</a>
          <a href="#about" className="text-slate-300 hover:text-white transition-colors duration-300">About</a>
        </div>
      </nav>
      
      {/* Main Content */}
      <div className="relative z-10 flex flex-col-reverse md:flex-row items-center justify-between w-full max-w-7xl mx-auto px-6 md:px-12 mt-12 md:mt-20">
        
        {/* Left Side - Content */}
        <div className="md:w-1/2 text-center md:text-left space-y-8">
          <div className="space-y-6">
            <h2 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                FinTrack AI
              </span>
              <br />
              <span className="text-3xl md:text-4xl text-slate-300 font-normal">
                AI-Powered Finance Tracker
              </span>
            </h2>
            
            <p className="text-slate-400 text-xl md:text-2xl leading-relaxed max-w-2xl">
              Transform your financial future with intelligent insights. 
              Track expenses, analyze patterns, and make smarter decisions 
              with cutting-edge AI technology.
            </p>
          </div>
          
          {/* CTA Section */}
          <div className="space-y-4">
            <button 
              onClick={handleGetStarted}
              className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 text-lg"
            >
              <span className="relative z-10">Get Started for Free</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-cyan-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <div className="flex items-center justify-center md:justify-start space-x-6 text-slate-400 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Free forever plan</span>
              </div>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-slate-700/50">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white"> </div>
              <div className="text-slate-400 text-sm"> </div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white"> </div>
              <div className="text-slate-400 text-sm"> </div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white"> </div>
              <div className="text-slate-400 text-sm"> </div>
            </div>
          </div>
        </div>
        
        {/* Right Side - App Preview */}
        <div className="md:w-1/2 flex justify-center mb-12 md:mb-0">
          <div className="relative">
            {/* Glassmorphism container */}
            <div className="relative backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="w-80 md:w-96 h-96 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
                {/* Mock app interface */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-semibold">Dashboard</h3>
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="h-12 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-lg backdrop-blur-sm border border-white/10 flex items-center px-4">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                      <div className="text-slate-300 text-sm">Total Balance: $12,450</div>
                    </div>
                    
                    <div className="h-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg backdrop-blur-sm border border-white/10 p-3">
                      <div className="text-slate-400 text-xs mb-2">Spending Analysis</div>
                      <div className="flex space-x-1">
                        {[29, 24, 43, 20, 12, 40, 36, 15].map((height, i) => (
                          <div key={i} className={`w-3 bg-gradient-to-t from-purple-500 to-cyan-400 rounded-sm animate-pulse`} 
                               style={{height: `${height}px`, animationDelay: `${i * 100}ms`}}></div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      {['Groceries', 'Transport', 'Entertainment'].map((item, i) => (
                        <div key={item} className="h-8 bg-white/5 rounded-lg backdrop-blur-sm border border-white/5 flex items-center px-3">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                          <span className="text-slate-300 text-xs">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-bounce"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-bounce delay-500"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent"></div>
    </div>
  );
}