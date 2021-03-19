const Mock = require('mockjs')

const data = Mock.mock({
  'items|5': [{
    'riskType|1': [1, 2, 3, 4],
    'date|+1': ['2021-01-27 ', '2021-01-20 ', '2020-12-03 ', '2020-12-01 ', '2020-11-27 '],
    'riskPoint|1': [1, 2, 3, 4],
    'accidentType|1': [1, 2, 3, 4],
    'riskLevel|1': [1, 2, 3, 4],
    riskFactor: '',
    controlMeasure: '',
    emergencyMeasure: '',
    controlLevel: '',
    'proMan|1': ['无', '张永松', '王勇', '蔡阳', '张思德'],
    checkTime: '',
    'status|1': [1, 2, 3]
  }]
})

module.exports = [
  // table 数据
  {
    url: '/control-measure/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 200,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]

