'use client';

import { STORAGE_KEYS } from '@/app/constant/constant';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await fetch('/api/logout', { method: 'POST' });

      localStorage.removeItem(STORAGE_KEYS.user_id);
      localStorage.removeItem(STORAGE_KEYS.user_name);
    } catch (err) {
      // TODO: Handle error
    }
    router.replace('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="mt-6 w-full bg-[#9414FF] text-white py-2 px-4 rounded-lg hover:opacity-80 transition-colors font-normal cursor-pointer"
      disabled={loading}
    >
      {loading ? 'Logging out...' : 'Logout'}
    </button>
  );
}
