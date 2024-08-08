import type { PostRepository } from '@/core/post/domain/PostRepository'
import type { CreatePostDTO } from '@/core/post/application/createPost'

export const localStoragePostRepository = (): PostRepository => {
  const create = async (post: CreatePostDTO) => {
    localStorage.setItem('post', JSON.stringify(post))
  }

  return {
    create
  }
}