const Mock = require('mockjs')

const data = Mock.mock({
  'lineData|12': [{
    'month|+1': 1,
    'value|100-1000': 1
  }],
  'lineCount|5000-10000': 5000,
  'barData|4': [{
    'name|+1': ['重大风险', '较大风险', '轻微风险', '一般风险'],
    'value|+1': [22, 1, 0, 0]
  }],
  barCount: 23,
  'barData2|4': [{
    'name|+1': ['一般隐患C', '一般隐患B', '一般隐患A', '重大隐患'],
    'value|+1': [1261, 27, 0, 0]
  }],
  barCount2: 1288,
  'barData3|4': [{
    'name|+1': ['一般', '严重', '重点', '红线'],
    'value|+1': [1261, 27, 0, 0]
  }],
  barCount3: 1288

})

module.exports = [
  {
    url: '/example/dashboard/statistic-data',
    type: 'get',
    response: config => {
      const lineData = data.lineData
      const barData = data.barData
      const barData2 = data.barData2
      const barData3 = data.barData3
      const barCount = data.barCount
      const barCount2 = data.barCount2
      const barCount3 = data.barCount3
      const lineCount = data.lineCount
      return {
        code: 20000,
        data: {
          lineCount: lineCount,
          lineData: lineData,
          barData: barData,
          barData2: barData2,
          barData3: barData3,
          barCount: barCount,
          barCount2: barCount2,
          barCount3: barCount3
        }
      }
    }
  }
]
