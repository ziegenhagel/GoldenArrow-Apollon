<template>
  <div class="container text-white">
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
      </div>
    </div>
  </div>
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
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
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
