const Mock = require('mockjs')

const applicationData = Mock.mock({
  items: [{
    name: '顾桥煤矿',
    url: 'http://127.0.0.1:8080',
    department: 2,
    sort: 1,
    remark: ''
  }]
})

module.exports = [
  // table 数据
  {
    url: '/application/list',
    type: 'get',
    response: config => {
      const items = applicationData.items
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

