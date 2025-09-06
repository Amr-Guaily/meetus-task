import { API_BASE_URL } from '@/app/constant/constant';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

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
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const data = await res.json();
    const token = data?.token;
    const { id, name } = data?.userInfo;

    const response = NextResponse.json({ success: true, id, name });
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
