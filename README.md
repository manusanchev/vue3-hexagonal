# comenty

## Vue 3 functional approach to building projects with vue3 following the principles of hexagonal architecture.
### ¿Why not using a dependency injection container?
The problem with inversify or others dependency injection npm modules is that you have to register all your dependencies in the container at the start of your application, so you have to load all modules at first, even if you don't need them, so it's become a performance issue
### Dependency injection
I'm not using a dependency injection container, so instead, i'm using dynamic imports inside my repositories and my use cases to improve performance and testability in a functional and modern way

i resolve the dependency using the injectDenpendency function typed with the generic type of the dependency
```js


const useDependencies = async () => {
  const postRepository = await injectDependency<PostRepository>(import("@/core/post/infrastructure/localStoragePostRepository"));
  return { postRepository }
}

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
```

so i loaded the repository only when i need it. This is only an example, i can use a bunch of modules such as loggers and more...