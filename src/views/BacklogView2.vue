<template>
  <div class="pt-8 h-[80vh]">
    <div class="flex justify-center gap-x-4 h-full w-full">
      <div v-for="column in columns" :key="column.id" class="w-[20rem] bg-gray-200 rounded border border-gray-400 p-4">
        {{ column.name }}
        <DragItem v-for="task in column.tasks" :key="task.id" :task="task" :columnId="column.id" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import DragItem from '@/components/base/DragItem.vue'
import {monitorForElements} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { reorderWithEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge';
import {
  extractClosestEdge,
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
onMounted(() => {
  monitorForElements({
    // onDragStart: (e) => console.log('Dragging an element', e),
    onDrop({ location, source }) {
      const target = location.current.dropTargets[0];
      if (!target) {
        return;
      }
      const sourceData = source.data;
      const targetData = target.data;

      const closestEdgeOfTarget = extractClosestEdge(targetData);
      const tasks = tasksByColumn(Number(targetData.columnId))
      const indexOfSource = tasks.findIndex(task => task.id === Number(sourceData.taskId))
      const indexOfTarget = tasks.findIndex(task => task.id === Number(targetData.taskId))
       const columnTasks = reorderWithEdge({
          list: tasks,
          startIndex: indexOfSource,
          indexOfTarget,
          closestEdgeOfTarget,
          axis: 'vertical',
        })
      console.log("columnTasks", columnTasks)
      // columns.value = columns.value.find(col => col.id === Number(targetData.columnId))!.tasks = columnTasks
      // const finishIndex = columns.value.findIndex(col => col.id === dropTargetTaskId)!
      // const startIndex = columns.value.findIndex(col => col.id === dropTargetColumnId)!
      //
      // columns.value = reorder({
      //   list: columns.value,
      //   startIndex,
      //   finishIndex
      // })
    }
  });
})

const tasksByColumn = (columnId: number) => columns.value.find((task) => task.id === columnId)!.tasks



const columns = ref([
  { id: 1, name: 'Backlog', tasks: [ { id: 1, name: 'Task 1', columnId: 1 }, { id: 2, name: 'Task 2', columnId: 1 }] },
  { id: 2, name: 'In Progress', tasks: [ { id: 3, name: 'Task 3', columnId: 2 }, { id: 4, name: 'Task 4', columnId: 2 }] },
  { id: 3, name: 'Review', tasks: [ { id: 5, name: 'Task 5', columnId: 3 }, { id: 6, name: 'Task 6', columnId: 3 }] },
  { id: 4, name: 'Done', tasks: [ { id: 7, name: 'Task 7', columnId: 4 }, { id: 8, name: 'Task 8', columnId: 4 }] }
])

</script>