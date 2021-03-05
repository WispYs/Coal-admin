const Mock = require('mockjs')

const data = Mock.mock({
  'items|5': [{
    'rid|+1': ['GC-1311(1)-1', 'GC-1311(1)-2', 'GC-1311(3)', 'CJZYGC-4', 'GC-1125(3)'],
    'name|+1': ['1311(1)工作面轨顺掘进作业规程', '1311(1)运输顺槽掘进作业规程', '1311(3)底抽巷及联巷作业规程', '北二13-1变电所安全措施', '1125(3)运输顺槽掘进作业规程'],
    'editor|+1': ['王大陆', '李德军', '张登科', '杜德文'],
    'editDate|+1': ['2020.08.01', '2020.07.11', '2020.06.14', '2020.06.23', '2020.04.22'],
    'team|+1': ['开拓一区101队', '开拓一区102队', '开拓一区103队', '开拓二区101队', '开拓二区102队'],
    'executeDate|+1': ['2020.08.01', '2020.07.11', '2020.06.14', '2020.06.23', '2020.04.22'],
    operateFile: '作业规程文件',
    measureFile: '补充措施文件'
  }]
})

module.exports = [
  // table 数据
  {
    url: '/mining-operation/list',
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

