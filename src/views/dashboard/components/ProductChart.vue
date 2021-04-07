<template>
  <Echart id="productChart" :options="options" />
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
          title: {
            text: '今日产量柱状图',
            left: 'center',
            top: 20,
            textStyle: {
              color: '#787878',
              fontWeight: 'normal',
              fontSize: 14
            }
          },
          grid: {
            top: 60,
            left: '2%',
            right: '2%',
            bottom: '0%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: newData.name,
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
            axisLine: {
              lineStyle: {
                color: '#333'
              }
            },
            axisLabel: {
              textStyle: {
                color: '#333'
              },
              formatter: '{value}万吨'
            }
          },
          series: [{
            data: newData.value,
            type: 'bar',
            barWidth: 20,
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
