<template>
  <NavActionbar :class="[mode === 'Verwaltungsmodus' ? 'bg-white':'bg-gray-700 text-white']"/>
  <div :class="[mode === 'Verwaltungsmodus' ? 'bg-gray-200':'bg-gray-800','top-32 min-h-screen']">
    <NavMode/>
    <slot/>
  </div>
</template>
<script setup lang="ts">
const route = useRoute()
// if route startswith /Verwaltungsmodus
const mode = computed(()=>route.path.startsWith('/Verwaltungsmodus') ? 'Verwaltungsmodus' : 'Explorationsmodus')
</script>
