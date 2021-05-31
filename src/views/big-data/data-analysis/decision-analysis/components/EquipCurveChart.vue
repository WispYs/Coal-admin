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
          left: '3%',
          right: '10%',
          top: '10%',
          bottom: '1%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          // axisLine: {
          //   show: false
          // },
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
          interval: 50,
          // axisLine: {
          //   show: false
          // },
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
          markLine: {
            data: [
              { type: 'average', name: '平均值', lineStyle: { color: '#faad14' }},
              { type: 'min', name: '最小值', lineStyle: { color: '#f0294b' }}
            ],
            symbol: ['none', 'arrow'],
            lineStyle: {
              width: flexible(2), // 0 的时候可以隐藏线
              type: 'solid' // 实线，不写默认虚线
            }
          },

          smooth: true
        }]
      }
    }
  }

}
</script>
