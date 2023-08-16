<script lang="ts" setup>
import {data} from '~/composables/data.ts'
import {interaktionen} from '~/composables/interaktionen.ts'

</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-800">
    <div class="flex gap-60 ml-80">
      <Planet
          v-bind="interaktionen[0]"
          :images="data"
      />
      <Planet
          v-bind="interaktionen[1]"
          :images="data"
      />
    </div>
    <div class="flex gap-60 -ml-80">
      <Planet
          v-bind="interaktionen[2]"
          :images="data"
      />
      <Planet
          v-bind="interaktionen[3]"
          :images="data"
      />
    </div>
  </div>
</template>

<style scoped></style>
