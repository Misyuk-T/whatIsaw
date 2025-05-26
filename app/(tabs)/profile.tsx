import { StyleSheet, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';

import { useAuthStore, usePostsStore } from '@/stores';

const ProfileRoute = () => {
  const { user, signOut } = useAuthStore();
  const { posts } = usePostsStore();
  const userPosts = posts;

  return (
    <View style={styles.container}>
      <Card style={styles.profileCard}>
        <Card.Content>
          <Text variant='headlineSmall' style={styles.name}>
            {user?.name || 'User'}
          </Text>
          <Text variant='bodyMedium' style={styles.email}>
            {user?.email || (user?.isAnonymous ? 'Guest User' : '')}
          </Text>
          <Text variant='bodyMedium' style={styles.stats}>
            Posts: {userPosts.length}
          </Text>
        </Card.Content>
        <Card.Actions>
          <Button onPress={signOut}>Sign Out</Button>
        </Card.Actions>
      </Card>

      <Text variant='titleMedium' style={styles.sectionTitle}>
        Your Posts
      </Text>

      {userPosts.length === 0 ? (
        <Text style={styles.emptyState}>
          You haven&#39;t created any posts yet. Go to the &#34;New Post&#34;
          tab to share what you&#39;ve seen!
        </Text>
      ) : (
        <Text style={styles.emptyState}>
          Your posts will appear here. Currently showing mock data.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  profileCard: {
    marginBottom: 24
  },
  name: {
    marginBottom: 4
  },
  email: {
    marginBottom: 8,
    opacity: 0.7
  },
  stats: {
    marginTop: 8
  },
  sectionTitle: {
    marginBottom: 16
  },
  emptyState: {
    textAlign: 'center',
    opacity: 0.7,
    marginTop: 24
  }
});

export default ProfileRoute;
