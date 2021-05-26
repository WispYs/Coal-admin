<template>
  <div class="swiper-content">
    <div class="chart-data-content">
      <bar-chart :cdata="barData" />
    </div>

  </div>
</template>
<script>
import BarChart from './BarChart'

export default {
  components: { BarChart },
  data() {
    return {
      barData: {
        xLabel: [],
        yLabel: []
      }
    }
  },
  mounted() {
    this.barData = {
      xLabel: ['计划量', '实际量', '超量', '欠量'],
      yLabel: [450, 220, 100, 130],
      yAxisName: '单位/万吨'
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';
@import '~@/assets/styles/theme.scss';

.chart-data-content {
  padding: 40px 20px 0;
  overflow: hidden;
}

</style>
