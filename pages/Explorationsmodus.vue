<script lang="ts" setup>
import {data} from '~/composables/data.ts'
</script>

<template>
  <div class="inset-0 absolute flex flex-col items-center justify-center bg-gray-800">
    <Planet
        title="Vergrößern"
        icon="mdi-magnify"
        color="#97AD61"
        :images="data"
    />
  </div>
</template>

<style scoped></style>
