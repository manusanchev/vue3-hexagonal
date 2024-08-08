import type { Post } from '@/core/post/domain/Post'
import { injectDependency } from '@/core/shared/infrastructure/dependencies/injectDependency'
import type { PostRepository } from '@/core/post/domain/PostRepository'

export const getAllPosts = async () => {
    const execute = async (): Promise<Post[]> => {
      const { postRepository } = await useDependencies()
      return postRepository.getAll()
    }

    return {
      execute
    }

}


const useDependencies = async () => {
  const postRepository = await injectDependency<PostRepository>(import("@/core/post/infrastructure/localStoragePostRepository"));
  return { postRepository }
}