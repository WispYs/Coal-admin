<template>
  <Echart id="stairChart" :options="options" height="400px" />
</template>

<script>
import Echart from '@/components/Echarts'
import { parseTime } from '@/utils'
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
            text: newData.title,
            subtext: '采掘接替开始时间：' + newData.startTime,
            textStyle: {
              color: '#333'
            },
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '0%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          yAxis: {
            type: 'category',
            boundaryGap: true,
            splitLine: { show: true },
            axisLine: {
              lineStyle: {
                color: '#666666'
              }
            },
            axisLabel: {
              textStyle: {
                color: '#666666'
              }
            },
            data: newData.name
          },
          xAxis: {
            name: '时间',
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#666666'
              }
            },
            axisLabel: {
              show: true,
              interval: 0,
              textStyle: {
                color: '#666666'
              },
              formatter: function(value) {
                const timestamp = new Date(newData.startTime).getTime() + 86400000 * value // 86400000，一天的毫秒数
                return parseTime(timestamp, 'yyyy-MM-dd')
              }
            }
          },
          series: [
            {
              name: '距离流程开始时间',
              type: 'bar',
              stack: '总量',
              itemStyle: {
                barBorderColor: '#ffffff',
                color: '#ffffff'
              },
              emphasis: {
                itemStyle: {
                  barBorderColor: '#ffffff',
                  color: '#ffffff'
                }
              },
              data: newData.beforeStart
            },
            {
              name: '生产时间',
              type: 'bar',
              stack: '总量',
              itemStyle: {
                color: '#bb5f5c'
              },
              label: {
                show: true,
                position: 'right',
                fontStyle: 'normal',
                fontSize: 12,
                formatter: function(params) {
                  let htmlStr = ''
                  htmlStr += '生产时间: ' + newData.workTime[params.dataIndex] + ' 天' + '\n'
                  htmlStr += '开始时间: ' + newData.sDate[params.dataIndex] + '\n'
                  htmlStr += '结束时间: ' + newData.eDate[params.dataIndex] + '\n'
                  htmlStr += '滞后天数: ' + newData.lateDay[params.dataIndex] + '\n'
                  return htmlStr
                }
              },
              data: newData.workTime
            }
          ]
        }
      }
    }
  }

}
</script>
