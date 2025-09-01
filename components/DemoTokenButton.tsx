'use client';

import { useState } from 'react';

export default function DemoTokenButton() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleGetToken = async () => {
    setLoading(true);
    setSuccess(false);
    try {
      const res = await fetch(
        'https://api-yeshtery.dev.meetusvr.com/v1/yeshtery/token',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: 'dev.aert@gmail.com',
            password: 'helloworld',
            isEmployee: true,
          }),
        }
      );
      const data = await res.json();
      if (data?.token) {
        document.cookie = `token=${data.token}; path=/; Secure; SameSite=Strict;`;
        setSuccess(true);
      }
    } catch {
      setSuccess(false);
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handleGetToken}
      className="absolute top-6 cursor-pointer hover:underline right-6 font-semibold text-[#9414FF] text-sm"
      disabled={loading}
    >
      {loading
        ? 'Getting Token...'
        : success
        ? 'Token Saved!'
        : 'Get  JWT Token'}
    </button>
  );
}
