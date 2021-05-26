<template>
  <Echart id="numberChart" :options="options" height="160px" />
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
          series: [
            {
              type: 'gauge', // 类型：仪表盘图
              title: {
                offsetCenter: [0, '70%'], // 系列标题文字（效果图中的“制造业”）的位置，第一个为横坐标，第二个为纵坐标
                color: '#000', // 字体颜色
                fontSize: 14
              },
              detail: { // 设置效果图中文字“30.25%”的相关配置
                formatter: '{value}',
                offsetCenter: [0, 0],
                color: '#000',
                fontSize: 38
              },
              data: [{
                value: newData.value,
                name: newData.name
              }],
              radius: '80%', // 环形的大小
              clockwise: true,
              axisLine: {
                show: true,
                lineStyle: {
                  color: [
                    [1, '#078afe']

                  ],
                  width: 14 // 环形的粗细
                }
              },
              splitLine: {
                show: false // 不显示分隔线
              },
              axisTick: {
                show: false // 不显示仪表盘刻度
              },
              axisLabel: {
                show: false
              },
              pointer: {
                show: false // 不显示仪表盘指针
              }
            }
          ]
        }
      }
    }
  }

}
</script>
