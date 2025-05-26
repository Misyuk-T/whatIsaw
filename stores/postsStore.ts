
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
      text: 'Hello from mock!',
      imageUrl: 'https://picsum.photos/300',
      lat: 37.78825,
      lng: -122.4324,
      createdAt: new Date().toISOString()
    }
  ],

  addPost: (post: Post) =>
    set((state) => ({
      posts: [post, ...state.posts]
    })),

  setPosts: (posts: Post[]) =>
    set({ posts })
}));
