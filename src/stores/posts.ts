import { defineStore } from 'pinia'
import type { Post } from '@/core/post/domain/Post'


export const usePostStore = defineStore('posts', {
  state: () => {
    return {
      posts: [] as Post[],
    }
  },
  actions: {
    addPost(post: Post) {
      this.posts.unshift(post)
    },
    addPosts(posts: Post[]) {
      this.posts = posts;
    }
  },
})