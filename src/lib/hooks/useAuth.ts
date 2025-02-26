import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { signInWithGoogle, logoutUser as signOut, updateUserProfile } from '../firebase/firebaseUtils';
import type { UserProfile } from '../firebase/firebaseUtils';

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const { user, userProfile, loading } = context;

  const login = async () => {
    try {
      console.log('Starting Google sign-in process...');
      const result = await signInWithGoogle();
      console.log('Sign-in successful:', result);
      return result;
    } catch (error) {
      console.error('Error during login:', error);
      if (error instanceof Error) {
        console.error('Error details:', {
          message: error.message,
          name: error.name,
          stack: error.stack
        });
      }
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  };

  const updateProfile = async (profileData: Partial<UserProfile>) => {
    if (!user) throw new Error('No user logged in');
    try {
      await updateUserProfile(user.uid, profileData);
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  return {
    user,
    userProfile,
    loading,
    login,
    logout,
    updateProfile,
  };
}