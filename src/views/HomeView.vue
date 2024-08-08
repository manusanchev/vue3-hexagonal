<script setup lang="ts">
import TextareaBase from '@/components/base/TextareaBase.vue'
import { reactive, ref } from 'vue'
import { useCreatePost } from '@/composables/usesCases/useCreatePost'
const form = reactive({
  title: '',
  content: ''
})

const errors = ref({
  title: '',
  content: ''
})

const submitForm = async () => {
  const { error } = await useCreatePost(form)
  errors.value = error

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
  </main>
</template>