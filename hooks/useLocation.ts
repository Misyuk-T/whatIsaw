import { useEffect, useState } from 'react';

export const useLocation = () => {
  const [location, setLocation] = useState({ lat: 37.78825, lng: -122.4324 });

  // could add real permission logic later
  useEffect(() => {
    // simulate async permission
    const timer = setTimeout(() => setLocation((loc) => loc), 500);
    return () => clearTimeout(timer);
  }, []);

  return { location };
};
