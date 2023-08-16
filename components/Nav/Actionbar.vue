<template>
  <div class="w-full p-4 flex">
    <!-- have the title center and a settings icon on the right -->
    <div class="flex-1 flex items-center">
      <h1 class="text-2xl font-bold">Projekt / Thema</h1>
    </div>
    <div class="flex items-center gap-2">
      <v-btn
          @click="router.push('/Einstellungen')"
          icon="mdi-cog"
      />
    </div>
  </div>
</template>
