<template>
  <Echart id="barChart" :options="options" />
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
      deep: true,
      handler(newData) {
        this.options = {
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          color: '#409EFF',
          grid: {
            top: 10,
            left: '2%',
            right: '2%',
            bottom: '2%',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            data: newData.xAxisData,
            axisTick: {
              alignWithLabel: true
            }
          }],
          yAxis: [{
            type: 'value',
            minInterval: 1,
            axisTick: {
              show: true
            }
          }],
          series: [{
            name: '隐患数量',
            type: 'bar',
            stack: 'vistors',
            barWidth: '40px',
            label: {
              show: true,
              position: 'inside'
            },
            data: newData.seriesData
          }]
        }
      }
    }
  },
  created() {
  }

}
</script>
