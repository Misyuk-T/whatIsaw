import { Button, Card, Modal, Portal, Text } from 'react-native-paper';

import { Post } from '@/models/post';

const PhotoModal = ({
  visible,
  post,
  onClose
}: {
  visible: boolean;
  post: Post | null;
  onClose: () => void;
}) => {
  if (!post) return null;

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={{ margin: 20 }}
      >
        <Card>
          <Card.Cover source={{ uri: post.imageUrl }} />
          <Card.Content>
            <Text>{post.text}</Text>
            <Text>{post.createdAt}</Text>
          </Card.Content>
          <Card.Actions>
            <Button onPress={onClose}>Close</Button>
          </Card.Actions>
        </Card>
      </Modal>
    </Portal>
  );
};

export default PhotoModal;
