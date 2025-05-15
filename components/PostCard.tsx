import { Button, Card, Text } from 'react-native-paper';
import { useRouter } from 'expo-router';

import { Post } from '@/models/post';

const PostCard = ({ post }: { post: Post }) => {
  const router = useRouter();
  return (
    <Card style={{ margin: 8 }}>
      <Card.Cover source={{ uri: post.imageUrl }} />
      <Card.Content>
        <Text>{post.text}</Text>
      </Card.Content>
      <Card.Actions>
        <Button
          onPress={() =>
            router.push({ pathname: '/map', params: { postId: post.id } })
          }
        >
          Show on Map
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default PostCard;
