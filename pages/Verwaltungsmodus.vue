<script lang="ts" setup>
import {data} from '~/composables/data.ts';

const draggingElement = ref(null);

const handleDragStart = (event, element) => {
  draggingElement.value = element;
  event.dataTransfer.effectAllowed = 'move';
};

const handleDrop = (event, targetElement) => {
  // remove all the drag styling
  event.target.parentElement.classList.remove('border-blue-400');
  if (!draggingElement.value) return;

  const draggedIndex = data.value.indexOf(draggingElement.value);
  const targetIndex = data.value.indexOf(targetElement);

  if (draggedIndex !== targetIndex) {
    const [removed] = data.value.splice(draggedIndex, 1);
    data.value.splice(targetIndex, 0, removed);
  }

  draggingElement.value = null;
};

const handleDragOver = event => {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
};

const handleDragEnter = (event, element) => {
  if (draggingElement.value === element) {
    return;
  }

  const targetIndex = data.value.indexOf(element);
  const draggedIndex = data.value.indexOf(draggingElement.value);

  if (draggedIndex < targetIndex) {
    event.target.parentElement.classList.add('border-blue-400');
  } else {
    event.target.parentElement.classList.add('border-blue-400');
  }
};

const handleDragLeave = event => {
  event.target.parentElement.classList.remove('border-blue-400');
};
</script>

<template>
  <div class="grid grid-cols-5 gap-1 m-3 mt-0">
    <div
        v-for="element in data"
        :key="element.path"
        class="bg-white p-3 flex flex-col gap-3 rounded border-4 border-white"
        draggable="true"
        @dragstart="event => handleDragStart(event, element)"
        @drop="event => handleDrop(event, element)"
        @dragover="handleDragOver"
        @dragenter="event => handleDragEnter(event, element)"
        @dragleave="handleDragLeave"
    >
      <div class="items-center justify-center flex">
        &nbsp;
        <v-icon icon="mdi-group" v-if="element.grouped" class="text-4xl"></v-icon>
      </div>

      <img :src="element.path" class="w-full object-cover aspect-square rounded" alt="">

      <!-- left side have a lock open or closed, and right side an info icon -->
      <div class="flex justify-between">
        <v-icon icon="mdi-lock-open" v-if="element.locked" class="text-2xl"></v-icon>
        <v-icon icon="mdi-lock" v-else class="text-2xl"></v-icon>
        <v-icon icon="mdi-information-outline" class="text-2xl"></v-icon>
      </div>

    </div>
  </div>
</template>

