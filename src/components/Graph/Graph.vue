<template>
  <section class="block">
    <div class="block block-themed graph-item" :class="{ 'hide': mobileCurrentGraph && mobileCurrentGraph !== 'trend' }">
      <Loader v-if="!showGraph.trend" />
      <div class="block-content" :style="{ opacity: showGraph.trend ? 1 : 0 }">
        <h4 class="title">確診案例趨勢</h4>
        <div class="switch">
          <button class="btn" :class="{ 'active': trendType === 'new'}" type="button" @click="switchTrendType('new')">新增案例</button>
          <button class="btn" :class="{ 'active': trendType === 'total'}" type="button" @click="switchTrendType('total')">總案例</button>
        </div>
        <Line :type="trendType" :data="trendData" :width="width" :height="height" :key="trendKey" />
      </div>
    </div>
    <div class="block block-themed graph-item" :class="{ 'hide': mobileCurrentGraph && mobileCurrentGraph !== 'age' }">
      <Loader v-if="!showGraph.age" />
      <div class="block-content" :style="{ opacity: showGraph.age ? 1 : 0 }">
        <h4 class="title">個案年齡分佈</h4>
        <div class="switch">
          <button class="btn" :class="{ 'active': ageType === 'case'}" type="button" @click="switchAgeType('case')">確診數</button>
          <button class="btn" :class="{ 'active': ageType === 'death'}" type="button" @click="switchAgeType('death')">死亡數</button>
        </div>
        <Doughnut topic="age" :type="ageType" :height="height" :key="ageKey" @graph-ready="show('age')" />
      </div>
    </div>
    <div class="block block-themed graph-item" :class="{ 'hide': mobileCurrentGraph && mobileCurrentGraph !== 'gender' }">
      <Loader v-if="!showGraph.gender" />
      <div class="block-content" :style="{ opacity: showGraph.gender ? 1 : 0 }">
        <h4 class="title">個案性別分佈</h4>
        <div class="switch">
          <button class="btn" :class="{ 'active': genderType === 'case'}" type="button" @click="switchGenderType('case')">確診數</button>
          <button class="btn" :class="{ 'active': genderType === 'death'}" type="button" @click="switchGenderType('death')">死亡數</button>
        </div>
        <Doughnut topic="gender" :type="genderType" :height="height" :key="genderKey" @graph-ready="show('gender')" />
      </div>
    </div>
    <div class="mobile-toggle">
      <button class="toggle-btn" :class="{ 'active': mobileCurrentGraph === 'trend' }" @click="mobileCurrentGraph = 'trend'" type="button">確診案例趨勢</button>
      <button class="toggle-btn" :class="{ 'active': mobileCurrentGraph === 'age' }" @click="mobileCurrentGraph = 'age'" type="button">個案年齡分佈</button>
      <button class="toggle-btn" :class="{ 'active': mobileCurrentGraph === 'gender' }" @click="mobileCurrentGraph = 'gender'" type="button">個案性別分佈</button>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Loader from '../Loader.vue'
import Line from './Line'
import Doughnut from './Doughnut'
import { DailyLog } from '@/interface/apiData'
import { Fetch } from '@/types'

export default defineComponent({
  components: { Loader, Line, Doughnut },
  setup(){
    type CaseOrDeath = 'case' | 'death'
    type NewOrTotal = 'new' | 'total'
    type Graph = 'trend' | 'age' | 'gender'

    // set graph width & height
    let width = ref<number>()
    let height = ref<number>()
    function setGraphSize(): void {
      if (window.innerWidth > 850){
        width.value = window.innerWidth / 4
        height.value = window.innerHeight / 5
      } else if (window.innerWidth > 650) {
        width.value = window.innerWidth * .7
        height.value = window.innerHeight * .5
      } else {
        width.value = window.innerWidth * .8
        height.value = window.innerHeight * .4
      }
    }
    setGraphSize()

    // set default graph for mobile device (because mobile is not wide enough to show all graphs)
    let mobileCurrentGraph = ref<Graph | null>(window.innerWidth > 1200 ? null : 'trend')
    
    let prevWidth: number = window.innerWidth
    window.addEventListener('resize', () => {
      // when resize, check if it's nessary to reset mobileCurrentGraph
      // if resize to <1200, then set to trend
      if (prevWidth > 1200 && window.innerWidth <= 1200){
        mobileCurrentGraph.value = 'trend'
      }
      // if resize to >1200, then set to null
      if (prevWidth <= 1200 && window.innerWidth > 1200){
        mobileCurrentGraph.value = null
      }
      prevWidth = window.innerWidth
      
      // reset graph width & height
      // ignore for cellphone, because URL bar can be toggle when swiping up and down in cellphone, which lead to window resize, causing unnecessary graph refresh
      if (window.innerWidth <= 500) return
      setGraphSize()
      trendKey.value++
      ageKey.value++
      genderKey.value++
    })

    // trend graph
    let trendData = ref()
    let trendType = ref<NewOrTotal>('new')
    let trendKey = ref(0)
    const getTrendData = async (): Promise<void> => {
      const res = await fetch(`${process.env.VUE_APP_SERVER}/api/nchc?querydata=4051`)
      const rawData: Fetch = await res.json()
      
      if (!rawData.success) {
        console.log('error!!', rawData.message);
        return
      }

      const raw = rawData.results as DailyLog[]
      let label: string[] = []
      let totalCases: number[] = []
      let newCases: number[] = []
      raw.forEach(dailyLog => {
        label.push(dailyLog.a04)
        totalCases.push(parseInt(dailyLog.a05, 10))
        newCases.push(parseInt(dailyLog.a06, 10))
      })

      trendData.value = { label, total: totalCases, new: newCases }
      trendKey.value++
      setTimeout(() => showGraph.value.trend = true, 500)
    }
    getTrendData()
    const switchTrendType = (type: NewOrTotal): void => {
      if (trendType.value === type) return

      trendType.value = type
      trendKey.value++
    }

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
    let showGraph = ref<Record<Graph, boolean>>({
      trend: false,
      age: false,
      gender: false,
    })
    const show = (topic: 'age' | 'gender'): void => {
      setTimeout(() => showGraph.value[topic] = true, 500)
    }

    return {
      width, height,
      showGraph, show,
      trendData, trendType, trendKey, switchTrendType,
      ageType, ageKey, switchAgeType,
      genderType, genderKey, switchGenderType,
      mobileCurrentGraph,
    }
  }
})
</script>

