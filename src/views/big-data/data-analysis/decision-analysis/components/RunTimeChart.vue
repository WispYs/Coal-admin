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
      default: () => ([])
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
          startAngle: 180,
          endAngle: 0,
          min: 0,
          max: 250,
          splitNumber: 5,
          axisLine: {
            lineStyle: {
              width: flexible(6),
              color: [
                [0.25, '#4afd88'],
                [0.5, '#10fffa'],
                [0.75, '#10fffa'],
                [1, '#f87a7b']
              ]
            }
          },
          pointer: {
            icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
            length: '62%',
            width: flexible(6),
            offsetCenter: [0, 0],
            itemStyle: {
              color: 'auto'
            }
          },
          anchor: {
            show: true,
            showAbove: true,
            size: flexible(20),
            itemStyle: {
              color: '#2db8ff'
            }
          },
          axisTick: {
            length: flexible(8),
            lineStyle: {
              color: 'auto',
              width: flexible(2)
            }
          },
          splitLine: {
            show: true,
            length: flexible(12),
            lineStyle: {
              color: 'auto',
              width: flexible(3)
            },
            textStyle: {
              color: '#10fffa'
            }
          },
          axisLabel: {
            color: '#10fffa',
            fontSize: flexible(12),
            distance: flexible(4)

          },
          title: {
            offsetCenter: [0, '60%'],
            fontSize: flexible(12),
            color: 'auto'
          },
          detail: {
            fontSize: flexible(22),
            offsetCenter: [0, '30%'],
            valueAnimation: true,
            formatter: function(value) {
              return value + '/h'
            },
            color: 'auto'
          },
          data: newData
        },
        {
          type: 'gauge',
          center: ['50%', '50%'],
          radius: '90%',
          startAngle: 360,
          endAngle: 180,
          min: 0,
          max: 250,
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              width: flexible(6),
              color: [
                [1, '#123e56']
              ]
            }
          },
          axisLabel: {
            show: false
          },
          axisTick: {
            show: false
          },
          pointer: {
            show: false
          },
          detail: {
            show: false
          },
          title: {
            show: false
          },
          data: [{
            value: 0,
            name: ''
          }]
        }]
      }
    }
  }
}
</script>
