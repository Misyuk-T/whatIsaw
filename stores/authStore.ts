
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { User } from '@/models';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInAnonymously: () => Promise<void>;
  signOut: () => Promise<void>;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: true,

      signInWithGoogle: async () => {
        try {
          const mockUser: User = {
            id: 'google-' + Math.random().toString(36).substring(2, 9),
            name: 'Google User',
            email: 'user@example.com',
            isAnonymous: false
          };
          set({ user: mockUser });
        } catch (error) {
          console.error('Error signing in with Google:', error);
          alert('Failed to sign in with Google');
        }
      },

      signInAnonymously: async () => {
        try {
          const anonymousUser: User = {
            id: 'anon-' + Math.random().toString(36).substring(2, 9),
            name: 'Guest User',
            isAnonymous: true
          };
          set({ user: anonymousUser });
        } catch (error) {
          console.error('Error signing in anonymously:', error);
          alert('Failed to sign in as guest');
        }
      },

      signOut: async () => {
        try {
          set({ user: null });
        } catch (error) {
          console.error('Error signing out:', error);
          alert('Failed to sign out. Please try again.');
        }
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setLoading(false);
        }
      }
    }
  )
);
