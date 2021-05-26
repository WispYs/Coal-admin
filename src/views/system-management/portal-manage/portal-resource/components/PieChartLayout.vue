<template>
  <div class="preview-wrapper">
    <div class="preview-title">资源名称</div>
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
        { value: 780, name: '班组一' },
        { value: 520, name: '班组二' },
        { value: 100, name: '班组三' },
        { value: 230, name: '班组四' }
      ]
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
