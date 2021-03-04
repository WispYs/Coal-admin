const Mock = require('mockjs')

const data = Mock.mock({
  items: [{
    proMan: '张经理',
    organization: '顾桥煤矿',
    position: '项目经理',
    liability: '',
    createDate: '2021.01.27'
  }]
})

module.exports = [
  // table 数据
  {
    url: '/liability-system/list',
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

