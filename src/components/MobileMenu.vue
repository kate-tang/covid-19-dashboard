<template>
  <div class="mobile-menu">
    <ul class="list">
      <li class="list-item" :class="{ 'active': $store.state.mobileMenuTab === 'domesticstat' }" @click="switchBlock('domesticstat')">國內數據</li>
      <li class="list-item" :class="{ 'active': $store.state.mobileMenuTab === 'map' }" @click="switchBlock('map')">地方動態</li>
      <li class="list-item" :class="{ 'active': $store.state.mobileMenuTab === 'graph' }" @click="switchBlock('graph')">圖表分析</li>
      <li class="list-item" :class="{ 'active': $store.state.mobileMenuTab === 'worldstat' }" @click="switchBlock('worldstat')">各國統計</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import { Block } from '../types'

export default defineComponent({
  setup() {
    const store = useStore()

    function switchBlock(block: Block){
      store.commit('setMobileMenuTab', block)
    }

    return { switchBlock }
  },
})
</script>

<style scoped lang="scss">
.list {
  display: flex;
  justify-content: space-evenly;
  list-style: none;
  height: 100%;
  margin: 0;
  padding: 0;
}
.list-item {
  flex: 25%;
  padding: 0 3px;
  border: 1px solid $border-color;
  font-size: 16px;
  text-align: center;
  line-height: $mobile-menu-height;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  &:first-child {
    padding: 0 3px 0 8px;
    border-radius: 100px 0 0 100px;
  }
  &:last-child {
    padding: 0 8px 0 3px;
    border-radius: 0 100px 100px 0;
  }
  & + & {
    border-left: none;
  }
  &.active {
    background: #0280F9;
  }
  @media (max-width: 500px) {
    font-size: 14px;
  }
}
</style>