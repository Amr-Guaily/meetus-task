import LoginForm from '@/components/LoginForm';

export default function LoginPage() {
  return (
    <div className="h-screen bg-[#E9ECF2] flex items-center justify-center relative">
      <div className="w-full px-2 max-w-7xl h-full md:h-[85%] flex items-center justify-center md:rounded-2xl md:mx-4 relative overflow-hidden bg-[url('/assets/smbg.png')] lg:bg-[url('/assets/bg.png')] bg-cover bg-center bg-no-repeat">
        {/* Left side - Login Form */}
        <LoginForm />

        {/* Right side - Logo */}
        <div className="h-full flex-[1.5] hidden lg:flex"></div>
      </div>
    </div>
  );
}
