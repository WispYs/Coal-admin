<template>
  <div class="swiper-content">
    <div class="chart-data-content">
      <pie-chart :cdata="pieData" />
    </div>

  </div>
</template>
<script>
import PieChart from './PieChart'

export default {
  components: { PieChart },
  data() {
    return {
      pieData: {
        xLabel: [],
        yLabel: []
      }
    }
  },
  mounted() {
    this.pieData = {
      data: [
        { value: 780, name: '计划量' },
        { value: 520, name: '实际量' },
        { value: 100, name: '超量' },
        { value: 130, name: '欠量' }
      ]
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
