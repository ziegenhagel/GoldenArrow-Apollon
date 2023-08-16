<template>
  <div class="w-full p-1 flex h-12">

<!--    <v-btn-toggle v-model="mode" color="blue-grey" mandatory>-->
<!--      <v-btn icon="mdi-view-gallery" size="2.5em"/>-->
<!--      <v-btn icon="mdi-compass" size="2.5em"/>-->
<!--    </v-btn-toggle>-->

    <div class="flex-1 flex items-center">
      <h1 class="text-xl mx-auto font-semibold">Projekt / Thema</h1>
    </div>
    <div class="flex items-center gap-2">
      <v-btn
          @click="router.push('/Einstellungen')"
          icon="mdi-cog"
          density="comfortable"
      />
    </div>
  </div>
</template>

<script setup>
const router = useRouter()
const route = useRoute()
const mode = ref(route.path.startsWith('/Verwaltungsmodus') ? 0 : 1)
watch(mode, () => {
  if (mode.value === 0) {
    router.push('/Verwaltungsmodus')
  } else {
    router.push('/Explorationsmodus')
  }
})
watch(() => route.path, () => {
  if (route.path.startsWith('/Verwaltungsmodus')) {
    mode.value = 0
  } else {
    mode.value = 1
  }
})
</script>