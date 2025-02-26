"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { getUserProfile, handleRedirectResult } from '../firebase/firebaseUtils';
import type { UserProfile } from '../firebase/firebaseUtils';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for redirect result when the component mounts
    const checkRedirectResult = async () => {
      try {
        const redirectUser = await handleRedirectResult();
        if (redirectUser) {
          const profile = await getUserProfile(redirectUser.uid);
          setUserProfile(profile);
        }
      } catch (error) {
        console.error('Error handling redirect:', error);
      }
    };

    checkRedirectResult();

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      console.log('Auth state changed:', user);
      setUser(user);
      
      if (user) {
        try {
          const profile = await getUserProfile(user.uid);
          setUserProfile(profile);
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, userProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
