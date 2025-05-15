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
    coordinate={{ latitude: post.lat, longitude: post.lng }}
    onPress={() => onPress(post)}
  />
);

export default MapMarker;
