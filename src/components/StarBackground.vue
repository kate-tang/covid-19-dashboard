<template>
  <canvas class="star" id="canvas" @click.prevent @mousedown.prevent @mouseup.prevent></canvas>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import Starback from 'starback'

export default defineComponent({
  setup() {
    onMounted(() => {
      const canvas = document.getElementById('canvas') as HTMLCanvasElement

      new Starback(canvas, {
        type: 'dot',
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: 'transparent',
        quantity: window.innerWidth * window.innerHeight / 8000,
        starSize: [0,2],
        direction: 135,
        randomOpacity: true,
      })
    })
  },
})
</script>

<style lang="scss" scoped>
.star {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  user-select: none;
}
</style>