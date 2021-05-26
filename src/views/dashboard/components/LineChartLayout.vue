<template>
  <div class="swiper-content">
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
      xLabel: ['05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'],
      yLabel: [
        {
          name: '生产一班',
          value: [0, 26000, 36540, 31256, 21025, 17580, 19560, 27564, 28756, 22560, 13560, 8560]
        }, {
          name: '生产二班',
          value: [0, 25460, 31560, 23598, 15306, 17580, 23560, 24005, 18520, 8940, 4852, 2300]
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
  padding: 40px 20px 0;
  overflow: hidden;
}

</style>
