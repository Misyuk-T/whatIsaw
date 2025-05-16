import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { User } from '@/models';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const signInWithGoogle = async () => {
    try {
      const mockUser: User = {
        id: 'google-' + Math.random().toString(36).substring(2, 9),
        name: 'Google User',
        email: 'user@example.com',
        isAnonymous: false
      };
      await AsyncStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      console.error('Error signing in with Google:', error);
      alert('Failed to sign in with Google');
    }
  };

  const signInAnonymously = async () => {
    try {
      const anonymousUser: User = {
        id: 'anon-' + Math.random().toString(36).substring(2, 9),
        name: 'Guest User',
        isAnonymous: true
      };
      await AsyncStorage.setItem('user', JSON.stringify(anonymousUser));
      setUser(anonymousUser);
    } catch (error) {
      console.error('Error signing in anonymously:', error);
      alert('Failed to sign in as guest');
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
      alert('Failed to sign out. Please try again.');
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Error checking auth state:', error);
      } finally {
        setIsLoading(false);
      }
    };
    checkUser();
  }, []);

  return {
    user,
    isLoading,
    signInWithGoogle,
    signInAnonymously,
    signOut
  };
};
