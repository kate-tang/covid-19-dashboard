<template>
  <section class="block block-themed">
    <Loader v-if="!showBlock" />
    <div class="block-content" v-else>
      <h5 class="title">資料更新時間</h5>
      <p class="time">{{ updatedTime }}</p>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import Loader from './Loader.vue'
import store from '../store'

export default defineComponent({
  components: { Loader },
  setup(){
    let showBlock = ref<boolean>(false)
    let updatedTime = ref<string>('')
    
    watch(() => store.state.updatedTime, () => {
      updatedTime.value = new Date(store.state.updatedTime).toLocaleString()
      showBlock.value = true
    })

    return { showBlock, updatedTime }
  }
})
</script>

<style lang="scss" scoped>
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