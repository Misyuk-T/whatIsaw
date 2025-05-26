
import { Marker } from 'react-native-maps';

import { Post } from '@/models/post';

const MapMarker = ({
  post,
  onPress
}: {
  post: Post;
  onPress: (p: Post) => void;
}) => (
  <Marker
    coordinate={{ 
      latitude: post.lat, 
      longitude: post.lng 
    }}
    title={post.text}
    description={`Posted: ${new Date(post.createdAt).toLocaleDateString()}`}
    onPress={() => onPress(post)}
    pinColor="red"
  />
);

export default MapMarker;
