import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-[#E9ECF2]">
      <Loader2
        size={70}
        className="text-center animate-spin text-primary mx-auto mb-4"
      />
    </div>
  );
}
