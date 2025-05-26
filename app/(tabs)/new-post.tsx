import { useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

import { useLocation } from '@/stores';
import { usePostsStore } from '@/stores';
import { Post } from '@/models/post';

const NewPostRoute = () => {
  const [text, setText] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { location, isLoading, errorMsg, showLocationPermissionAlert } =
    useLocation();
  const { addPost } = usePostsStore();

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        allowsEditing: true,
        aspect: [4, 3]
      });

      if (!result.canceled && result.assets.length > 0) {
        setImageUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      alert('Failed to pick image. Please try again.');
    }
  };

  const takePhoto = async () => {
    try {
      const cameraPermission =
        await ImagePicker.requestCameraPermissionsAsync();

      if (cameraPermission.status !== 'granted') {
        alert('Camera permission is required to take photos.');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        allowsEditing: true,
        aspect: [4, 3]
      });

      if (!result.canceled && result.assets.length > 0) {
        setImageUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      alert('Failed to take photo. Please try again.');
    }
  };

  const submit = async () => {
    if (!location) {
      showLocationPermissionAlert();
      return;
    }

    if (imageUri && text.trim().length > 0) {
      setIsSubmitting(true);
      try {
        const newPost: Post = {
          id: posts.length + 1,
          text,
          imageUrl: imageUri,
          lat: location.lat,
          lng: location.lng,
          createdAt: new Date().toISOString()
        };

        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        addPost(newPost);
        setText('');
        setImageUri(null);
        alert('Post created successfully!');
      } catch (error) {
        console.error('Error creating post:', error);
        alert('Failed to create post. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size='large' />
        <Text style={styles.loadingText}>Getting your location...</Text>
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.errorText}>{errorMsg}</Text>
        <Button
          mode='contained'
          onPress={showLocationPermissionAlert}
          style={styles.button}
        >
          Enable Location
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageButtons}>
        <Button
          mode='contained'
          onPress={pickImage}
          style={[styles.button, styles.imageButton]}
          icon='image'
        >
          Gallery
        </Button>
        <Button
          mode='contained'
          onPress={takePhoto}
          style={[styles.button, styles.imageButton]}
          icon='camera'
        >
          Camera
        </Button>
      </View>

      {imageUri && <Image source={{ uri: imageUri }} style={styles.preview} />}

      <TextInput
        label='What did you see?'
        value={text}
        onChangeText={setText}
        mode='outlined'
        style={styles.input}
        multiline
        numberOfLines={3}
      />

      <Text style={styles.locationText}>
        Location: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
      </Text>

      <Button
        mode='contained'
        onPress={submit}
        disabled={!imageUri || text.trim().length === 0 || isSubmitting}
        loading={isSubmitting}
        style={styles.submitButton}
      >
        {isSubmitting ? 'Creating Post...' : 'Create Post'}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  button: {
    marginBottom: 16
  },
  imageButton: {
    flex: 1,
    marginHorizontal: 4
  },
  preview: {
    width: '100%',
    height: 200,
    marginBottom: 16,
    borderRadius: 8
  },
  input: {
    marginBottom: 16
  },
  submitButton: {
    marginTop: 8
  },
  loadingText: {
    marginTop: 16,
    opacity: 0.7
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center'
  },
  locationText: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 8
  }
});

export default NewPostRoute;
