# comenty

## Vue 3 functional approach to build projects with vue3 following the principles of the hexagonal architecture.

### What is this for?
This project will be used as a template for new projects in the future, to build highly scalable applications. But for the moment it is wip

### Can I contribute?
Yes, you can contribute to this project, just make a fork and make a pull request, I will review it and merge it if it is good.

### Why not use a dependency injection container?
The problem with inversify or other npm dependency injection modules is that you have to register all your dependencies in the container at the start of your application, so you have to load all the modules at the beginning, even if you don't need them, so it becomes a performance issue.
### Dependency injection
I'm not using a dependency injection container, so instead, I'm using dynamic imports within my repositories and my use cases to improve performance and testability in a functional and modern way

I resolve the dependency using the injectDenpendency function typed with the generic dependency type
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

so I load the repository only when I need it. This is just an example, I can use a lot of modules like loggers and more....

### composables as use cases for UI
I am using composables to remove the dependency between the application layer and the UI layer (framework), so I can use libraries like vue-router and pinia without using them as infrastructure dependencies, frontend frameworks are hard to update or upgrade if the dependencies that belong to the framework end up decoupled in my infrastructure. So I pay for this to avoid problems, trade-off.