<template xmlns="http://www.w3.org/1999/html">
  <div class="w-full p-3 flex h-16 items-center bg-gray-200 justify-end">
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
    <div class="flex-1">
      <v-btn v-if="mode === 'Explorationsmodus' && interaktion !== 'Keine Interaktion'"
             prepend-icon="mdi-chevron-left"
             variant="flat" color="blue-grey"
             :text="interaktion"
             @click="$router.go(-1)"
      />
    </div>

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
const mode = computed(() => router.currentRoute.value.path.startsWith('/Verwaltungsmodus') ? 'Verwaltungsmodus' : router.currentRoute.value.path.startsWith('/Explorationsmodus') || router.currentRoute.value.path.startsWith('/Interaktion') ? 'Explorationsmodus' : 'Unbekannter Modus')
const interaktion = computed(() => router.currentRoute.value.path.startsWith('/Interaktion') ? router.currentRoute.value.path.split('-')[1] : 'Keine Interaktion')
const groupingEnabled = ref(false)
const toggleGrouping = () => {
  groupingEnabled.value = !groupingEnabled.value
  console.log('toggle grouping')
}
</script>
