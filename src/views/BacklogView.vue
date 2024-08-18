<template>
  <div class="pt-8 h-[80vh]">
    <div class="flex justify-center gap-x-4 h-full">
      <div v-for="column in columns" :key="column.id" :data-column-id="column.id" class="w-[20rem] bg-gray-200 rounded border border-gray-400 p-4" @drop="onDrop" @dragover="dragover" @dragenter="dragenter" @dragleave="dragleave">
        <p>{{ column.name }}</p>
        <div v-for="(task) in filteredTasks(column.id)" :key="task.id" class="mt-4 flex flex-col gap-y-1">
          <div class="h-1 bg-blue-600 rounded w-full opacity-0" :id="`top-${task.id}`" @dragleave="dragLeave"></div>
          <div :id="`${task.id}`" draggable="true" class="bg-gray-500 p-2 rounded-lg " @drop="(e) => onDrop(e, column.id)" @dragstart="dragstart" @dragend="dragend"  @dragover="(e) => dragEntere(e, task.id, column.id)">
            {{ task.name }}
          </div>
          <div class="h-1 bg-blue-600 rounded w-full opacity-0" :id="`bottom-${task.id}`" @dragleave="dragLeave"></div>
        </div>
      </div>
    </div>
  </div>

</template>
<script setup lang="ts">
import { ref } from 'vue'

const columns = ref([
  { id: 1, name: 'Backlog' },
  { id: 2, name: 'In Progress' },
  { id: 3, name: 'Review' },
  { id: 4, name: 'Done' }
])

const tasks = ref([
  { id: 1, name: 'Task 1', columnId: 1 },
  { id: 2, name: 'Task 2', columnId: 2 },
  { id: 3, name: 'Task 3', columnId: 3 },
  { id: 4, name: 'Task 4', columnId: 4 },
  { id: 5, name: 'Task 5', columnId: 4 }
])
const currentGhost =  ref("");
const currentTaskId = ref("");
const dragEntere = (e: DragEvent, taskId: number, columnId: number) => {
  const isSameTask = currentTaskId.value === String(taskId)
  if (isSameTask) return
  const rect = (e.target as HTMLDivElement).getBoundingClientRect()
  const mouseRect = {
    left: e.clientX - rect.width / 2,
    right: e.clientX + rect.width / 2,
    top: e.clientY - rect.height / 2,
    bottom: e.clientY + rect.height / 2
  };
  if (isCollision(mouseRect, rect)) {
    console.log('El área del mouse ha entrado en el elemento.');
    const elementoCentroY = rect.top + rect.height / 2;

    const posicionRespectoCentroY = e.clientY - elementoCentroY;

    if (posicionRespectoCentroY < 0) {
      console.log('El mouse se encuentra arriba del elemento.');
      document.getElementById(`top-${taskId}`)!.classList.remove('opacity-0')
      if (document.getElementById(`bottom-${taskId}`)) document.getElementById(`bottom-${taskId}`)!.classList.add('opacity-0')
      currentGhost.value = `top-${taskId}`
    }else {
      console.log('El mouse se encuentra abajo del elemento.');
      document.getElementById(`bottom-${taskId}`)!.classList.remove('opacity-0')
      if (document.getElementById(`top-${taskId}`)) document.getElementById(`top-${taskId}`)!.classList.add('opacity-0')
      currentGhost.value = `bottom-${taskId}`
    }
  } else {
    console.log('El área del mouse ha salido del elemento.');
  }
}
function isCollision(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.right > rect2.left &&
    rect1.top < rect2.bottom &&
    rect1.bottom > rect2.top
  );
}
const dragovere = (e: DragEvent, taskId: number, columnId: number, position: string) => {
  (e.target as HTMLDivElement).classList.remove('opacity-0')
  e.preventDefault()
}

const dragLeave = (e: DragEvent) => {
  (e.target as HTMLDivElement).classList.add('opacity-0')
}

