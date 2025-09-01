'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');

  const cookiesStore = await cookies();
  const token = cookiesStore.get('token')?.value;

  try {
    const res = await fetch(
      'https://api-yeshtery.dev.meetusvr.com/v1/yeshtery/token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          email,
          password,
          isEmployee: true,
        }),
      }
    );

    if (!res.ok) {
      return { success: false, error: 'Invalid credentials' };
    }

    const data = await res.json();

    redirect('/');
  } catch (error) {
    return { success: false, error: 'Something went wrong. Please try again.' };
  }
}
