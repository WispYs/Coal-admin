<template>
  <div class="preview-wrapper">
    <div class="preview-title">资源名称</div>
    <div class="chart-data-content">
      <line-chart :cdata="lineData" />
    </div>

  </div>
</template>
<script>
import LineChart from './LineChart'

export default {
  components: { LineChart },
  data() {
    return {
      lineData: {
        xLabel: [],
        yLabel: []
      }
    }
  },
  mounted() {
    this.lineData = {
      xLabel: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
      yLabel: [
        {
          name: '',
          value: [82, 93, 90, 93, 129, 130, 132]
        }
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
