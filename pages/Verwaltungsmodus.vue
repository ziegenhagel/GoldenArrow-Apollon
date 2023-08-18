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

  const draggedIndex = elements.value.indexOf(draggingElement.value);
  const targetIndex = elements.value.indexOf(targetElement);

  if (draggedIndex !== targetIndex) {
    const [removed] = elements.value.splice(draggedIndex, 1);
    elements.value.splice(targetIndex, 0, removed);
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

  const targetIndex = elements.value.indexOf(element);
  const draggedIndex = elements.value.indexOf(draggingElement.value);

  if (draggedIndex < targetIndex) {
    event.target.parentElement.classList.add('border-blue-400');
  } else {
    event.target.parentElement.classList.add('border-blue-400');
  }
};

const handleDragLeave = event => {
  event.target.parentElement.classList.remove('border-blue-400');
}

const toggleLock = (element) => {
  element.locked = !element.locked;
}

const highlightGroup = ref(null) // parent element of the group
const highlightGroupClasses = (element) => {
  if (highlightGroup.value === null) return {}
  return {
    'opacity-10 pointer-events-none': element.parent !== highlightGroup.value && element.id !== highlightGroup.value,
  }
}
const groupingEnabled = useState('groupingEnabled', () => false)
const elements = computed(() => {
  if (groupingEnabled.value && highlightGroup.value !== null)
    return data.value.filter((element) => element.parent === highlightGroup.value || element.id === highlightGroup.value)
  if (groupingEnabled.value)
    return data.value.filter((element) => element.parent === null)
  return data.value
})

const groupClicked = (element) => {
  // if the group is already highlighted, unhighlight it
  if (highlightGroup.value !== null) {
    highlightGroup.value = null
    return
  }

  if (element.parent === null) {
    highlightGroup.value = element.id;
  } else {
    highlightGroup.value = element.parent;
  }
}
const drawer = ref(false)
const sideSheetElement = ref(null)
const sideSheet = (element) => {
  drawer.value = !drawer.value
  sideSheetElement.value = element
}
</script>

<template>
  <v-layout>
    <v-navigation-drawer v-model="drawer" temporary location="end" width="400">
      <v-list-item v-if="sideSheetElement === null">
        <h2 class="text-2xl">Kein Element ausgewählt</h2>
      </v-list-item>
      <v-list-item v-else>
        <div class="flex flex-col gap-3 py-3">
          <h2 class="text-2xl font-bold">{{ sideSheetElement.title }}</h2>
          <p>{{ sideSheetElement.description }}</p>
          <img :src="sideSheetElement.path" class="w-full object-cover aspect-square rounded" alt="">
          <div class="flex flex-wrap gap-3 mt-2">
            <v-chip variant="outlined" v-for="moon in sideSheetElement.moons" :key="moon">{{
                moon
              }}
            </v-chip>
          </div>

          <!-- colored v-chips for  3D Zoom Enabled Slider -->
          <div class="flex gap-3 mt-2">
            <v-chip class="flex justify-center w-full" variant="flat" v-for="effect in [{title:'3D', color:'teal'}, {title:'Zoom', color:'pink'}, {title:'Enabled', color:'blue'}, {title:'Slider', color:'deep-orange'}]"
:key="effect.title" :color="effect.color">{{
                effect.title
              }}
            </v-chip>
          </div>

        </div>
      </v-list-item>
    </v-navigation-drawer>
  </v-layout>
  <div class="grid grid-cols-5 gap-1 m-3 mt-0">
    <div
        v-for="element in elements"
        :key="element.path"
        :class="{'bg-white p-3 flex element flex-col gap-3 rounded border-4': true, 'locked': element.locked, ...highlightGroupClasses(element)}"
        draggable="true"
        @dragstart="event => handleDragStart(event, element)"
        @drop="event => handleDrop(event, element)"
        @dragover="handleDragOver"
        @dragenter="event => handleDragEnter(event, element)"
        @dragleave="handleDragLeave"
    >
      <div class="items-center justify-center flex">
        &nbsp;
        <v-icon icon="mdi-group" v-if="element.grouped"
                @click="groupClicked(element)"
                :class="{'text-4xl':true, 'opacity-40': element.parent !== null}"></v-icon>
      </div>

      <img :src="element.path" class="w-full object-cover aspect-square rounded" alt="">

      <!-- left side have a lock open or closed, and right side an info icon -->
      <div class="flex justify-between">
        <v-icon icon="mdi-lock" v-if="element.locked" @click="toggleLock(element)"></v-icon>
        <v-icon icon="mdi-lock-open" v-else @click="toggleLock(element)"></v-icon>
        <v-icon icon="mdi-information-outline" @click="sideSheet(element)" class="text-2xl"></v-icon>
      </div>

    </div>
  </div>
</template>
<style scoped>
.locked {
}

.locked:hover {
  cursor: not-allowed;
}

.element {
  transition: .1s;
}

.element:not(.locked):hover {
  cursor: grab;
  border: 4px solid #a9a9a9;
}

/* later add green and red locks */
</style>

