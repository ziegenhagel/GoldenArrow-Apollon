<template>
  <nuxt-link class="container text-white hover-circle" :to="`/Interaktion/${title}`">
    <div class="circle" :style="{backgroundColor: color, boxShadow: `0 0 80px ${color}` }">
      <v-icon :icon="icon" class="icon"/>
      <h1>{{ title }}</h1>
    </div>
    <div class="image-container">
      <div
          v-for="(image, index) in images.slice(0, 6)"
          :key="image"
          class="image-circle bg-gray-400 border-4 border-white"
          :style="positionImage(index, images.slice(0, 6).length)"
      >
        <img :src="image.path" alt="Image"
             class="object-cover w-full h-full rounded-full"/>

        <!-- have a group icon on the image if it is grouped -->
        <v-icon icon="mdi-group" v-if="image.grouped" size="16"
                class="text-black bg-white rounded-full p-3 border-white -mt-32 ml-8"></v-icon>
      </div>
    </div>
  </nuxt-link>
</template>

<script setup>
const props = defineProps({
  title: String,
  icon: String,
  color: String,
  images: Array,
})

const radius = 200;

const positionImage = (index, totalImages) => {
  const angle = (2 * Math.PI / totalImages) * index;
  const x = 150 + radius * Math.cos(angle) - 25; // 25 ist die Hälfte der Breite und Höhe des Bildes
  const y = 150 + radius * Math.sin(angle) - 25; // 25 ist die Hälfte der Breite und Höhe des Bildes
  return `left: ${x}px; top: ${y}px;`;
};
</script>

<style scoped>
.container {
  position: relative;
  width: 400px;
  height: 400px;
}

.circle {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: absolute;
  left: 50px;
  top: 50px;

  h1 {
    font-size: 1.5rem;
  }
}

.hover-circle .circle{
  transition: all 0.1s ease-out;
}
.hover-circle:hover .circle{
  scale: 1.04;
}

.icon {
  font-size: 4rem;
}


.image-container {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  margin-left: 45px;
  margin-top: 45px;
  align-items: center;
  justify-content: center;
}

.image-circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  position: absolute;
}
</style>
