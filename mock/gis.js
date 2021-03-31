const Mock = require('mockjs')

const data = Mock.mock({
  'items|5': [{
    id: '@id',
    'name|1': ['激光甲烷', '掘进机', '中央区主井提升机房', '浓缩车间'],
    'controlPostion|+1': [
      { 'x': 1559.225037204311, 'y': 0, 'z': -1027.7581974978002 },
      { 'x': 1556.1388608468196, 'y': 0, 'z': -1087.6956869685177 },
      { 'x': 1515.3653246869897, 'y': 0, 'z': -1111.9308294518137 },
      { 'x': 1507.8572012333018, 'y': 0, 'z': -1126.6766807466506 },
      { 'x': 1614.5037713000825, 'y': 0, 'z': -1147.8396350954085 }
    ]
  }]
})

const dataInfo = Mock.mock({
  items: {
    id: '@id',
    'name|1': ['激光甲烷', '掘进机', '中央区主井提升机房', '浓缩车间'],
    'controlPostion|1': [
      { 'x': 1559.225037204311, 'y': 0, 'z': -1027.7581974978002 },
      { 'x': 1556.1388608468196, 'y': 0, 'z': -1087.6956869685177 },
      { 'x': 1515.3653246869897, 'y': 0, 'z': -1111.9308294518137 },
      { 'x': 1507.8572012333018, 'y': 0, 'z': -1126.6766807466506 },
      { 'x': 1614.5037713000825, 'y': 0, 'z': -1147.8396350954085 }
    ],
    'type|1': ['激光甲烷', '掘进机', '中央区主井提升机房', '浓缩车间'],
    'addr|1': ['中区11-2采区煤层回风T回'],
    num: '@integer(0, 100)',
    date: '@date("yyyy-MM-dd")'
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
          items: items
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
        data: {
          items: dataInfo.items
        }
      }
    }
  }
]

