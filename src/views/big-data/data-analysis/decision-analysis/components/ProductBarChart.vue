<template>
  <Echart id="barChart" :options="options" height="100%" />
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
          right: '4%',
          top: '30%',
          bottom: '2%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: newData.xLabel,
          axisLine: {
            show: false
          },
          axisLabel: {
            color: '#fff' // 刻度线标签颜色
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          name: newData.yAxisName,
          nameTextStyle: { // x网格线
            color: '#fff'
          },
          nameLocation: 'end',
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
          data: newData.yLabel,
          type: 'bar',
          barWidth: flexible(12),
          itemStyle: {
            emphasis: {
              barBorderRadius: 30
            },
            normal: {
              // 柱形图圆角，初始化效果
              barBorderRadius: [10, 10, 5, 5],
              color: '#35f1ff'
            }

          }
        }]
      }
    }
  }

}
</script>
