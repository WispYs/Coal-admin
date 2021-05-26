<template>
  <Echart id="productChart" :options="options" height="460px" />
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
        const legendData = [] // 标记说明文字
        const seriesData = [] // 数据信息
        const colorArr = ['#0193c2', '#039580'] // 线条颜色
        newData.yLabel.forEach((it, index) => {
          legendData.push(it.name)
          seriesData.push({
            name: it.name,
            data: it.value,
            type: 'line',
            smooth: 0.4,
            itemStyle: {
              normal: {
                color: colorArr[index] || '#000', // 改变折线点的颜色
                lineStyle: {
                  color: colorArr[index] || '#000' // 改变折线颜色
                }
              }
            },
            emphasis: {
              focus: 'series'
            }
          })
        })
        this.options = {
          // title: {
          //   text: '今日产量趋势',
          //   left: 'center',
          //   top: 20,
          //   textStyle: {
          //     color: '#787878',
          //     fontWeight: 'normal',
          //     fontSize: 14
          //   }
          // },
          legend: {
            top: 30,
            right: 10,
            data: legendData
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '6%',
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
              data: newData.xLabel
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
          series: seriesData
        }
      }
    }
  }

}
</script>
