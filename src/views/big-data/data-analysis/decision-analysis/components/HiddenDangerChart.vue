<template>
  <Echart id="lineChart" :options="options" height="100%" />
</template>

<script>
import Echart from '@/components/Echarts'
import resize from './mixins/resize'
import flexible from './mixins/flexible'

export default {
  components: {
    Echart
  },
  mixins: [resize],
  props: {
    cdata: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      newData: {},
      options: {}
    }
  },
  watch: {
    cdata: {
      handler(newData) {
        this.newData = newData
        this.normalizedOption(newData)
      },
      immediate: true
    }
  },
  methods: {
    // 调整浏览器窗口大小后，重新处理options对象
    normalizedOption(newData) {
      this.options = {
        grid: {
          top: '10%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          axisLine: {
            show: false
          },
          axisLabel: {
            color: '#fff' // 刻度线标签颜色
          },
          axisTick: {
            show: false
          },
          data: newData.xAxis
        },
        yAxis: {
          type: 'value',
          interval: 1,
          axisLine: {
            show: false
          },
          axisLabel: {
            color: '#fff' // 刻度线标签颜色
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: { // x网格线
              color: '#1a3981'
            }
          },
          splitArea: {
            show: false
          }// 去除网格区域
        },
        series: [{
          data: newData.yAxis,
          type: 'line',
          lineStyle: {
            color: newData.color
          },
          itemStyle: {
            normal: {
              color: newData.color
            }
          },

          smooth: true
        }]
      }
    }
  }

}
</script>
