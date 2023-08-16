<template>
  <div class="w-full p-4 flex h-12 bg-white">
    <!-- have the title center and a settings icon on the right -->
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
