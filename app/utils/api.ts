'use client';
import Cookies from 'js-cookie';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  'https://api-yeshtery.dev.meetusvr.com/v1';

export async function getUserInfoAction() {
  const token = Cookies.get('token');

  try {
    const res = await fetch(`${API_BASE_URL}/user/info`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      return { success: false, error: 'Failed to fetch user info' };
    }

    const data = await res.json();
    return { success: true, user: data };
  } catch (error) {
    return { success: false, error: 'Something went wrong. Please try again.' };
  }
}
