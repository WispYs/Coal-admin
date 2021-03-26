<template>
  <Echart id="workingChart" :options="options" height="287px" />
</template>

<script>
import Echart from '@/components/Echarts'

export default {
  components: {
    Echart
  },
  props: {
    cdata: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      options: {}
    }
  },
  watch: {
    cdata: {
      handler(newData) {
        this.options = {
          grid: {
            top: 10,
            left: '2%',
            right: '2%',
            bottom: '0',
            containLabel: true
          },
          xAxis: {
            axisLine: {
              lineStyle: {
                color: '#333'
              }
            },
            axisLabel: {
              textStyle: {
                color: '#333'
              }
            }
          },
          yAxis: {
            axisLine: {
              lineStyle: {
                color: '#333'
              }
            },
            axisLabel: {
              textStyle: {
                color: '#333'
              }
            }
          },

          series: [{
            symbolSize: 80,
            itemStyle: {
              color: '#409EFF'
            },
            data: [
              [8.07, 33.04],
              [17.07, 56.95],
              [24.4, 24.58],
              [34.05, 58.81],
              [50.32, 80.33]
            ],
            type: 'scatter'
          }]
        }
      }
    }
  }

}
</script>
