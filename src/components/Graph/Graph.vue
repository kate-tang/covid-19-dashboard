<template>
  <section class="block graph">
    <div class="block block-themed graph-item">
      <Loader v-if="!showGraph.age" />
      <div class="block-content" :style="{ opacity: showGraph.age ? 1 : 0 }">
        <h4>個案年齡分佈</h4>
        <div class="switch">
          <button class="btn" :class="{ 'active': ageType === 'case'}" type="button" @click="switchAgeType('case')">確診數</button>
          <button class="btn" :class="{ 'active': ageType === 'death'}" type="button" @click="switchAgeType('death')">死亡數</button>
        </div>
        <Doughnut topic="age" :type="ageType" :height="height" :key="ageKey" @graph-ready="show('age')" />
      </div>
    </div>
    <div class="block block-themed graph-item">
      <Loader v-if="!showGraph.gender" />
      <div class="block-content" :style="{ opacity: showGraph.gender ? 1 : 0 }">
        <h4>個案性別分佈</h4>
        <div class="switch">
          <button class="btn" :class="{ 'active': genderType === 'case'}" type="button" @click="switchGenderType('case')">確診數</button>
          <button class="btn" :class="{ 'active': genderType === 'death'}" type="button" @click="switchGenderType('death')">死亡數</button>
        </div>
        <Doughnut topic="gender" :type="genderType" :height="height" :key="genderKey" @graph-ready="show('gender')" />
      </div>
    </div>
    <div class="block block-themed graph-item"></div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Loader from '../Loader.vue'
import Doughnut from './Doughnut'

export default defineComponent({
  components: { Loader, Doughnut },
  setup(){
    type CaseOrDeath = 'case' | 'death'
    let height = ref<number>(window.innerHeight / 5)

    // age graph
    let ageType = ref<CaseOrDeath>('case')
    let ageKey = ref(0)
    const switchAgeType = (type: CaseOrDeath): void => {
      if (ageType.value === type) return

      ageType.value = type
      ageKey.value++
    }
    // gender graph
    let genderType = ref<CaseOrDeath>('case')
    let genderKey = ref(0)
    const switchGenderType = (type: CaseOrDeath): void => {
      if (genderType.value === type) return

      genderType.value = type
      genderKey.value++
    }

    // hide loader when graph is ready
    let showGraph = ref({
      age: false,
      gender: false,
    })
    const show = (topic: 'age' | 'gender'): void => {
      setTimeout(() => showGraph.value[topic] = true, 500)
    }

    return {
      height,
      showGraph, show,
      ageType, ageKey, switchAgeType,
      genderType, genderKey, switchGenderType,
    }
  }
})
</script>

<style lang="scss" scoped>
.graph {
  grid-area: graph;
}
.graph-item {
  width: 100%;
  height: 33%;
  & + & {
    margin-top: 10px;
  }
}
.switch {
  display: flex;
  justify-content: center;
}
</style>