<style lang="scss" scoped>
.graph-item {
  width: 100%;
  height: 33%;
  & + & {
    margin-top: 10px;
  }
  &.hide {
    opacity: 0;
    visibility: hidden;
  }
  @media (max-width: 1200px) {
    position: absolute;
    top: 0;
    bottom: 25px;
    left: 0;
    right: 0;
    height: auto;
    & + & {
      margin-top: 0;
    }
  }
  @media (max-width: 850px) {
    top: 28px;
    bottom: 0;
  }
}
.title {
  margin: 0 0 6px 0;
  line-height: 1.3;
  font-size: 16px;
  @media (max-width: 850px) {
    margin: 0 0 10px 0;
    font-size: 26px;
  }
  @media (max-width: 650px) {
    font-size: 24px;
  }
  @media (max-width: 500px) {
    font-size: 20px;
  }
}
.switch {
  display: flex;
  justify-content: center;
  margin: 0;
  .btn {
    all: unset;
    padding: 5px;
    border-top: 1px solid #FFF;
    border-left: 1px solid #FFF;
    border-bottom: 1px solid #FFF;
    font-size: 12px;
    cursor: pointer;
    &:first-child {
      padding-left: 12px;
      border-radius: 100px 0 0 100px;
    }
    &:last-child {
      padding-right: 12px;
      border-right: 1px solid #FFF;
      border-radius: 0 100px 100px 0;
    }
    &.active, &:hover {
      background: #FFF;
      color: #000;
    }
    @media (max-width: 850px) {
      margin: 0 0 20px 0;
      font-size: 14px;
    }
    @media (max-width: 650px) {
      margin: 0 0 15px 0;
      font-size: 12px;
    }
  }
}

.mobile-toggle {
  display: none;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 26px;
  padding: 0 10px;
  box-sizing: border-box;
  @media (max-width: 1200px) {
    display: flex;
  }
  @media (max-width: 1000px) {
    padding: 0 0 0 10px;
  }
  @media (max-width: 850px) {
    top: 0;
    bottom: auto;
    height: 29px;
  }
}
.toggle-btn {
  all: unset;
  padding: 0px 8px;
  background: transparent;
  color: rgba(255,255,255,.3);
  border-left: 1px solid $border-color;
  border-right: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  font-size: 12px;
  white-space: nowrap;
  cursor: pointer;
  & + & {
    margin-left: 5px;
  }
  &.active {
    background: lighten($block-bg, 15%);
    color: #FFF;
    border-top: 1px solid #111F34;
  }
  @media (max-width: 1000px) {
    padding: 0 5px;
    & + & {
      margin-left: 0;
      border-left: none;
    }
  }
  @media (max-width: 850px) {
    padding: 0px 8px;
    border-top: 1px solid $border-color;
    border-bottom: 1px solid transparent;
    font-size: 14px;
    & + & {
      margin-left: 5px;
      border-left: 1px solid $border-color;
    }
    &.active {
      border-top: 1px solid $border-color;
      border-bottom: 1px solid #111F34;
    }
  }
  @media (max-width: 500px) {
    font-size: 12px;
    & + & {
      margin-left: 0;
      border-left: none;
    }
  }
}
</style>