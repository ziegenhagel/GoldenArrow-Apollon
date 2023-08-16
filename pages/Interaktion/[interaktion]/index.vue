<template>
  <div class="h-screen flex flex-col items-center justify-center bg-gray-800">
    <div class="container">
      <div class="inner-circle" :style="{boxShadow: '0 0 300px ' + interaktionInfo.color}">
        <!-- Zentraler Kreis -->
      </div>
      <div class="outer-line">
        <div class="outer-line-container">
          <!-- Umgebender Kreis mit nur Linie -->
          <div
              v-for="index in [0, 1, 2]"
              :key="index"
              class="medium-circle"
              :style="positionMediumCircle(index)"
          >
            <!-- Drei weitere Kreise -->
            Center Text
          </div>
        </div>
      </div>
      <div class="container">
        <div class="inner-circle">
          <!-- Zentraler Kreis -->
          <v-icon :icon="interaktionInfo.icon" class="icon"/>
          <h1>{{ interaktionInfo.title }}</h1>
          <p class="max-w-sm opacity-70 text-center">Hier steht ein Fließtext - eine Erklärung der Interaktion auf klick der
            jeweiligen kreise.</p>
        </div>
        <div class="outer-line">
          <!-- Umgebender Kreis mit nur Linie -->
          <div
              v-for="index in [0, 1, 2]"
              :key="index"
              class="medium-circle text-white"
              :style="positionMediumCircle(index)"
          >
            <!-- Drei weitere Kreise -->
            Center Text
          </div>
        </div>
        <div class="image-container">
          <!-- Bilder um das Ganze -->
          <div
              v-for="(image, index) in images.slice(0, 6)"
              :key="image"
              :title="index"
              class="image-circle"
              :style="positionImage(index, images.slice(0, 6).length)"
          >
            <img :src="image" alt="Image"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {data} from '~/composables/data.ts'
import {interaktionen} from "~/composables/interaktionen";

const images = data.value.map((d) => d.path)

const positionImage = (index, totalImages) => {
  const radius = 400; // Radius für die Bilder
  const angle = (2 * Math.PI / totalImages) * index;
  const squeezeOffset = index == 0 || index == 1 || index == 5 ? 200 : -200;
  const x = 400 + radius * Math.cos(angle) - 25 + squeezeOffset; // Mitte + Radius
  const y = 400 + radius * .75 * Math.sin(angle) - 25;
  return `left: ${x}px; top: ${y}px;`;
};

const positionMediumCircle = (index) => {
  const radius = 300; // Radius für die mittleren Kreise
  const angle = (2 * Math.PI / 3) * index; // 3 Kreise, also 2 * PI / 3
  const x = 420 + radius * Math.cos(angle) - 75; // Mitte + Radius
  const y = 420 + radius * Math.sin(angle) - 75;
  return `left: ${x}px; top: ${y}px; background: ${interaktionInfo.color}`;
};

const route = useRoute()
const interaktion = route.params.interaktion
const interaktionInfo = interaktionen.find((i) => i.title === interaktion)
</script>

<style scoped>
.container {
  position: relative;
  width: 1000px;
  height: 1000px;
}

.inner-circle {
  @apply text-white flex flex-col items-center justify-center gap-4;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  position: absolute;
  left: 300px;
  top: 300px;

  .v-icon {
    @apply text-8xl;
  }

  h1 {
    @apply text-2xl;
  }
}

.outer-line {
  @apply border-gray-800/40 border-8;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  position: absolute;
  left: 200px;
  top: 200px;
  overflow: visible;
}

.outer-line-container {
  margin-left: -250px;
}

.medium-circle {
  width: 120px;
  height: 120px;
  transform: translate(-100%, -100%);
  border-radius: 50%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-container {
  transform: translate(100px, 100px);
  position: absolute;
  width: 100%;
}

.image-circle {
  width: 150px;
  height: 150px;
  transform: translate(-50%, -50%);
  aspect-ratio: 1/1;
  border: 8px solid white;
  overflow: hidden;
  border-radius: 50%;
  position: absolute;
}
</style>
