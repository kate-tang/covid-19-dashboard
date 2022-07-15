<template>
  <header class="block">
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
.logo {
  width: calc(var(--header-height) - 10px);
}
.main-title {
  margin: 0 0 0 10px;
  font-weight: 400;
  font-size: 28px;
  white-space: nowrap;
  @media (max-width: 850px) {
    font-size: 26px;
  }
  @media (max-width: 650px) {
    font-size: 24px;
  }
  @media (max-width: 500px) {
    font-size: 22px;
  }
  @media (max-width: 400px) {
    font-size: 20px;
  }
}
</style>