<template>
  <div class="container">
    <StarBackground :key="starKey" />
    <Header class="header" />
    <DomesticStat class="domestic-stat" :class="{ 'mobile-hide': $store.state.mobileMenuTab !== 'domesticstat' }" />
    <WorldStat class="world-stat" :class="{ 'mobile-hide': $store.state.mobileMenuTab !== 'worldstat' }" />
    <Map class="map" :class="{ 'mobile-hide': $store.state.mobileMenuTab !== 'map' }" />
    <Graph class="graph" :class="{ 'mobile-hide': $store.state.mobileMenuTab !== 'graph' }" />
    <LastUpdated class="last-updated" :class="{ 'mobile-hide': $store.state.mobileMenuTab !== 'domesticstat' }" />
    <AnimatedCursor />
    <MobileMenu />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Header from './components/Header.vue'
import DomesticStat from './components/DomesticStat.vue'
import WorldStat from './components/WorldStat.vue'
import Map from './components/Map.vue'
import Graph from './components/Graph/Graph.vue'
import LastUpdated from './components/LastUpdated.vue'
import AnimatedCursor from './components/AnimatedCursor.vue'
import MobileMenu from './components/MobileMenu.vue'
import StarBackground from './components/StarBackground.vue'

export default defineComponent({
  components: {
    Header, DomesticStat, WorldStat, Map, Graph, LastUpdated, MobileMenu,
    AnimatedCursor, StarBackground
  },
  setup() {
    // reset StarBackground's width & height when resizing
    let starKey = ref<number>(0)
    window.addEventListener('resize', () => {
      if (window.innerWidth <= 500) return
      starKey.value++
    })

    return { starKey }
  },
})
</script>

<style lang="scss">
html, body {
  height: 100vh;
  &.map-dragging {
    overscroll-behavior-y: contain;  // disable browser's pull-to-refresh feature
  }
}
#app {
  height: 100%;
}
.container {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: var(--header-height) 1fr 1fr 7fr;
  gap: $block-gap;
  grid-template-areas: 
    'header header header header header header header'
    'lastupdated domesticstat domesticstat domesticstat domesticstat graph graph'
    'worldstat domesticstat domesticstat domesticstat domesticstat graph graph'
    'worldstat map map map map graph graph';
  position: relative;
  height: calc(100% - ($block-gap * 2));
  max-height: calc(100% - ($block-gap * 2));
  padding: $block-gap;
  background-image: linear-gradient(#0D1118, #111821);
  font-family: 'Open Sans', 'Noto Sans TC', sans-serif;
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: var(--header-height) 1fr 1fr 2fr 5fr;
    grid-template-areas: 
      'header header header'
      'domesticstat domesticstat lastupdated'
      'domesticstat domesticstat graph'
      'map map graph'
      'map map worldstat';
  }
  @media (max-width: 850px) {
    grid-template-columns: 1fr;
    grid-template-rows: var(--header-height) $mobile-menu-height 1fr;
    grid-template-areas: 
      'header'
      'menu'
      'main';
  }
}

// Blocks
.header {
  grid-area: header;
  display: flex;
  align-items: center;
  position: absolute;
  height: var(--header-height);
  background: transparent;
  border: none;
  font-weight: 300;
}
.domestic-stat {
  grid-area: domesticstat;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: $block-gap;
  background: transparent;
  border: none;
  @media (max-width: 850px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 5vw;
  }
  @media (max-width: 650px) {
    grid-auto-rows: 30vh;
    gap: $block-gap;
  }
  @media (max-width: 500px) {
    grid-auto-rows: 20vh;
  }
}
.world-stat {
  grid-area: worldstat;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 7fr;
}
.map {
  grid-area: map;
  background: transparent;
  border: none;
  &.map-dragging {
    overscroll-behavior-y: contain;
  }
}
.graph {
  grid-area: graph;
}
.last-updated {
  grid-area: lastupdated;
  @media (max-width: 850px) {
    width: 100%;
    height: $mobile-lastupdated-height;
    &.block {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}
.domestic-stat, .last-updated, .world-stat, .map, .graph {
  @media (max-width: 850px) {
    grid-area: main;
    &.mobile-hide {
      opacity: 0;
      visibility: hidden;
    }
  }
}
.mobile-menu {
  grid-area: menu;
  display: none;
  color: #FFF;
  @media (max-width: 850px) {
    display: block;
    z-index: 1;
  }
}
</style>
