import type { PostRepository } from '@/core/post/domain/PostRepository'
import { injectDependency } from '@/core/shared/infrastructure/dependencies/injectDependency'
import { TitleIsRequiredException } from '@/core/post/domain/exceptions/TitleIsRequiredException'
import { ContentIsRequiredException } from '@/core/post/domain/exceptions/ContentIsRequiredException'
import type { Post } from '@/core/post/domain/Post'
import type { UuidGenerator } from '@/core/shared/domain/uuidGenerator'
export const createPost = (dependencies = useDependencies) => {
  const execute = async (post: CreatePostDTO): Promise<Post> => {
    validateCreatePostDTO(post)
    const { postRepository, uuidGenerator } = await dependencies()
    const id = uuidGenerator.generate();
    const postToCreate = { ...post, id }
    await postRepository.create(postToCreate)
    return postToCreate;
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
  const uuidGenerator = await injectDependency<UuidGenerator>(import("@/core/shared/infrastructure/generator/uuidV4Generator"));
  return { postRepository, uuidGenerator }
}

const validateCreatePostDTO = (post: CreatePostDTO) => {
  if (!post.title) {
    throw new TitleIsRequiredException()
  }
  if (!post.content) {
    throw new ContentIsRequiredException()
  }
}


