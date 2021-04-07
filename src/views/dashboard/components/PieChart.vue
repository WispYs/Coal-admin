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
        this.options = {
          tooltip: {
            trigger: 'item'
          },
          grid: {
            top: 10,
            left: '2%',
            right: '2%',
            bottom: '2%',
            containLabel: true
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          series: [
            {
              name: '严重程度',
              type: 'pie',
              radius: '50%',
              data: newData,
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
