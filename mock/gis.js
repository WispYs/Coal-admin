const Mock = require('mockjs')

const data = Mock.mock({
  'items|5': [{
    id: '@id',
    'name|1': ['激光甲烷', '掘进机', '中央区主井提升机房', '浓缩车间'],
    'x|+1': [1559.225037204311, 1556.1388608468196, 1515.3653246869897, 1507.8572012333018, 1614.5037713000825],
    y: 0,
    'z|+1': [-1027.7581974978002, -1087.6956869685177, -1111.9308294518137, -1126.6766807466506, -1147.8396350954085]

  }]
})

const dataInfo = Mock.mock({
  items: {
    id: '@id',
    'name|1': ['激光甲烷', '掘进机', '中央区主井提升机房', '浓缩车间'],
    x: 1515.3653246869897,
    y: 0,
    z: -1111.9308294518137,
    'type|1': ['激光甲烷', '掘进机', '中央区主井提升机房', '浓缩车间'],
    'addr|1': ['中区11-2采区煤层回风T回'],
    num: '@integer(0, 100)',
    currDate: '@date("yyyy-MM-dd")'
  }
})

module.exports = [
  // table 数据
  {
    url: '/gis/viewPoint',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 200,
        data: {
          total: items.length,
          records: items
        }
      }
    }
  },

  {
    url: '/gis/pointInfo\.*',
    type: 'get',
    response: config => {
      return {
        code: 200,
        data: dataInfo.items
      }
    }
  }
]

