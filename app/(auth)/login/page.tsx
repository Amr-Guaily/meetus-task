import DemoTokenButton from '@/components/DemoTokenButton';
import LoginForm from '@/components/LoginForm';
import { cookies } from 'next/dist/server/request/cookies';

export default async function LoginPage() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get('token')?.value;

  return (
    <div className="h-screen bg-[#E9ECF2] flex items-center justify-center relative">
      <DemoTokenButton />

      <div
        className="w-7xl mx-auto h-[90%] flex items-center justify-center bg-gray-50 border-2 rounded-2xl border-white relative overflow-hidden"
        style={{
          backgroundImage: 'url(/assets/bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Left side - Login Form */}
        <LoginForm token={token} />

        {/* Right side - Logo */}
        <div className="h-full flex-[1.5]"></div>
      </div>
    </div>
  );
}
