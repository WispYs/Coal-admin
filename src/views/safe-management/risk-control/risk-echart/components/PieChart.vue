<template>
  <Echart id="pieChart" :options="options" />
</template>

<script>
import Echart from '@/components/Echarts'

export default {
  components: {
    Echart
  },
  props: {
    cdata: {
      type: Array,
      default: () => ([])
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
        // console.log(newData)
        this.options = {
          tooltip: {
            trigger: 'item'
          },
          // grid: {
          //   top: 10,
          //   left: '2%',
          //   right: '2%',
          //   bottom: '2%',
          //   containLabel: true
          // },
          legend: {
            orient: 'vertical',
            right: 'right'
          },
          color: ['#d7638b', '#409EFF', '#67C23A', '#E6A23C'],
          series: [
            {
              name: '风险数量',
              type: 'pie',
              radius: '85%',
              data: newData,
              label: {
                show: false
              },
              labelLine: {
                show: false
              },
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
      }
    }
  }

}
</script>
