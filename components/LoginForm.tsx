'use client';

import { STORAGE_KEYS } from '@/app/constant/constant';
import { Eye, EyeOff, X } from 'lucide-react';
import Image from 'next/image';
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
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const result = await res.json();

      if (result?.success) {
        router.replace('/');
        localStorage.setItem(STORAGE_KEYS.user_id, result.id);
        localStorage.setItem(STORAGE_KEYS.user_name, result.name);
      } else {
        setError(result?.error || 'Invalid credentials');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (error) setError('');
  };

  return (
    <div className="mx-auto lg:pl-12 xl:pl-22 py-6 max-w-md">
      <div className="text-center">
        <h2 className="text-4xl sm:text-5xl font-normal text-[#1A1A1E]">
          Welcome back
        </h2>
        <p className="text-sm sm:text-base text-[#62626B] my-6 max-w-3xl">
          Step into our shopping metaverse for an unforgettable shopping
          experience
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <Image
            src="/assets/icons/sms.svg"
            alt="Email"
            width={24}
            height={24}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A1A1E]"
          />
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
            className="w-full pl-13 pr-4 py-4 rounded-lg focus:ring-2 focus:ring-[#9414FF] focus:border-transparent outline-none text-[#62626B] placeholder-[#62626B] bg-[#fff]/40 border border-[#fff]"
            placeholder="Email"
          />
        </div>
        <div className="relative">
          <Image
            src="/assets/icons/lock.svg"
            alt="Email"
            width={24}
            height={24}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A1A1E]"
          />
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handlePasswordChange}
            required
            className="w-full pl-13 pr-12 py-4 rounded-lg focus:ring-2 focus:ring-[#9414FF] focus:border-transparent outline-none text-[#62626B] placeholder-[#62626B] bg-[#fff]/40 border border-[#fff]"
            placeholder="Password"
          />
          <button
            type="button"
            tabIndex={-1}
            className="absolute cursor-pointer right-4 top-1/2 transform -translate-y-1/2 text-[#1A1A1E] focus:outline-none"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <button
          type="submit"
          className="w-full cursor-pointer bg-[#9414FF] text-white py-2.5 px-4 rounded-lg hover:opacity-80 transition-colors font-normal disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-[#9414FF]"
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
