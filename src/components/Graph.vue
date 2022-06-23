<template>
  <section class="block graph">
    <div class="image"></div>
    <div class="image"></div>
    <div class="image"></div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  
})
</script>

<style lang="scss" scoped>
.graph {
  grid-area: graph;
}
.image {
  width: 100%;
  height: 33%;
  background: pink;
  & + & {
    margin-top: 10px;
  }
}
</style>