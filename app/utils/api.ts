'use client';
import Cookies from 'js-cookie';

export async function loginAction(formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');
  const token = Cookies.get('token');

  const payload = {
    email,
    password,
    isEmployee: true,
  };
  try {
    const res = await fetch(
      'https://api-yeshtery.dev.meetusvr.com/v1/yeshtery/token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(payload),
      }
    );

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
