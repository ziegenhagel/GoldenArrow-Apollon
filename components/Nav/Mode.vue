<template>
  <div class="w-full p-4 flex h-16 bg-gray-200 justify-end">
    <!-- have on the left the button Gruppieren on the right the switch betweeen Verwaltungsmodus and Explorationsmodus -->
    <v-btn
        v-if="mode=== 'Verwaltungsmodus'"
        :prepend-icon="groupingEnabled? 'mdi-ungroup' : 'mdi-group'"
        variant="flat"
        color="grey-darken-2"
        @click="toggleGrouping"
    >{{ groupingEnabled ? 'Gruppieren' : 'Separieren' }}
    </v-btn>

    <!-- spacer -->
    <div class="flex-1"></div>

    <!-- toggel between Verwaltungsmodus and Explorationsmodus -->
    <v-btn
        v-if="mode === 'Verwaltungsmodus'"
        @click="router.push('/Explorationsmodus')"
        append-icon="mdi-compass"
        color="blue-grey"
        text="Explorationsmodus"
    />
    <v-btn
        v-if="mode === 'Explorationsmodus'"
        @click="router.push('/Verwaltungsmodus')"
        append-icon="mdi-compass-off"
        color="grey-darken-2"
        text="Verwaltungsmodus"
    />
  </div>
</template>

<script setup>
const router = useRouter()
const mode = computed(() => router.currentRoute.value.path === '/Verwaltungsmodus' ? 'Verwaltungsmodus' : router.currentRoute.value.path === '/Explorationsmodus' ? 'Explorationsmodus' : 'Unbekannter Modus')
const groupingEnabled = ref(false)
const toggleGrouping = () => {
  groupingEnabled.value = !groupingEnabled.value
  console.log('toggle grouping')
}
</script>
