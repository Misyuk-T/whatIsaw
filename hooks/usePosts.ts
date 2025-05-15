import { useState } from 'react';

import { Post } from '@/models/post';

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      text: 'Hello from mock!',
      imageUrl: 'https://picsum.photos/300',
      lat: 37.78825,
      lng: -122.4324,
      createdAt: new Date().toISOString()
    }
  ]);

  const addPost = (post: Post) => setPosts((prev) => [post, ...prev]);

  return { posts, addPost };
};
