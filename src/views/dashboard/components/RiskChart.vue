<template>
  <Echart id="riskChart" :options="options" width="180px" height="180px" />
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
        console.log(newData)
        this.options = {
          title: {
            text: newData.name,
            x: 'center',
            y: 'bottom',
            textStyle: {
              color: '#333',
              fontSize: 14
            }
          },
          grid: {
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
              type: 'pie',
              radius: ['60%', '70%'],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center',
                formatter: '{c}',
                fontSize: '32',
                color: '#000'
              },
              labelLine: {
                show: false
              },
              color: [newData.color, '#f2f2f2'],
              data: [
                {
                  value: newData.value,
                  label: {
                    normal: {
                      show: true
                    }
                  }
                },
                {
                  value: 50 - newData.value,
                  emphasis: {
                    label: {
                      normal: {
                        show: false
                      }
                    }
                  }
                }
              ]
            }
          ]
        }
      }
    }
  }

}
</script>
