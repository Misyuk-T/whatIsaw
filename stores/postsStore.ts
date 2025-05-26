
import { create } from 'zustand';

import { Post } from '@/models/post';

interface PostsState {
  posts: Post[];
  addPost: (post: Post) => void;
  setPosts: (posts: Post[]) => void;
}

export const usePostsStore = create<PostsState>((set) => ({
  posts: [
    {
      id: 1,
      text: 'Beautiful sunset at Golden Gate!',
      imageUrl: 'https://picsum.photos/300/200?random=1',
      lat: 37.78825,
      lng: -122.4324,
      createdAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
    },
    {
      id: 2,
      text: 'Amazing coffee shop downtown',
      imageUrl: 'https://picsum.photos/300/200?random=2',
      lat: 37.7849,
      lng: -122.4294,
      createdAt: new Date(Date.now() - 3600000).toISOString() // 1 hour ago
    },
    {
      id: 3,
      text: 'Great hiking spot with city view',
      imageUrl: 'https://picsum.photos/300/200?random=3',
      lat: 37.7915,
      lng: -122.4289,
      createdAt: new Date(Date.now() - 7200000).toISOString() // 2 hours ago
    }
  ],

  addPost: (post: Post) =>
    set((state) => ({
      posts: [post, ...state.posts]
    })),

  setPosts: (posts: Post[]) =>
    set({ posts })
}));
