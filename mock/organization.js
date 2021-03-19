const Mock = require('mockjs')

const data = Mock.mock({
  items: [{
    name: '顾桥煤矿',
    id: '009',
    remark: '',
    sort: 1,
    createDate: '2021.01.27'
  }]
})

module.exports = [
  // table 数据
  {
    url: '/organization/list',
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

