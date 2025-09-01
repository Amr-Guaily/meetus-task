import LoginForm from '@/components/LoginForm';

export default function LoginPage() {
  return (
    <div className="h-screen bg-[#E9ECF2] flex items-center justify-center relative">
      <div className="w-7xl mx-auto h-[90%] flex items-center justify-center bg-gray-50 border rounded-2xl border-white relative overflow-hidden bg-[url('/assets/smbg.png')] lg:bg-[url('/assets/bg.png')] bg-cover bg-center bg-no-repeat">
        {/* Left side - Login Form */}
        <LoginForm />

        {/* Right side - Logo */}
        <div className="h-full flex-[1.5] hidden lg:flex"></div>
      </div>
    </div>
  );
}
