<template>
  <header class="block header">
    <img class="logo" src="../assets/image/star_of_life.png" alt="esclapius stick">
    <h1 class="main-title">COVID-19 臺灣疫情地圖</h1>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  
})
</script>

<style lang="scss" scoped>
.header {
  grid-area: header;
  display: flex;
  align-items: center;
  padding: 0 20px;
  background: transparent;
  border: none;
  font-weight: 300;
}
.logo {
  width: calc($header-height - 10px);
}
.main-title {
  margin: 0 0 0 10px;
  font-weight: 400;
  font-size: 28px;
}
</style>