<template>
  <Echart id="barChart" :options="options" height="460px" />
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
          // title: {
          //   text: '今日产量柱状图',
          //   left: 'center',
          //   top: 20,
          //   textStyle: {
          //     color: '#787878',
          //     fontWeight: 'normal',
          //     fontSize: 14
          //   }
          // },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '6%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: newData.xLabel,
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
            type: 'value',
            name: newData.yAxisName,
            nameLocation: 'end',
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
            data: newData.yLabel,
            type: 'bar',
            barWidth: 30,
            itemStyle: {
              color: '#009688'
            }
          }]
        }
      }
    }
  }

}
</script>
