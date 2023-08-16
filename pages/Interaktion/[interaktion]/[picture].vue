<script setup>
import {data} from '~/composables/data.ts'
import {interaktionen} from "~/composables/interaktionen";

const images = data.value.map((d) => d.path)
const route = useRoute()
const interaktion = route.params.interaktion
const interaktionInfo = interaktionen.find((i) => i.title === interaktion)
</script>

<template>


  <div class="h-screen bg-gray-800 overflow-hidden absolute w-full">

    <div class="side-icons">
      <div></div>
      <div class="info" :style="`background: ${interaktionInfo.color}`">
        <v-icon icon="mdi-information-outline" class="text-2xl"></v-icon>
      </div>
      <div class="share" :style="`background: ${interaktionInfo.color}`">
        <v-icon icon="mdi-share-variant" class="text-2xl"></v-icon>
      </div>
    </div>

    <div class="big-container " :style="`background: ${interaktionInfo.color}`">
      <h1 class="text-white text-2xl text-center">Separater Slider</h1>
      <div class="object-container">
        <img :src="images[0]" class="" alt="">
      </div>
    </div>
  </div>

</template>

<style scoped>
.side-icons {
  position: absolute;
  z-index: 99;
  height: 100%;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

.side-icons > .share, .side-icons > .info {
  width: 150px;
  border-radius: 50%;
  margin-right: -75px;
  aspect-ratio: 1;
  color: white;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  cursor: pointer;
  align-items: center;
  padding-right: 60px;
  &:hover {
    scale: 1.05;
  }

  &.share {
    margin-bottom: -75px;
    padding-bottom: 60px;
  }
}

.big-container {
  border-radius: 50%;
  height: 120vh;
  margin: -10vh auto auto;
  box-sizing: border-box;
  padding: 10%;
  overflow: hidden;
  aspect-ratio: 1;

  .object-container {
    height: 70vh;
    margin: 5%;
    display: block;

    img {
      height: 100%;
      border: 7px solid white;
      border-radius: 5px;
      margin: 0 auto;
    }
  }

  h1 {
    font-size: 2.5em;
  }
}
</style>
