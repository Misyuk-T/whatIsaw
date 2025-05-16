import { FlatList, Text, View } from 'react-native';

import PostCard from '@/components/PostCard';
import { usePosts } from '@/hooks/usePosts';

const FeedRoute = () => {
  const { posts } = usePosts();

  if (!posts.length)
    return (
      <View>
        <Text>No posts yet.</Text>
      </View>
    );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PostCard post={item} />}
      />
    </View>
  );
};

export default FeedRoute;
