<template>
  <div class="container">
    <Header />
    <MainStat />
    <WorldStat />
    <Map />
    <Graph />
    <LastUpdated />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from './components/Header.vue'
import MainStat from './components/MainStat.vue'
import WorldStat from './components/WorldStat.vue'
import Map from './components/Map.vue'
import Graph from './components/Graph.vue'
import LastUpdated from './components/LastUpdated.vue'

export default defineComponent({
  components: { Header, MainStat, WorldStat, Map, Graph, LastUpdated },
  setup() {
    // 
  },
})
</script>

<style lang="scss">
body {
  height: 100vh;
}
#app {
  height: 100%;
}
.container {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: $header-height 1fr 1fr 7fr;
  gap: $block-gap;
  grid-template-areas: 
    'header header header header header header header'
    'lastupdated mainstat mainstat mainstat mainstat graph graph'
    'worldstat mainstat mainstat mainstat mainstat graph graph'
    'worldstat map map map map graph graph';
  height: calc(100% - ($block-gap * 2));
  max-height: calc(100% - ($block-gap * 2));
  padding: $block-gap;
  background: $grey-3;
  font-family: 'Open Sans', sans-serif;
}
.block {
  border: 1px solid $grey-1;
  overflow: hidden;
  background: $grey-4;
  color: #FFF;
}
</style>