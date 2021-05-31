<template>
  <div class="load-rate">
    <div class="item-title no-select">
      <p>负荷率</p>
    </div>
    <div class="item-content">
      <load-rate-chart :cdata="loadRateData" />
    </div>
  </div>
</template>
<script>
import LoadRateChart from './LoadRateChart'

export default {
  components: { LoadRateChart },
  data() {
    return {
      loadRateData: [{
        value: 2653.5,
        name: '查询总里数(km)'
      }]
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/mixin.scss';
  .load-rate {
    display: inline-block;
    width: calc((50% - .1rem)/2);
    height: 2.2rem;
    margin-right: .2rem;
  }

</style>
