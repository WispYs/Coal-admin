const Mock = require('mockjs')

const data = Mock.mock({
  'items|10': [{
    id: '@id',
    title: '@cparagraph(1,3)',
    'status|1': [1, 2, 3, 4],
    author: '@cname',
    start_time: '@datetime',
    money: '@integer(1000, 3000)',
    completed: '@integer(0, 100)%'
  }]
})

module.exports = [
  {
    url: '/example/table/list',
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
