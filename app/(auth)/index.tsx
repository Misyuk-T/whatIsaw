import { useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { useAuth } from '@/hooks/useAuth';

const AuthRoute = () => {
  const { signInWithGoogle, signInAnonymously } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsSigningIn(true);
    try {
      await signInWithGoogle();
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleAnonymousSignIn = async () => {
    setIsSigningIn(true);
    try {
      await signInAnonymously();
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant='headlineMedium' style={styles.title}>
        What I Saw
      </Text>
      <Text variant='bodyLarge' style={styles.subtitle}>
        Share what you see with the world
      </Text>

      {isSigningIn ? (
        <ActivityIndicator size='large' style={styles.loader} />
      ) : (
        <View>
          <Button
            mode='contained'
            onPress={handleGoogleSignIn}
            style={styles.button}
          >
            Sign in with Google
          </Button>
          <Button
            mode='outlined'
            onPress={handleAnonymousSignIn}
            style={styles.button}
          >
            Continue as Guest
          </Button>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  title: {
    marginBottom: 8,
    textAlign: 'center'
  },
  subtitle: {
    marginBottom: 32,
    textAlign: 'center',
    opacity: 0.7
  },
  button: {
    marginBottom: 12,
    width: '100%',
    maxWidth: 300
  },
  loader: {
    marginVertical: 20
  }
});

export default AuthRoute;
