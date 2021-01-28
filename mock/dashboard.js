const Mock = require('mockjs')

const data = Mock.mock({
  'lineData|12': [{
    'month|+1': 1,
    'value|100-1000': 1
  }],
  'lineCount|5000-10000': 5000,
  'barData|5': [{
    'name|+1': ['一般隐患A', '一般隐患B', '一般隐患C', '一般隐患D', '重大隐患'],
    'value|100-1000': 1
  }]
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
