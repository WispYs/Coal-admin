<template>
  <Echart id="pieChart2" :options="options" height="100%" />
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
      let total = 0
      const legend = []
      newData.forEach(it => {
        total += it.value
        legend.push(it.name)
      })
      this.options = {
        title: {
          zlevel: 0,
          text: [
            '{value|' + total + '}',
            '{name|总个数}'
          ].join('\n'),
          top: 'center',
          left: '28.2%',
          textAlign: 'center',
          textStyle: {
            rich: {
              value: {
                color: '#fff',
                fontSize: flexible(22),
                fontWeight: 'bold',
                lineHeight: flexible(36)
              },
              name: {
                color: '#fff',
                fontSize: flexible(14),
                lineHeight: flexible(20)
              }
            }
          }
        },
        tooltip: { // 悬停指示
          trigger: 'item',
          formatter: '{b}: {c}'
        },
        legend: {
          orient: 'vertical',
          x: '60%',
          itemGap: flexible(36),
          top: 'middle',
          align: 'left',
          icon: 'circle',
          formatter: function(name) {
            // 获取legend显示内容
            let tarValue = 0
            newData.forEach((it, i) => {
              if (name === newData[i].name) {
                tarValue = newData[i].value
              }
            })
            return `${name}：${tarValue}`
          },
          data: legend,
          textStyle: {
            color: 'inherit',
            fontSize: flexible(18)
          }
        },
        series: [
          {
            type: 'pie',
            radius: ['40%', '90%'],
            center: ['30%', '50%'],
            roseType: 'radius',
            itemStyle: {
              borderRadius: 8
            },
            label: {
              normal: {
                position: 'inner',
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: newData
          }
        ]
      }
    }
  }

}
</script>
