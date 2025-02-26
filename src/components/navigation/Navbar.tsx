'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import Image from 'next/image';
import { useState } from 'react';
import OnboardingFlow from '@/components/onboarding/OnboardingFlow';

export default function Navbar() {
  const pathname = usePathname();
  const { user, login, logout } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState(false);

  const isActive = (path: string) => pathname === path;

  const handleLogin = async () => {
    try {
      await login();
      setShowOnboarding(true);
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <>
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link 
                href="/"
                className="flex items-center"
              >
                <span className="text-xl font-bold text-blue-600">You Ski</span>
              </Link>

              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  href="/map"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isActive('/map')
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  Map
                </Link>
              </div>
            </div>

            <div className="flex items-center">
              {user ? (
                <div className="flex items-center space-x-4">
                  <Link
                    href="/profile"
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      isActive('/profile')
                        ? 'border-blue-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={logout}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    Sign Out
                  </button>
                  <div className="relative w-8 h-8 rounded-full overflow-hidden">
                    {user.photoURL ? (
                      <Image
                        src={user.photoURL}
                        alt="Profile"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-blue-500 flex items-center justify-center text-white">
                        {user.displayName?.[0] || user.email?.[0] || '?'}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleLogin}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Onboarding Modal */}
      {showOnboarding && user && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50">
          <div className="flex items-center justify-center min-h-screen">
            <OnboardingFlow onComplete={() => setShowOnboarding(false)} />
          </div>
        </div>
      )}
    </>
  );
} 