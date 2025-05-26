
import { useEffect } from 'react';
import { Alert, Linking, Platform } from 'react-native';
import { create } from 'zustand';

import { Location } from '@/models';

interface LocationState {
  location: Location;
  errorMsg: string | null;
  isLoading: boolean;
  setLocation: (location: Location) => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
  showLocationPermissionAlert: () => void;
  initializeLocation: () => void;
}

export const useLocationStore = create<LocationState>((set, get) => ({
  location: {
    lat: 37.78825,
    lng: -122.4324
  },
  errorMsg: null,
  isLoading: true,

  setLocation: (location: Location) => set({ location }),
  
  setError: (errorMsg: string | null) => set({ errorMsg }),
  
  setLoading: (isLoading: boolean) => set({ isLoading }),

  showLocationPermissionAlert: () => {
    Alert.alert(
      'Location Permission Required',
      'This app needs access to your location to show posts on the map and create new posts.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open Settings', onPress: () => {
          if (Platform.OS === 'ios') {
            Linking.openURL('app-settings:');
          } else {
            Linking.openSettings();
          }
        }}
      ]
    );
  },

  initializeLocation: () => {
    // This is a mock implementation
    // In a real implementation, we would use expo-location
    const { setLocation, setLoading } = get();
    
    const timer = setTimeout(() => {
      // Simulate getting location with random offset for realism
      const randomOffset = () => (Math.random() - 0.5) * 0.01;
      setLocation({
        lat: 37.78825 + randomOffset(),
        lng: -122.4324 + randomOffset()
      });
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }
}));

// Custom hook to initialize location on mount
export const useLocation = () => {
  const store = useLocationStore();

  useEffect(() => {
    const cleanup = store.initializeLocation();
    return cleanup;
  }, []);

  return {
    location: store.location,
    errorMsg: store.errorMsg,
    isLoading: store.isLoading,
    showLocationPermissionAlert: store.showLocationPermissionAlert
  };
};
