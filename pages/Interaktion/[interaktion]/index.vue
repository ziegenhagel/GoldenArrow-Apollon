<template>
  <div class="h-screen flex flex-col items-center justify-center bg-gray-800">

    <nuxt-link to="/Explorationsmodus" class="exploration-menu w-24 h-24 top-12 left-0 absolute">
      <svg width="100%" height="100%" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"
           style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
        <circle class="btn-bgx" cx="-0.133" cy="0.144" r="49.685" :style="`fill:${interaktionInfo.color};`"/>
        <g>
          <circle cx="17.848" cy="12.286" r="6.031" style="fill:#9bac6a;"/>
          <circle cx="8.928" cy="26.691" r="6.031" style="fill:#808cb3;"/>
          <circle cx="35.378" cy="12.286" r="6.031" style="fill:#ae8fae;"/>
          <circle cx="26.457" cy="26.691" r="6.031" style="fill:#b8866a;"/>
        </g>
      </svg>
    </nuxt-link>

    <div
        :class="{'container': true, 'pulsating': selectedImageIndex !== null,  'not-pulsating': selectedImageIndex === null}">

      <div class="inner-circle" :style="{boxShadow: '0 0 300px ' + interaktionInfo.color}">
      </div>
      <div class="container">
        <div class="inner-circle">
          <v-icon :icon="interaktionInfo.icon" class="icon"/>
          <h1>{{ interaktionInfo.title }}</h1>
          <p class="w-80 opacity-70 text-center">
            Wählen Sie ein Bild, um Interaktionen in der Vorschau zu sehen.
          </p>
        </div>
        <div class="outer-line">
          <!-- Umgebender Kreis mit nur Linie -->

          <div
              v-for="(moon,index) in moons"
              :key="index"
              @drop.prevent="dropOnMoon(moon, index)"
              @dragover.prevent
              :class="{'medium-circle text-white moon': true, 'pulsate': enabledMoons.includes(moon)}"
              :style="positionMediumCircle(index)"
          >
            {{ moon }}
          </div>

        </div>
        <div class="image-container">
          <!-- Bilder um das Ganze -->
          <div
              v-for="(image, index) in images.slice(0, 6)"
              :key="image"
              draggable="true"
              @dragstart="dragStart(index)"
              @dragend="dragEnd"
              :title="index"
              :class="{'image-circle cursor-pointer': true, 'pulsate': selectedImageIndex === index}"
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

const selectedImageIndex = ref(null);
const enabledMoons = computed(() => {
  if (selectedImageIndex.value === null) return [];
  return data.value[selectedImageIndex.value].moons;
})

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
const moons = interaktionInfo.moons
const router = useRouter()

const openMoonPicture = (moon, picture) => {
  router.push(`/Interaktion/${interaktion}/${moon}/${picture}`)
}

let currentlyDraggingIndex = ref(null);

const dragStart = (index) => {
  currentlyDraggingIndex.value = index;
}

const dragEnd = () => {
  currentlyDraggingIndex.value = null;
}

const dropOnMoon = (moon, index) => {
  if (currentlyDraggingIndex.value !== null) {
    selectedImageIndex.value = currentlyDraggingIndex.value;
    openMoonPicture(moon, index);
  }
}

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

.moon {
  text-align: center;
  box-sizing: border-box;
  padding: 4em;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: blur(0);
  -webkit-filter: blur(0);
}

.not-pulsating .moon {
  filter: blur(30px);
  -webkit-filter: blur(30px);
  opacity: .4;
}

.pulsate {
  animation: pulsate 1s ease-out infinite;
}

.pulsating .image-circle, .pulsating .moon {
  transition: .4s;
}

.pulsating .image-circle:not(.pulsate), .pulsating .moon:not(.pulsate) {
  opacity: 0.3;
}

.image-circle, .moon.pulsate {
  transition: .2s;
  /* anchor for scaling */
  transform-origin: center center;
}

.image-circle:not(.pulsate):hover, .moon.pulsate:hover {
  scale: 1.05;
  cursor: pointer;
}

/*Helligkeit, Pulsieren*/
@keyframes pulsate {
  0% {
    box-shadow: 0 0 0 0px rgba(255, 255, 255, 0.4);
  }
  100% {
    box-shadow: 0 0 0 20px rgba(255, 255, 255, 0);
  }

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

.exploration-menu:hover {
  cursor: pointer;
}

.exploration-menu .btn-bgx {
  opacity: .1;
  transition: .3s;
}

.exploration-menu:hover .btn-bgx {
  opacity: .3;
}
</style>
