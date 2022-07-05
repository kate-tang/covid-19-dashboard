<template>
  <section class="block block-themed world-stat">
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
import { fetchData, format } from '../helpers'
import { World, Country, Global } from '../interface/apiData'

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
      const [error, rawData] = await fetchData('/covid19/summary')
      
      if (error) {
        console.log('error!!', error);
        return
      }

      let raw = rawData as World
      
      world.value = {
        name: "全球",
        totalCases: format(raw.Global.TotalConfirmed),
        totalDeaths: format(raw.Global.TotalDeaths)
      }
      countries.value = processCountyData(raw.Countries)

      setTimeout(() => showBlock.value = true, 500)
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
.world-stat {
  grid-area: worldstat;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 7fr;
}
.head {
  display: flex;
  justify-content: center;
  align-items: center;
  .title {
    font-size: 1vw;
    line-height: 1.4;
    text-align: center;
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
    border-top: 1px solid $grey-2;
    .name {
      margin-bottom: 3px;
      font-size: 16px;
      line-height: 1.3;
    }
    .val {
      font-size: 14px;
      line-height: 1.3;
    }
  }
}
</style>