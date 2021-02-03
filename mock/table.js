const Mock = require('mockjs')

Mock.Random.extend({
  stages: ['阶段一', '阶段二', '阶段三'],
  // 自定义占位符名字tags
  tags: function(min, max) {
    return this.pick(this.stages, min, max)
  }
})

const data = Mock.mock({
  'items|10': [{
    // table1
    id: '@id',
    title: '@cword(3,10)',
    'status|1': [1, 2, 3, 4],
    person: '@cname',
    time: '@datetime',
    money: '@integer(1000, 3000)',
    completed: '@integer(0, 100)',
    'urgency|1': true,
    'type|1': ['类型一', '类型二'],
    stage: '@tags(1, 2)',
    remark: '@cword(5,10)',

    // table2
    'name|1': ['柜式风机', '测速传感器', '除尘器', '防火阀', '皮带机'],
    date: '@date("yyyy-MM-dd")',
    describe: '@cparagraph(1,3)',
    region: '@region',
    'risk|1': [1, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4],
    'open|1': ['开启', '关闭']

  }]
})

const multData = Mock.mock({
  'items|5': [{
    'team|+1': ['一区101队', '一区102队', '一区103队', '一区104队', '一区105队'],
    addr: '@city(true)',
    'groups|3': [
      {
        'group|+1': ['第一班', '第二班', '第三班'],
        monitor: '@cname',
        count: '@integer(10, 50)',
        'workload|1-5.2': 1,
        workplan: '@integer(50, 100)'
      }
    ]
  }]
})

const uploadData = Mock.mock({
  'items|5': [{
    id: '@id',
    'title|+1': ['2020年12月地形地质图', '2020年11月地形地质图', '2020年10月地形地质图', '2020年09月地形地质图', '2020年08月地形地质图'],
    updateTime: '@datetime',
    uploader: '@cname'
  }]
})

const reportData = Mock.mock({
  'items|10': [{
    id: '@id',
    'team|+1': ['掘203', '掘203', '掘205', '掘205', '掘202', '掘202', '掘101', '掘101', '掘105', '掘105'],
    'addr|+1': ['1311(3)底抽巷', '1311(3)轨顺提料斜巷', '1311(1)运顺', '1127(1)运顺底抽巷', '1127(3)底抽巷'],
    startTime: '@date("yyyy-MM-dd")',
    endTime: '@date("yyyy-MM-dd")',
    'model|+1': ['FBDNo.8.0', 'FBDNo.8.0', 'FBDNo.6.3', 'FBDNo.8.0', 'FBDNo.7.5'],
    'run|+1': ['1 × 55', '1 × 55', '1 × 30', '1 × 55', '2× 55'],
    'standby|+1': ['1 × 55', '1 × 55', '1 × 30', '1 × 55', '2× 55'],
    'status|1': ['单级', '双级'],
    'diameter|1': ['800', '1000'],
    blowingRate: '@integer(500, 1000)',
    editable: ['addr', 'run', 'standby', 'status', 'diameter']
  }]
})

module.exports = [
  // table 数据
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
  },
  // mult-table 数据
  {
    url: '/example/mult-table/list',
    type: 'get',
    response: config => {
      const items = multData.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  },
  // upload-table 数据
  {
    url: '/example/upload-table/list',
    type: 'get',
    response: config => {
      const items = uploadData.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  },
  // report-table 数据
  {
    url: '/example/report-table/list',
    type: 'get',
    response: config => {
      const items = reportData.items
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

