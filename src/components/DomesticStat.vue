<template>
  <section class="block domestic-stat">
    <div class="box">
      <Loader :class="{ 'hide': showBlock }" />
      <h2 class="title">累計確診</h2>
      <span class="figure color-case">{{ totalCase }}</span>
    </div>
    <div class="box">
      <Loader :class="{ 'hide': showBlock }" />
      <h2 class="title">新增確診</h2>
      <span class="figure color-case">{{ newCase }}</span>
    </div>
    <div class="box">
      <Loader :class="{ 'hide': showBlock }" />
      <h2 class="title">累計死亡</h2>
      <span class="figure color-death">{{ totalDeath }}</span>
      <span class="note">+{{ newDeath }}</span>
      <span class="note">(死亡率: {{ deathRate }}%)</span>
    </div>
    <div class="box">
      <Loader :class="{ 'hide': showBlock }" />
      <h2 class="title">疫苗涵蓋率</h2>
      <span class="figure color-vax">{{ vacRate }}%</span>
      <span class="note">累計接種人次 {{ vacShot }}</span>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Loader from './Loader.vue'
import store from '../store'
import { fetchData, round, format } from '../helpers'
import { Domestic } from '../interface/apiData'

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
      const [error, rawData] = await fetchData('/nchc/covid19?CK=covid-19@nchc.org.tw&querydata=4001&limited=TWN')
      
      if (error) {
        console.log('error!!', error, typeof error);
        return
      }

      // rawData consists of Taiwan covid-19 data on daily basis from latest to earlier ones; however, some fields in the latest one might be vacant
      // check if the latest data is complete; if not, then use previous day's data
      const raw = rawData as Domestic[]
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
.domestic-stat {
  grid-area: domesticstat;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: $block-gap;
  background: $grey-3;
  border: none;
}
.box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  background: $grey-4;
  border: 1px solid $grey-1;
  overflow: hidden;
}
.title {
  margin: 0 0 0.3vw 0;
  font-size: 1.2vw;
}
.figure {
  margin: 0 0 0.2vw 0;
  font-size: 2.3vw;
  white-space: nowrap;
}
.note {
  font-size: 1vw;
  line-height: 1.2;
}
</style>