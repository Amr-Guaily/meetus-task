'use client';

import { loginAction } from '@/app/utils/api';
import { Eye, EyeOff, Lock, Mail, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isFormValid = email && password && isEmailValid;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await loginAction(new FormData(e.currentTarget));
      if (result?.success) {
        router.replace('/');
      } else {
        setError(result?.error || 'Login failed');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto lg:pl-12 xl:pl-22 py-6 max-w-md rounded-xl">
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
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full pl-12 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-[#9414FF] focus:border-transparent outline-none text-[#62626B] placeholder-[#62626B] bg-[#fff]/40 border border-[#fff]"
            placeholder="Email"
          />
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#1A1A1E] w-5 h-5" />
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full pl-12 pr-12 py-3 rounded-lg focus:ring-2 focus:ring-[#9414FF] focus:border-transparent outline-none text-[#62626B] placeholder-[#62626B] bg-[#fff]/40 border border-[#fff]"
            placeholder="Password"
          />
          <button
            type="button"
            tabIndex={-1}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#1A1A1E] focus:outline-none"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <button
          type="submit"
          className="w-full cursor-pointer bg-[#9414FF] text-white py-2 px-4 rounded-lg hover:opacity-80 transition-colors font-normal disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-[#9414FF]"
          disabled={!isFormValid || loading}
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
        {error && (
          <div className="flex items-center gap-2 bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded-lg">
            <X />
            <span>{error}</span>
          </div>
        )}
      </form>
      <p className="mt-8 text-center text-sm text-[#62626B]">
        Don't have an account?
      </p>
    </div>
  );
}
