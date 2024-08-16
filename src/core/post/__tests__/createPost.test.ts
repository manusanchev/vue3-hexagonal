import { describe, it, expect } from 'vitest';
import { createPost } from '@/core/post/application/createPost';
import { TitleIsRequiredException } from '@/core/post/domain/exceptions/TitleIsRequiredException';
import { ContentIsRequiredException } from '@/core/post/domain/exceptions/ContentIsRequiredException';
import { mock, instance, when, anything } from 'ts-mockito';
import type { PostRepository } from '@/core/post/domain/PostRepository';
import type { UuidGenerator } from '../../shared/domain/generator/uuidGenerator';

describe('createPost', () => {
  it.concurrent('should created a post and return it', async () => {
    const { postRepository, uuidGenerator } = createMocks();

    const createPostInstance = createPost(() => Promise.resolve({ postRepository, uuidGenerator }));

    const postDTO = {
      title: 'Test Title',
      content: 'Test Content',
    };

    const result = await createPostInstance.execute(postDTO)

    expect(result).toEqual({
      ...postDTO,
      id: '123e4567-e89b-12d3-a456-426614174000',
    });
  });

  it.concurrent('should throw TitleIsRequiredException if title is missing', async () => {
    const { postRepository, uuidGenerator } = createMocks();
    const createPostInstance = createPost(() => Promise.resolve({ postRepository, uuidGenerator }));

    const postDTO = {
      title: '',
      content: 'Test Content',
    };

    await expect(createPostInstance.execute(postDTO)).rejects.toThrow(TitleIsRequiredException);
  });

  it.concurrent('should throw ContentIsRequiredException if content is missing', async () => {
    const { postRepository, uuidGenerator } = createMocks();
    const createPostInstance = createPost(() => Promise.resolve({ postRepository, uuidGenerator }));

    const postDTO = {
      title: 'Test Title',
      content: '',
    };

    await expect(createPostInstance.execute(postDTO)).rejects.toThrow(ContentIsRequiredException);
  });
});


const createMocks = () => {
  const mockPostRepository = mock<PostRepository>();
  const mockUuidGenerator = mock<UuidGenerator>();

  when(mockUuidGenerator.generate()).thenReturn('123e4567-e89b-12d3-a456-426614174000');
  when(mockPostRepository.create(anything())).thenResolve();

  return {
    postRepository: instance(mockPostRepository),
    uuidGenerator: instance(mockUuidGenerator),
  };
};
