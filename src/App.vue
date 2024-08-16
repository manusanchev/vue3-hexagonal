<template>
  <div class="min-h-screen bg-gray-100">
    <RouterView />
    {{ result }}
    <button @click="getPosts">Socket</button>
  </div>

</template>
<script setup lang="ts">
import { inject, onMounted, ref } from 'vue'
import type { RealtimeClient } from '@/core/shared/domain/realtime/realtimeClient'

const result = ref('')

const socket = inject<RealtimeClient>('socket') as RealtimeClient

onMounted( () => {
   socket.subscribe('commentHasBeenCreated', (data: any) => {
    result.value = data;

  })
})

const getPosts = async () => {
  await fetch('http://localhost:8080/v1/comment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      postAuthorId: 1,
      comment: '123',
    }),
  })
};
</script>