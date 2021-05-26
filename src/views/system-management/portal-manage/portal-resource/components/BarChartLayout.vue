<template>
  <div class="preview-wrapper">
    <div class="preview-title">资源名称</div>
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
      xLabel: ['班组一', '班组二', '班组三', '班组四'],
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
  padding: 0 20px;
  overflow: hidden;
}

</style>
