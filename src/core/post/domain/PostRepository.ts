import type { Post } from '@/core/post/domain/Post'

export interface PostRepository {
  create(post: Post): Promise<void>
  getAll(): Promise<Post[]>
}