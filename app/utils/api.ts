export async function loginAction(formData: FormData, token?: string) {
  const email = formData.get('email');
  const password = formData.get('password');

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

    return { success: true };
  } catch (error) {
    return { success: false, error: 'Something went wrong. Please try again.' };
  }
}
