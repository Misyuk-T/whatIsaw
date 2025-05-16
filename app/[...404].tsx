import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useRouter } from 'expo-router';

const NotFoundScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text variant='headlineMedium' style={styles.title}>
        Page Not Found
      </Text>
      <Text variant='bodyLarge' style={styles.subtitle}>
        The page you&#39;re looking for doesn&#39;t exist or has been moved.
      </Text>
      <Button
        mode='contained'
        onPress={() => router.push('/(tabs)')}
        style={styles.button}
      >
        Go to Home
      </Button>
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
  }
});

export default NotFoundScreen;
