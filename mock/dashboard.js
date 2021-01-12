const Mock = require('mockjs')

const data = Mock.mock({
  'items|12': [{
    'month|+1': 1,
    'value|100-1000': 1
  }]
})

module.exports = [
  {
    url: '/example/dashboard/line-data',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
