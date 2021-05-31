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
      type: Array,
      default: () => ({})
    }
  },
  data() {
    return {
      newData: [],
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
        series: [{
          type: 'gauge',
          center: ['50%', '50%'],
          radius: '90%',
          min: 0,
          max: 3000,
          axisLine: {
            lineStyle: {
              width: flexible(8),
              color: [[0.9, '#8c6af4'], [1, '#132345']]
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          pointer: {
            show: false
          },
          title: {
            fontSize: flexible(12),
            color: '#fff',
            offsetCenter: [0, '80%']
          },
          detail: {
            valueAnimation: true,
            fontSize: flexible(22),
            color: '#1fefff',
            offsetCenter: [0, '5%']
          },
          data: newData
        }]
      }
    }
  }
}
</script>
