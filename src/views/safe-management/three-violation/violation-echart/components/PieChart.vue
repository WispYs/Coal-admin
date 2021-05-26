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
        console.log(newData)
        this.options = {
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            right: 'right'
          },
          color: ['#d7638b', '#409EFF', '#67C23A', '#E6A23C'],
          series: [
            {
              name: '风险数量',
              type: 'pie',
              radius: '66%',
              data: newData
            }
          ]
        }
      }
    }
  }

}
</script>
