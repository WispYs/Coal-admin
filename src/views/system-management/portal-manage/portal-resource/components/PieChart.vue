<template>
  <Echart id="pieChart" :options="options" height="160px" />
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
          // tooltip: {
          //   trigger: 'item'
          // },
          // legend: {
          //   orient: 'vertical',
          //   top: 30,
          //   right: 10
          // },
          grid: {
            left: '4%',
            right: '10%',
            bottom: '10%',
            top: '10%',
            containLabel: true
          },
          series: [
            {
              type: 'pie',
              radius: '50%',
              data: newData.data,
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
