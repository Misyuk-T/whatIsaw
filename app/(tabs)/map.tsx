import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';

import { useLocation } from '@/hooks/useLocation';
import { usePosts } from '@/hooks/usePosts';

const MapRoute = () => {
  const { postId } = useLocalSearchParams<{ postId: string }>();
  const { posts } = usePosts();
  const { location, isLoading } = useLocation();
  const [selectedPost, setSelectedPost] = useState(
    postId ? posts.find((p) => p.id.toString() === postId) : null
  );

  useEffect(() => {
    if (postId) {
      const post = posts.find((p) => p.id.toString() === postId);
      if (post) {
        setSelectedPost(post);
      }
    }
  }, [postId, posts]);

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        {isLoading ? (
          <ActivityIndicator size='large' style={styles.loader} />
        ) : (
          <>
            <Text style={styles.mapPlaceholder}>Map Placeholder</Text>
            <Text style={styles.mapInfo}>
              Your location: {location.lat.toFixed(6)},{' '}
              {location.lng.toFixed(6)}
            </Text>
            <Text style={styles.mapInfo}>Posts on map: {posts.length}</Text>
            <Text style={styles.mapNote}>
              Note: react-native-maps will be implemented in the future.
            </Text>
          </>
        )}
      </View>

      {selectedPost && (
        <Card style={styles.postCard}>
          <Card.Title title='Selected Post' />
          <Card.Content>
            <Image
              source={{ uri: selectedPost.imageUrl }}
              style={styles.postImage}
            />
            <Text style={styles.postText}>{selectedPost.text}</Text>
            <Text style={styles.postLocation}>
              Location: {selectedPost.lat.toFixed(6)},{' '}
              {selectedPost.lng.toFixed(6)}
            </Text>
            <Text style={styles.postDate}>
              Posted: {new Date(selectedPost.createdAt).toLocaleString()}
            </Text>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => setSelectedPost(null)}>Close</Button>
          </Card.Actions>
        </Card>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  mapContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0'
  },
  mapPlaceholder: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16
  },
  mapInfo: {
    marginBottom: 8
  },
  mapNote: {
    marginTop: 16,
    opacity: 0.7,
    textAlign: 'center',
    paddingHorizontal: 32
  },
  loader: {
    marginVertical: 20
  },
  postCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    margin: 16,
    maxHeight: '50%'
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8
  },
  postText: {
    fontSize: 16,
    marginBottom: 8
  },
  postLocation: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 4
  },
  postDate: {
    fontSize: 12,
    opacity: 0.7
  }
});

export default MapRoute;
