import { describe, it, expect } from 'vitest';
import { getAllPosts } from '@/core/post/application/getAllPosts';
import type { PostRepository } from '../domain/PostRepository'
import { instance, mock, when } from 'ts-mockito'

describe('getAllPosts', () => {
  it('should return all posts', async () => {
    const { postRepository } = prepareTest();
    const getAllPostsInstance = getAllPosts(() => Promise.resolve({ postRepository }));

    const result = await getAllPostsInstance.execute();

    expect(result).toEqual([{
      id: '123e4567-e89b-12d3-a456-426614174000',
      title: 'Test Title',
      content: 'Test Content',
    }]);
  });

});

const prepareTest = () => {
  const mockPostRepository = mock<PostRepository>();
  when(mockPostRepository.getAll()).thenResolve([{
    id: '123e4567-e89b-12d3-a456-426614174000',
    title: 'Test Title',
    content: 'Test Content',
  }]);

  return {
    postRepository: instance(mockPostRepository),
  };
}