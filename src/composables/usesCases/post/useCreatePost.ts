import { createPost, type CreatePostDTO } from '@/core/post/application/createPost'
import type { composableParent } from '@/composables/composableParent'
import { TitleIsRequiredException } from '@/core/post/domain/exceptions/TitleIsRequiredException'
import { ContentIsRequiredException } from '@/core/post/domain/exceptions/ContentIsRequiredException'
import { usePostStore } from '@/stores/posts'

export const useCreatePost = async (post: CreatePostDTO): Promise<composableParent> => {
  const { execute } = createPost()

  const postStore = usePostStore()
  try {
    const postCreated = await execute(post)
    postStore.addPost(postCreated)
    return { data: null, error: null }
  } catch (error) {
    const handledError = handleCreatePostError(error)
    return {
      error: handledError,
      data: null
    }
  }
}

const handleCreatePostError = (error: any): CreatePostDTO => {
  const errorResult = { title: '', content: '' }
  if (error instanceof TitleIsRequiredException) {
    errorResult.title = 'El campo titulo es requerido'
  }
  if (error instanceof ContentIsRequiredException) {
    errorResult.content = 'El campo contenido es requerido'
  }
  return errorResult
}
