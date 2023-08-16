<script lang="ts" setup>
import {data} from '~/composables/data.ts'
</script>

<template>
  <div class="inset-0 absolute flex flex-col items-center justify-center bg-gray-800">
    <div class="flex gap-60 ml-80">
      <Planet
          title="Vergrößern"
          icon="mdi-magnify"
          color="#97AD61"
          :images="data"
      />
      <Planet
          title="Fokussieren"
          icon="mdi-gesture-tap"
          color="#B48DB0"
          :images="data"
      />
    </div>
    <div class="flex gap-60 -ml-80">
      <Planet
          title="Verknüpfung"
          icon="mdi-trending-up"
          color="#7D8DB6"
          :images="data"
      />
      <Planet
          title="Vergleichen"
          icon="mdi-flip-horizontal"
          color="#C18365"
          :images="data"
      />
    </div>
  </div>
</template>

<style scoped></style>
