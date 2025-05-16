import { useEffect, useState } from 'react';
import { Alert, Linking, Platform } from 'react-native';

import { Location } from '@/models';

export const useLocation = () => {
  const [location, setLocation] = useState<Location>({
    lat: 37.78825,
    lng: -122.4324
  });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This is a mock implementation
    // In a real implementation, we would use expo-location:
    //
    // async function getLocation() {
    //   setIsLoading(true);
    //   try {
    //     const { status } = await Location.requestForegroundPermissionsAsync();
    //
    //     if (status !== 'granted') {
    //       setErrorMsg('Permission to access location was denied');
    //       return;
    //     }
    //
    //     const position = await Location.getCurrentPositionAsync({});
    //     setLocation({
    //       lat: position.coords.latitude,
    //       lng: position.coords.longitude
    //     });
    //   } catch (error) {
    //     setErrorMsg('Could not get location');
    //     console.error(error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // }
    //
    // getLocation();

    // Mock implementation for now
    const timer = setTimeout(() => {
      // Simulate getting location with random offset for realism
      const randomOffset = () => (Math.random() - 0.5) * 0.01;
      setLocation({
        lat: 37.78825 + randomOffset(),
        lng: -122.4324 + randomOffset()
      });
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const openLocationSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      Linking.openSettings();
    }
  };

  const showLocationPermissionAlert = () => {
    Alert.alert(
      'Location Permission Required',
      'This app needs access to your location to show posts on the map and create new posts.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open Settings', onPress: openLocationSettings }
      ]
    );
  };

  return {
    location,
    errorMsg,
    isLoading,
    showLocationPermissionAlert
  };
};
