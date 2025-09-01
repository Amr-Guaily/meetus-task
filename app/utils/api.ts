'use client';
import Cookies from 'js-cookie';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  'https://api-yeshtery.dev.meetusvr.com/v1';

export async function loginAction(formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');

  const payload = {
    email,
    password,
    isEmployee: true,
  };

  try {
    const res = await fetch(`${API_BASE_URL}/yeshtery/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      return { success: false, error: 'Invalid credentials' };
    }

    const data = await res.json();

    const newToken = data?.token;
    Cookies.set('token', newToken, {
      secure: true,
      sameSite: 'Strict',
      path: '/',
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: 'Something went wrong. Please try again.' };
  }
}

export async function getUserInfoAction() {
  const token = Cookies.get('token');

  if (!token) {
    return { success: false, error: 'Unauthorized' };
  }

  try {
    const res = await fetch(`${API_BASE_URL}/yeshtery/user`, {
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
