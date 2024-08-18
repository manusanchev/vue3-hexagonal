<template>
  <div>
    <div class="h-1 bg-blue-600 rounded w-full mb-1" :class="{'opacity-1': edge === 'top', 'opacity-0': edge === 'bottom' || edge === ''}"></div>
    <div ref="reference" class="p-2 bg-gray-400 border border-gray-500 ">{{task.name}}</div>
    <div class="h-1 bg-blue-600 rounded w-full mt-1" :class="{'opacity-0': edge === 'top' || edge === '', 'opacity-1': edge === 'bottom'}"></div>

  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { draggable, dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import {
  attachClosestEdge,
  extractClosestEdge,
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';

const edge = ref('')
const props =defineProps({
  task: {
    type: Object,
    required: true
  },
  columnId: {
    type: Number,
    required: true
  }
})

const reference = ref<HTMLDivElement | null>(null)
onMounted(() => {
  draggable({
    element: reference.value as HTMLElement,
    getInitialData: () => ({ taskId: props.task.id, columnId: props.columnId }),
  })

  dropTargetForElements({
    element: reference.value as Element,
    getData: ({input}) => {
      return attachClosestEdge({ taskId: props.task.id, columnId: props.columnId }, {
        element: reference.value as HTMLElement,
        input,
        allowedEdges: ['top', 'bottom'],
      })
    },
    onDrag: ({self}) => {
      const closestEdge = extractClosestEdge(self.data);
      if (closestEdge === edge.value) return edge.value;
      edge.value = closestEdge as string;
    },
    onDragLeave: () => {
      edge.value = ''
    },
    onDrop: () => {
      edge.value = ''
    }
  });
})
</script>