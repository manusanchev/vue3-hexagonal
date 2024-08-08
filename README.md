# comenty

## Vue 3 functional approach to building projects with vue3 following the principles of hexagonal architecture.

### What is this for?
This project will be used as a template for new projects in the future, to build highly scalable applications. But at the moment is wip

### Can i contribute?
Yes, you can contribute to this project, just fork it and make a pull request, i will review it and merge it if it's good

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


## composables as use-cases for UI
I'm using composables to remove the dependency between the application layer and the presentation layer (framework), so i can use libraries such as vue-router and pinia without using them as infrastructure dependencies, frontend frameworks are difficult to update or upgrade if dependencies that belong to the framework end up decoupled in my infraestructure. `so I pay for this to avoid problems, trade-off`
