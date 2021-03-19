const Mock = require('mockjs')

const data = Mock.mock({
  'items|5': [{
    'position|1': ['安检', '一通三防', '机电运输', '掘进（中央区）', '采煤'],
    'riskPoint|1': [1, 2, 3, 4],
    'riskType|1': [1, 2, 3, 4],
    riskDesc: '',
    measure: '',
    'proMan|1': ['无', '张永松', '王勇', '蔡阳', '张思德'],
    'organization|1': ['通防科', '矿建科', '机电运输管理科', '机电安装科', '生产技术一科', '生产技术二科'],
    'riskLevel|1': [1, 2, 3, 4],
    'assessType|1': [1, 2, 3, 4],
    'startTime|+1': ['2021-01-27 ', '2021-01-20 ', '2020-12-03 ', '2020-12-01 ', '2020-11-27 '],
    endTime: '',
    'status|1': [1, 2, 3]
  }]
})

module.exports = [
  // table 数据
  {
    url: '/assessment-library/list',
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

