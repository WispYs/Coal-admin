<template>
  <Echart id="productChart" :options="options" />
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
          title: {
            text: '今日产量趋势',
            left: 'center',
            top: 20,
            textStyle: {
              color: '#787878',
              fontWeight: 'normal',
              fontSize: 14
            }
          },
          legend: {
            top: 30,
            right: 10,
            data: ['生产一班', '生产二班']
          },

          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              axisLine: {
                lineStyle: {
                  type: 'solid',
                  color: '#999', // 左边线的颜色
                  width: '2'// 坐标线的宽度
                }
              },
              axisLabel: {
                textStyle: {
                  color: '#333' // 坐标值得具体的颜色

                }
              },
              data: ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
            }
          ],
          yAxis: [
            {
              type: 'value',
              axisLine: {
                lineStyle: {
                  type: 'solid',
                  color: '#999', // 左边线的颜色
                  width: '2'// 坐标线的宽度
                }
              },
              axisLabel: {
                textStyle: {
                  color: '#333' // 坐标值得具体的颜色

                }
              }
            }
          ],
          series: [
            {
              name: '生产二班',
              type: 'line',
              smooth: true,
              stack: '总量',
              // label: {
              //   show: true,
              //   position: 'top'
              // },
              areaStyle: {
                normal: {
                  color: '#42b1c2' // 改变区域颜色
                }
              },
              itemStyle: {
                normal: {
                  color: '#0193c2', // 改变折线点的颜色
                  lineStyle: {
                    color: '#0193c2' // 改变折线颜色
                  }
                }
              },
              emphasis: {
                focus: 'series'
              },
              data: [0, 0, 0, 1400, 6330, 10301, 5304, 900, 4030, 9320, 213, 3102, 3852, 2620, 1230, 2410, 1101, 200]
            },
            {
              name: '生产一班',
              type: 'line',
              stack: '总量',
              areaStyle: {
                normal: {
                  color: '#7ec9c2' // 改变区域颜色
                }
              },
              itemStyle: {
                normal: {
                  color: '#039580', // 改变折线点的颜色
                  lineStyle: {
                    color: '#039580' // 改变折线颜色
                  }
                }
              },
              smooth: true,
              emphasis: {
                focus: 'series'
              },
              data: [0, 0, 0, 3400, 25330, 30301, 10304, 3300, 18030, 29320, 15213, 15102, 9852, 5620, 4230, 6410, 3101, 1200]
            }

          ]
        }
      }
    }
  }

}
</script>
