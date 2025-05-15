import { View } from 'react-native';
import { Button } from 'react-native-paper';

import { useAuth } from '@/hooks/useAuth';

const AuthRoute = () => {
  const { signInWithGoogle, signInAnonymously } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        mode='contained'
        onPress={signInWithGoogle}
        style={{ marginBottom: 12 }}
      >
        Sign in with Google
      </Button>
      <Button mode='outlined' onPress={signInAnonymously}>
        Continue as Guest
      </Button>
    </View>
  );
};

export default AuthRoute;
