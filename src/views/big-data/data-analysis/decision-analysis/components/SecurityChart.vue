<template>
  <Echart id="pieChart" :options="options" height="100%" />
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
      const legend = []
      newData.forEach(it => {
        legend.push(it.name)
      })
      this.options = {
        tooltip: { // 悬停指示
          trigger: 'item',
          formatter: '{b}: {c}'
        },
        legend: {
          orient: 'vertical',
          x: '60%',
          itemGap: flexible(14),
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
            fontSize: flexible(16)
          }
        },
        series: [
          {
            type: 'pie',
            radius: '90%',
            center: ['30%', '50%'],
            label: {
              normal: {
                position: 'inner',
                show: true,
                formatter: '{d}%'
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
