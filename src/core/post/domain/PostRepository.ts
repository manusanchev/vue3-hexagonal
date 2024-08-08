import type { CreatePostDTO } from '@/core/post/application/createPost'

export interface PostRepository {
  create(dto: CreatePostDTO): Promise<void>
}