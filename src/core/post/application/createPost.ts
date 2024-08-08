import type { PostRepository } from '@/core/post/domain/PostRepository'
import { injectDependency } from '@/core/shared/infrastructure/dependencies/injectDependency'
import { TitleIsRequiredException } from '@/core/post/domain/exceptions/TitleIsRequiredException'
import { ContentIsRequiredException } from '@/core/post/domain/exceptions/ContentIsRequiredException'

export const createPost = () => {
  const execute = async (post: CreatePostDTO) => {
    validateCreatePostDTO(post)
    const { postRepository } = await useDependencies()
    await postRepository.create(post)
  }

  return {
    execute
  }
}

export type CreatePostDTO = {
  title: string;
  content: string;
}

const useDependencies = async () => {
  const postRepository = await injectDependency<PostRepository>(import("@/core/post/infrastructure/localStoragePostRepository"));
  return { postRepository }
}

const validateCreatePostDTO = (post: CreatePostDTO) => {
  if (!post.title) {
    throw new TitleIsRequiredException()
  }
  if (!post.content) {
    throw new ContentIsRequiredException()
  }
}


