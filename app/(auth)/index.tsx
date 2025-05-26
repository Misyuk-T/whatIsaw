import { StyleSheet, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';

import { useAuthStore } from '@/stores';

const AuthScreen = () => {
  const { signInWithGoogle, signInAnonymously } = useAuthStore();

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant='headlineMedium' style={styles.title}>
            Welcome to WhatISaw
          </Text>
          <Text variant='bodyMedium' style={styles.subtitle}>
            Share and discover what others have seen around you
          </Text>
        </Card.Content>
        <Card.Actions style={styles.actions}>
          <Button mode='contained' onPress={signInWithGoogle} style={styles.button}>
            Sign in with Google
          </Button>
          <Button mode='outlined' onPress={signInAnonymously} style={styles.button}>
            Continue as Guest
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16
  },
  card: {
    marginHorizontal: 16
  },
  title: {
    textAlign: 'center',
    marginBottom: 8
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 16
  },
  actions: {
    flexDirection: 'column',
    gap: 8,
    padding: 16
  },
  button: {
    width: '100%'
  }
});

export default AuthScreen;