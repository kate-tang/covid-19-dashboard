<template>
  <section class="block last-updated">
    <h5 class="title">資料更新時間</h5>
    <p class="time">2022/6/23 下午7:20</p>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  
})
</script>

<style lang="scss" scoped>
.last-updated {
  grid-area: lastupdated;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.title {
  margin: 0;
  margin-bottom: 5px;
  font-weight: 400;
  font-size: 0.8vw;
}
.time {
  margin: 0;
  font-weight: 600;
  font-size: 1.2vw;
  white-space: nowrap;
}
</style>