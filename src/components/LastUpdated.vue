<template>
  <section class="block block-themed">
    <Loader v-if="!showBlock" />
    <div class="block-content" v-else>
      <h5 class="title">資料更新時間</h5>
      <span class="divider">：</span>
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
@media (max-width: 850px) {
  .block-themed {
    background: transparent;
    border: none;
    &:hover {
      background: transparent;
    }
  }
  .block-content {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    font-size: 14px;
  }
}
.title {
  margin: 0 0 5px 0;
  font-weight: 400;
  font-size: 0.8vw;
  @media (max-width: 1200px) {
    font-size: 14px;
  }
  @media (max-width: 850px) {
    margin: 0;
    font-size: 12px;
  }
}
.divider {
  display: none;
  @media (max-width: 850px) {
    display: block;
    font-size: 12px;
  }
}
.time {
  margin: 0;
  font-weight: 600;
  font-size: 1.2vw;
  white-space: nowrap;
  @media (max-width: 850px) {
    font-size: 12px;
  }
}
</style>