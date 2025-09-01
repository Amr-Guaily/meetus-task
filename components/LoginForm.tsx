'use client';

import { Lock, Mail } from 'lucide-react';
import { useState } from 'react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isFormValid = email && password && isEmailValid;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt:', { email, password });
  };

  return (
    <div className="mx-auto pl-22 py-6 max-w-md rounded-xl">
      <div className="text-center">
        <h2 className="text-5xl font-normal text-[#1A1A1E] whitespace-nowrap">
          Welcome Back
        </h2>
        <p className="text-base text-[#62626B] my-6">
          Step into our shopping metaverse for an unforgettable shopping
          experience
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#1A1A1E] w-5 h-5" />
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full pl-12 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-[#62626B] placeholder-[#62626B] bg-[#fff]/40 border border-[#fff]"
            placeholder="Email"
          />
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#1A1A1E] w-5 h-5" />
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full pl-12 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-[#62626B] placeholder-[#62626B] bg-[#fff]/40 border border-[#fff]"
            placeholder="Password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#9414FF] text-white py-2 px-4 rounded-lg hover:opacity-80 transition-colors font-normal disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!isFormValid}
        >
          Sign In
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-gray-600">
        Don't have an account?
        <a href="#" className="hover:underline hover:text-[#9414FF] ml-1">
          Sign up
        </a>
      </p>
    </div>
  );
}
