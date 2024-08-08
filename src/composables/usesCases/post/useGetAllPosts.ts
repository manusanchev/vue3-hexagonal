import { usePostStore } from '@/stores/posts'
import { getAllPosts } from '@/core/post/application/getAllPosts'
export const useGetAllPosts = async () => {
    const { execute } = await getAllPosts()
    const postsStore = usePostStore()
    const posts = await execute()
    postsStore.addPosts(posts)
}