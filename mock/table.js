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
    'open|1': true

  }]
})

const nestData = Mock.mock({
  'items|5': [{
    'team|+1': ['一区101队', '一区102队', '一区103队', '一区104队', '一区105队'],
    addr: '@city',
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
  // nest-table 数据
  {
    url: '/example/nest-table/list',
    type: 'get',
    response: config => {
      const items = nestData.items
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

