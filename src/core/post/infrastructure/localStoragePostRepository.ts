import type { PostRepository } from '@/core/post/domain/PostRepository'
import type { Post } from '@/core/post/domain/Post'

export const localStoragePostRepository = (): PostRepository => {
  const create = async (post: Post) => {
    const posts = await getAll()
    posts.unshift(post)
    localStorage.setItem('posts', JSON.stringify(posts))
  }

  const getAll = async () => {
    return JSON.parse(localStorage.getItem('posts') || '[]')
  }

  return {
    create,
    getAll
  }
}