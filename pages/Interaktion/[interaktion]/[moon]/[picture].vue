<script setup>
import {data} from '~/composables/data.ts'
import {interaktionen} from "~/composables/interaktionen";

const images = data.value.map((d) => d.path)
const route = useRoute()
const interaktion = route.params.interaktion
const interaktionInfo = interaktionen.find((i) => i.title === interaktion)
</script>

<template>
  <div class="h-screen bg-gray-800 -mt-16 overflow-hidden absolute w-full">

    <nuxt-link :to="`/Interaktion/${interaktion}`"
               class="exploration-menu w-24 h-24 top-12 left-0 absolute">
      <svg width="100%" height="100%" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"
           style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
        <circle class="btn-bgx" cx="-0.133" cy="0.144" r="49.685" style="fill:#fff;"/>
        <circle cx="13.691" cy="13.856" r="7.6" :style="`fill:${interaktionInfo.color};`"/>
        <circle cx="21.283" cy="28.761" r="5.149" :style="`fill:${interaktionInfo.color};`"/>
        <circle cx="29.797" cy="17.296" r="3.724" :style="`fill:${interaktionInfo.color};`"/>
      </svg>

    </nuxt-link>

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

&
:hover {
  scale: 1.05;
}

&
.share {
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

.exploration-menu {
  @apply absolute top-0;
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

