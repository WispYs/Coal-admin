const Mock = require('mockjs')

const data = Mock.mock({
  'items|5': [{
    id: '@id',
    'name|1': ['激光甲烷', '掘进机', '中央区主井提升机房', '浓缩车间'],
    'x|+1': ['1538.008441168144', '1551.748573392647', '1544.8785033339032', '1509.7430327748073', '1487.3662379502528'],
    y: '0',
    'z|+1': ['-1153.9534187485617', '-1156.8977332607426', '-1122.1548302038602', '-1116.069916820267', '-1164.945526916239']

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
      console.log(config)
      return {
        code: 200,
        data: dataInfo.items
      }
    }
  }
]

