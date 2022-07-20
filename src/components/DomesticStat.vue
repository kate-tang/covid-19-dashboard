<template>
  <section class="block">
    <div class="box block block-themed">
      <Loader v-if="!showBlock" />
      <div v-else class="block-content">
        <h2 class="title">累計確診</h2>
        <span class="figure color-case">{{ totalCase }}</span>
      </div>
    </div>
    <div class="box block block-themed">
      <Loader v-if="!showBlock" />
      <div v-else class="block-content">
        <h2 class="title">新增確診</h2>
        <span class="figure color-case">{{ newCase }}</span>
      </div>
    </div>
    <div class="box block block-themed">
      <Loader v-if="!showBlock" />
      <div v-else class="block-content">
        <h2 class="title">累計死亡</h2>
        <span class="figure color-death">{{ totalDeath }}</span>
        <span class="note">+{{ newDeath }}</span>
        <span class="note">(死亡率: {{ deathRate }}%)</span>
      </div>
    </div>
    <div class="box block block-themed">
      <Loader v-if="!showBlock" />
      <div v-else class="block-content">
        <h2 class="title">疫苗涵蓋率</h2>
        <span class="figure color-vax">{{ vacRate }}%</span>
        <span class="note">累計接種人次 {{ vacShot }}</span>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Loader from './Loader.vue'
import store from '../store'
import { round, format } from '../helpers'
import { Domestic } from '../interface/apiData'
import { Fetch } from '../types'

export default defineComponent({
  components: { Loader },
  setup(){
    let showBlock = ref<boolean>(false)
    let totalCase = ref<number | string>()
    let newCase = ref<number | string>()
    let totalDeath = ref<number | string>()
    let newDeath = ref<number | string>()
    let deathRate = ref<number | string>()
    let vacRate = ref<number | string>()
    let vacShot = ref<number | string>()

    const getDomesticData = async (): Promise<void> => {
      const res = await fetch(`${process.env.VUE_APP_SERVER}/api/nchc?querydata=4001&limited=TWN`)
      const rawData: Fetch = await res.json()
      
      if (!rawData.success) {
        console.log('error!!', rawData.message);
        return
      }

      // rawData consists of Taiwan covid-19 data on daily basis from latest to earlier ones; however, some fields in the latest one might be vacant
      // check if the latest data is complete; if not, then use previous day's data
      const raw = rawData.results as Domestic[]
      const data = raw.find((item: Domestic) => {
        let fields: (keyof Domestic)[] = ['a04', 'a05', 'a06', 'a08', 'a09', 'a20', 'a21', 'a27']
        return fields.every((field): boolean => parseInt(item[field]) !== 0)
      })

      if (data === undefined) throw Error('can not get data')

      totalCase.value = format(data['a05'])
      newCase.value = format(data['a06'])
      totalDeath.value = format(data['a08'])
      newDeath.value = format(data['a09'])
      deathRate.value = round(parseInt(data['a08']) / parseInt(data['a05']) * 100, 2)
      vacRate.value = Math.floor(parseInt(data['a21']) / parseInt(data['a27']) * 100)
      vacShot.value = format(data['a20'])

      store.commit('setUpdateTime', new Date(data['a04']).getTime())

      setTimeout(() => showBlock.value = true, 500)
    }
    getDomesticData()

    return {
      showBlock,
      totalCase, newCase, totalDeath, newDeath, deathRate, vacRate, vacShot
    }
  }
})
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 850px) {
    width: 100%;
    max-width: 90%;
    height: 100%;
    max-height: 65%;
    &:nth-child(1) { justify-self: end; align-self: end; }
    &:nth-child(2) { justify-self: start; align-self: end; }
    &:nth-child(3) { justify-self: end; align-self: start; }
    &:nth-child(4) { justify-self: start; align-self: start; }
  }
  @media (max-width: 650px) {
    position: relative;
    top: $mobile-lastupdated-height;
    max-width: 100%;
    max-height: 100%;
    &:nth-child(1) { justify-self: stretch; align-self: stretch; }
    &:nth-child(2) { justify-self: stretch; align-self: stretch; }
    &:nth-child(3) { justify-self: stretch; align-self: stretch; }
    &:nth-child(4) { justify-self: stretch; align-self: stretch; }
  }
}
.title {
  margin: 0;
  font-size: 1.2vw;
  @media (max-width: 1200px) {
    font-size: 16px;
  }
  @media (max-width: 850px) {
    font-size: 2.7vw;
  }
  @media (max-width: 650px) {
    font-size: 3.3vw;
  }
  @media (max-width: 500px) {
    font-size: 4vw;
  }
}
.figure {
  margin: 0.3vw 0 0 0;
  font-size: 2.3vw;
  white-space: nowrap;
  @media (max-width: 1200px) {
    margin: 4px 0 0 0;
    font-size: 28px;
  }
  @media (max-width: 850px) {
    margin: 0.5vw 0 0 0;
    font-size: 7vw;
  }
  @media (max-width: 650px) {
    font-size: 8.5vw;
  }
  @media (max-width: 500px) {
    font-size: 9vw;
  }
}
.note {
  margin: 0.2vw 0 0 0;
  font-size: 1vw;
  line-height: 1.2;
  text-align: center;
  @media (max-width: 1200px) {
    margin: 4px 0 0 0;
    font-size: 12px;
  }
  @media (max-width: 850px) {
    margin: 0.4vw 0 0 0;
    font-size: 2vw;
  }
  @media (max-width: 650px) {
    font-size: 2.5vw;
  }
  @media (max-width: 500px) {
    font-size: 3vw;
  }
}
</style>