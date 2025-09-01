import LogoutButton from '@/components/LogoutButton';
import { cookies } from 'next/headers';
import Link from 'next/link';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  'https://api-yeshtery.dev.meetusvr.com/v1';

async function getUserInfo() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get('token')?.value;

  if (!token) {
    return { success: false, error: 'No authentication token found.' };
  }

  try {
    const res = await fetch(`${API_BASE_URL}/user/info`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      const data = await res.json();
      return {
        success: false,
        error: data?.message || 'Failed to fetch user info',
      };
    }

    const data = await res.json();

    return { success: true, user: data };
  } catch (error) {
    console.error('Error fetching user info:', error);
    return {
      success: false,
      error: 'Something went wrong. Please try again.',
    };
  }
}

export default async function Home() {
  const res = await getUserInfo();

  console.log('User Info Response:', res);

  if (!res.success) {
    const errorMsg =
      res.error || 'Something went wrong. Please try again or login again.';

    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#E9ECF2]">
        <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded-lg mb-4">
          {errorMsg}
        </div>
        <Link href="/login" className="text-[#9414FF] underline">
          Go to Login
        </Link>
      </div>
    );
  }

  const user = res.user;

  return (
    <div className="h-screen bg-[#E9ECF2] flex flex-col items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 min-w-[320px] text-slate-600">
        <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}!</h1>
        <p className="mb-2">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="mb-2">
          <strong>Status:</strong> {user.status}
        </p>
        <p className="mb-2">
          <strong>Roles:</strong> {user.roles.join(', ')}
        </p>
        <LogoutButton />
      </div>
    </div>
  );
}
