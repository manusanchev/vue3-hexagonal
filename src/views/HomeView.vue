<script setup lang="ts">
import TextareaBase from '@/components/base/TextareaBase.vue'
import { computed, onBeforeMount, reactive, ref } from 'vue'
import { useCreatePost } from '@/composables/usesCases/post/useCreatePost'
import { usePostStore } from '@/stores/posts'
import { useGetAllPosts } from '@/composables/usesCases/post/useGetAllPosts'
const initialState = {
  title: '',
  content: ''
};

const form = reactive({ ...initialState })
const errors = ref({ ...initialState })

const postStore = usePostStore();

onBeforeMount(async () => {
  await useGetAllPosts()
})
const posts = computed(() => postStore.posts)

const submitForm = async () => {
  const { error } = await useCreatePost(form)
  if (!error) {
    resetForm();
    return;
  }
  errors.value = error
}

const resetForm = () => {
  Object.assign(form, initialState);
  Object.assign(errors.value, initialState);
}
</script>

<template>
  <main>
    <form class="max-w-2xl mx-auto pt-4 flex flex-col" @submit.prevent="submitForm">
      <button type="submit" class="bg-black py-2 px-4 rounded-lg self-end text-sm text-white mb-4 max-w-fit hover:bg-gray-900 transition-all">Enviar</button>
      <div class="px-4 py-2 bg-white rounded-xl max-w-2xl flex flex-col">
        <input v-model="form.title" type="text" class="px-2 focus:outline-none font-bold text-2xl" placeholder="Escribe tu titulo">
       <span v-if="errors?.title">{{errors.title}}</span>
        <TextareaBase v-model="form.content" class=" mt-4"/>
        <span v-if="errors?.content">{{errors.content}}</span>
      </div>
    </form>
    <div v-for="post in posts" :key="post.id">
      {{post.title}}
      {{post.content}}
    </div>
  </main>
</template>