<template>
  <div class="animated-cursor" :class="{ 'show': showAnime, 'hold': holdForAnime }" :style="{ left: `${left}%`, top: `${top}%` }"></div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { round } from '../helpers'

export default defineComponent({
  setup() {
    let left = ref<number>(30)
    let top = ref<number>(30)
    let showAnime = ref<boolean>(false)
    let holdForAnime = ref<boolean>(false)

    document.addEventListener('mousedown', (e: MouseEvent) => {
      showAnime.value = true
      holdForAnime.value = true
    })
    document.addEventListener('mouseup', (e: MouseEvent) => {
      left.value = round(e.clientX / window.innerWidth * 100, 2)
      top.value = round(e.clientY / window.innerHeight * 100, 2)
      holdForAnime.value = false
    })

    return { left, top, showAnime, holdForAnime }
  },
})
</script>


<style scoped lang="scss">
.animated-cursor {
  position: absolute;
  width: 5px;
  height: 5px;
  background: #6A9BF9;
  color: #FFF;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: ripple 0.5s;
  pointer-events: none;
  opacity: 0;
  visibility: hidden;
  &.hold {
    display: none;
  }
  &.show {
    visibility: visible;
  }
  @keyframes ripple {
		0% {
			width: 5px;
			height: 5px;
			opacity: 0.6;
		}
		100% {
      width: 25px;
			height: 25px;
			opacity: 0;
		}
	}
}
</style>