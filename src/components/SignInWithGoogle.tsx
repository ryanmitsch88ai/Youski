"use client";

import { useAuth } from "@/lib/hooks/useAuth";
import Image from "next/image";

export default function SignInWithGoogle() {
  const { login } = useAuth();

  return (
    <button
      onClick={login}
      className="flex items-center justify-center gap-2 px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      <Image
        src="/google.svg"
        alt="Google logo"
        width={20}
        height={20}
      />
      <span>Sign in with Google</span>
    </button>
  );
}
