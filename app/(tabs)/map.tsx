
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';
import MapView, { Marker, Region } from 'react-native-maps';

import { useLocation } from '@/stores';
import { usePostsStore } from '@/stores';
import { Post } from '@/models/post';
import MapMarker from '@/components/MapMarker';

const MapRoute = () => {
  const { postId } = useLocalSearchParams<{ postId: string }>();
  const { posts } = usePostsStore();
  const { location, isLoading } = useLocation();
  const [selectedPost, setSelectedPost] = useState<Post | null>(
    postId ? posts.find((p) => p.id.toString() === postId) || null : null
  );
  const [region, setRegion] = useState<Region>({
    latitude: location.lat,
    longitude: location.lng,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  useEffect(() => {
    if (postId) {
      const post = posts.find((p) => p.id.toString() === postId);
      if (post) {
        setSelectedPost(post);
        // Center map on selected post
        setRegion({
          latitude: post.lat,
          longitude: post.lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      }
    }
  }, [postId, posts]);

  useEffect(() => {
    // Update region when location changes
    setRegion(prev => ({
      ...prev,
      latitude: location.lat,
      longitude: location.lng,
    }));
  }, [location]);

  const handleMarkerPress = (post: Post) => {
    setSelectedPost(post);
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        {isLoading ? (
          <ActivityIndicator size='large' style={styles.loader} />
        ) : (
          <MapView
            style={styles.map}
            region={region}
            onRegionChangeComplete={setRegion}
            showsUserLocation={true}
            showsMyLocationButton={true}
          >
            {/* User's current location marker */}
            <Marker
              coordinate={{
                latitude: location.lat,
                longitude: location.lng,
              }}
              title="Your Location"
              pinColor="blue"
            />

            {/* Post markers */}
            {posts.map((post) => (
              <MapMarker
                key={post.id}
                post={post}
                onPress={handleMarkerPress}
              />
            ))}
          </MapView>
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
  },
  map: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
