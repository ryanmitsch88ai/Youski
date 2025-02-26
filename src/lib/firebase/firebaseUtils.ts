import { auth, db } from "./firebase";
import {
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult
} from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  setDoc,
  getDoc,
} from "firebase/firestore";

// Auth functions
export const logoutUser = () => firebaseSignOut(auth);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  skillLevel: "beginner" | "intermediate" | "advanced" | "expert";
  preferences: string[];
  timeAvailability: "half-day" | "full-day" | "custom";
  customHours?: { start: string; end: string };
  goals?: string[];
  favoriteResorts?: string[];
  recentTrips?: {
    resortId: string;
    date: string;
  }[];
  stats?: {
    daysSkied: number;
    highestAltitude: number;
    longestRun: number;
    totalVertical: number;
  };
  friends?: string[];
  achievements?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export const signInWithGoogle = async () => {
  try {
    // Try popup first
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await handleAuthResult(result);
      return result.user;
    } catch (popupError) {
      console.log('Popup failed, trying redirect...', popupError);
      // If popup fails, fall back to redirect
      await signInWithRedirect(auth, googleProvider);
    }
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

// Handle the redirect result
export const handleRedirectResult = async () => {
  try {
    const result = await getRedirectResult(auth);
    if (result) {
      await handleAuthResult(result);
      return result.user;
    }
  } catch (error) {
    console.error('Error handling redirect result:', error);
    throw error;
  }
};

// Helper function to handle auth result
async function handleAuthResult(result: any) {
  const { user } = result;
  
  // Check if user profile exists
  const userDoc = await getDoc(doc(db, 'users', user.uid));
  
  if (!userDoc.exists()) {
    // Create new user profile
    const newUser: Partial<UserProfile> = {
      uid: user.uid,
      email: user.email || '',
      displayName: user.displayName || '',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    await setDoc(doc(db, 'users', user.uid), newUser);
  }
}

// Firestore functions
export const addDocument = (collectionName: string, data: any) =>
  addDoc(collection(db, collectionName), data);

export const getDocuments = async (collectionName: string) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

export const updateDocument = (collectionName: string, id: string, data: any) =>
  updateDoc(doc(db, collectionName, id), data);

export const deleteDocument = (collectionName: string, id: string) =>
  deleteDoc(doc(db, collectionName, id));

export const updateUserProfile = async (uid: string, profileData: Partial<UserProfile>) => {
  try {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      ...profileData,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return userDoc.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
};
