<template>
  <textarea v-model="model" class="resize-none p-2 focus:outline-none" placeholder="En que estas pensando?"></textarea>
</template>

<script setup lang="ts">
const model = defineModel()

</script>
<style scoped>
textarea {
  field-sizing: content;
}
</style>