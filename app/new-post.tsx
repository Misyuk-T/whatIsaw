import { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

import { useLocation } from '@/hooks/useLocation';
import { usePosts } from '@/hooks/usePosts';
import { Post } from '@/models/post';

const NewPostRoute = () => {
  const [text, setText] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const { location } = useLocation();
  const { posts, addPost } = usePosts();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 1
    });

    if (!result.canceled && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const submit = () => {
    if (location && imageUri) {
      const newPost: Post = {
        id: posts.length + 1,
        text,
        imageUrl: imageUri,
        lat: location.lat,
        lng: location.lng,
        createdAt: new Date().toISOString()
      };
      addPost(newPost);
      setText('');
      setImageUri(null);
    }
  };

  return (
    <View style={styles.container}>
      <Button mode='contained' onPress={pickImage} style={styles.button}>
        Pick Image
      </Button>

      {imageUri && <Image source={{ uri: imageUri }} style={styles.preview} />}

      <TextInput
        label='Comment'
        value={text}
        onChangeText={setText}
        mode='outlined'
        style={styles.input}
      />

      <Button
        mode='contained'
        onPress={submit}
        disabled={!imageUri || text.trim().length === 0}
      >
        Submit
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  button: { marginBottom: 16 },
  preview: { width: '100%', height: 200, marginBottom: 16, borderRadius: 8 },
  input: { marginBottom: 16 }
});

export default NewPostRoute;
