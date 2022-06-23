<template>
  <section class="block main-stat">
    <div class="box">
      <h2>總確診病例</h2>
      <span>3,487,599</span>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup(){
    let totalCase = ref()

    const getData = async () => {
      const data = fetch('/nchc/covid19?CK=covid-19@nchc.org.tw&querydata=4001')
      console.log(data);
    }
    getData()

    return {  }
  }
})
</script>

<style lang="scss" scoped>
.main-stat {
  grid-area: mainstat;
}
</style>