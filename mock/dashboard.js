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
  barCount: 23

})

module.exports = [
  {
    url: '/example/dashboard/statistic-data',
    type: 'get',
    response: config => {
      const lineData = data.lineData
      const barData = data.barData
      const lineCount = data.lineCount
      return {
        code: 20000,
        data: {
          lineCount: lineCount,
          lineData: lineData,
          barData: barData
        }
      }
    }
  }
]
