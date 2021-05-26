const Mock = require('mockjs')

const portalResourceData = Mock.mock({
  'items|5': [{
    title: '资源标题',
    'resource|1': ['1', '2', '3', '4'],
    'layout|1': ['1', '2', '3']
  }]
})

module.exports = [
  // 门户资源列表
  {
    url: '/portal-resource/list',
    type: 'get',
    response: config => {
      const items = portalResourceData.items
      return {
        code: 200,
        data: {
          records: items.length,
          rows: items
        }
      }
    }
  }

]

