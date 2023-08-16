<script lang="ts" setup>
import {data} from '~/composables/data.ts'
</script>

<template>
  <!-- grid of 4 columns -->
  <div class="grid grid-cols-5 gap-1 m-3 -mt-3">
    <div v-for="element in data" :key="element.path" class="bg-white p-3 flex flex-col gap-3 rounded">

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
