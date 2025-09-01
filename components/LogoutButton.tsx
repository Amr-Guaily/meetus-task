'use client';

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    Cookies.remove('token', { path: '/' });
    router.push('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="mt-6 w-full bg-[#9414FF] text-white py-2 px-4 rounded-lg hover:opacity-80 transition-colors font-normal"
      disabled={loading}
    >
      {loading ? 'Logging out...' : 'Logout'}
    </button>
  );
}