const onDrop = (e: DragEvent, columnIdProp: number | undefined = undefined) => {
  // (e.target as HTMLDivElement).classList.remove('border-red-400')
  const columnId = columnIdProp ? columnIdProp : Number((e.target as HTMLDivElement).getAttribute('data-column-id'))
  if (!columnId) return
  const droppedTask = tasks.value.find(t => t.id === Number(e.dataTransfer!.getData('text/plain')))
  const referenceTask = currentGhost.value.split('-')
  console.log(referenceTask, columnId);
  const referencePosition = referenceTask[0]
  const referenceTaskId = referenceTask[1]

  const referenceTaskIndex = filteredTasks(columnId).findIndex(t => t.id === Number(referenceTaskId))
  const droppedTaskIndex = filteredTasks(columnId).findIndex(t => t.id === Number(droppedTask!.id))
  console.log(droppedTaskIndex, referenceTaskIndex)
  let newIndex = 0
  const isAdded = droppedTask!.columnId !== Number(columnId)
  if (isAdded) { // si es added
    // si es top -> el nuevo index será el referenceTasKINDEX - 1
    // si es bottom -> el nuevo index será el referenceTasKINDEX + 1
    newIndex = referencePosition === 'top' ? referenceTaskIndex - 1 : referenceTaskIndex + 1
  }

  if (!isAdded) { // si es moved
    // si es top -> el nuevo index será el referenceTasKINDEX - 1
    // si es bottom -> el nuevo index será el referenceTasKINDEX
    newIndex = referencePosition === 'top' ? referenceTaskIndex - 1 : referenceTaskIndex
  }
  const dropOperation = {
    [droppedTask!.columnId === Number(columnId) ? 'moved' : 'added']: {
      newIndex,
      oldIndex: droppedTask!.columnId !== Number(columnId) ? undefined : droppedTaskIndex,
      element: droppedTask
    },

  }
  console.log(dropOperation, columnId);
  onTaskMoved(dropOperation, Number(columnId))
  // tasks.value.find(t => t.id === Number(objectId))!.columnId = Number(columnId)
}

const onTaskMoved = (event: any, columnId: number) => {
  if (event.added) {
    console.log('added', event.added, columnId)
    const {element, newIndex } = event.added
    element.columnId = columnId
    const elementsFiltered = filteredTasks(columnId, element.id)
    elementsFiltered.splice(newIndex, 0, element)
    tasks.value = tasks.value.filter((task) => task.columnId !== columnId).concat(elementsFiltered)
  }

  if (event.moved) {
    const {element, oldIndex, newIndex } = event.moved
    const elementsFiltered = filteredTasks(columnId)
    elementsFiltered.splice(oldIndex, 1)
    elementsFiltered.splice(newIndex, 0, element)
    tasks.value = tasks.value.filter((task) => task.columnId !== columnId).concat(elementsFiltered)
  }
}

const filteredTasks = (columnId: number, omitTaskId = null) => tasks.value.filter((task) => task.columnId === columnId && (omitTaskId !== null  ? task.id !== omitTaskId : true))


const dragstart = (e: DragEvent) => {
  currentGhost.value = ''
  e.dataTransfer!.effectAllowed = 'move'
  e.dataTransfer!.dropEffect = 'move'
  const element = e.target as HTMLDivElement
  e.dataTransfer!.setData('text/plain', element.id)
  currentTaskId.value = element.id
  const width =element.offsetWidth;
  const height =element.offsetHeight;
  const elementCloned = element.cloneNode(true) as HTMLDivElement
  elementCloned.style.width = `${width}px`
  elementCloned.style.position = 'absolute'
  elementCloned.style.top = `-1000px`
  elementCloned.setAttribute('draggable-ghost-temp', "true")
  document.body.appendChild(elementCloned)
  e.dataTransfer!.setDragImage(elementCloned, width / 2.2, height / 2)


}

const dragend = (e: DragEvent) => {
  document.body.removeChild(document.querySelector('[draggable-ghost-temp]')!)
}

const dragover = (e: DragEvent) => {
  e.preventDefault()
}

const dragenter = (e: DragEvent) => {
  (e.target as HTMLDivElement).classList.add('border-red-400')
}

const dragleave = (e: DragEvent) => {
  (e.target as HTMLDivElement).classList.remove('border-red-400')
}
</script>