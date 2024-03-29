<template>
  <section class="block block-themed">
    <div class="head">
      <h3 class="title">
        全球疫情統計<br>
        ( <span class="color-case">確診數</span> <span class="divider">|</span> <span class="color-death">死亡數</span> )
      </h3>
    </div>
    <div class="body scrollbar">
      <Loader v-if="!showBlock" />
      <ul class="stat-list" v-else-if="world && countries && countries.length > 0">
        <li class="stat-list-item">
          <div class="name">{{ world.name }}</div>
          <div class="val">
            <span class="color-case">{{ world.totalCases }}</span> | 
            <span class="color-death">{{ world.totalDeaths }}</span>
          </div>
        </li>
        <li class="stat-list-item" v-for="(country, index) in countries" :key="index">
          <div class="name">{{ country.name }}</div>
          <div class="val">
            <span class="color-case">{{ country.totalCases }}</span> | 
            <span class="color-death">{{ country.totalDeaths }}</span>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Loader from './Loader.vue'
import getCountryName from '../helpers/countries'
import { format } from '../helpers'
import { World, Country } from '../interface/apiData'
import { Fetch } from '../types'

export default defineComponent({
  components: { Loader },
  setup(){
    let showBlock = ref<boolean>(false)

    interface DataType {
      name: string;
      totalCases: number;
      totalDeaths: number;
    }
    let world = ref<DataType>()
    let countries = ref<DataType[]>()

    const getWorldData = async (): Promise<void> => {
      const res = await fetch(`${process.env.VUE_APP_SERVER}/api/jhucsse?q=summary`)
      const rawData: Fetch = await res.json()
      
      if (!rawData.success) {
        console.log('error!!', rawData.message);
        return
      }

      const raw = rawData.results as World
      world.value = {
        name: "全球",
        totalCases: format(raw.Global.TotalConfirmed),
        totalDeaths: format(raw.Global.TotalDeaths)
      }
      countries.value = processCountyData(raw.Countries)

      setTimeout(() => showBlock.value = true, 0)
    }
    function processCountyData(countries: Country[]): DataType[] {
      return countries.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed).map(country => ({
        name: getCountryName[country.CountryCode] ?? country.Country,
        totalCases: format(country.TotalConfirmed),
        totalDeaths: format(country.TotalDeaths)
      }))
    }
    getWorldData()

    return {
      showBlock,
      world, countries
    }
  }
})
</script>

<style lang="scss" scoped>
.head {
  display: flex;
  justify-content: center;
  align-items: center;
  .title {
    font-size: 1vw;
    line-height: 1.4;
    text-align: center;
    @media (max-width: 1600px) {
      font-size: 16px;
    }
    @media (max-width: 1200px) {
      padding: 10px 0;
    }
    @media (max-width: 850px) {
      font-size: 18px;
    }
    .divider {
      vertical-align: text-top;
    }
  }
}
.body {
  position: relative;
  overflow-x: hidden;
  overflow-y: scroll;
}
.stat-list {
  margin: 0 0 0 10px;
  padding: 0;
  list-style-type: none;
  .stat-list-item {
    padding: 10px;
    border-top: 1px solid #404040;
    .name {
      margin-bottom: 3px;
      font-size: 16px;
      line-height: 1.3;
    }
    .val {
      font-size: 14px;
      line-height: 1.3;
    }
    @media (max-width: 850px) {
      display: flex;
      justify-content: center;
      padding: 5px 0;
      border-top: none;
      &:nth-child(2n-1) {
        background: rgba(46, 159, 235, .1);
      }
      &:hover {
        background: rgba(46, 159, 235, .2);
      }
      .name {
        flex: 0 0 25%;
      }
      .val {
        flex: 0 0 35%;
        text-align: right;
      }
    }
    @media (max-width: 650px) {
      .name {
        flex: 0 0 30%;
      }
      .val {
        flex: 0 0 40%;
      }
    }
    @media (max-width: 500px) {
      padding: 5px 10px;
      .name {
        flex: 0 0 35%;
        font-size: 14px;
      }
      .val {
        flex: 0 0 65%;
      }
    }
  }
}
</style>