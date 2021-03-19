const Mock = require('mockjs')

const data = Mock.mock({
  'items|5': [{
    'name|+1': ['1126（1）工作面', '1815（3）工作面', '1016（2）工作面', '1540（1）工作面', '1020（2）工作面'],
    'date|+1': ['2020.08.01', '2020.07.11', '2020.06.14', '2020.06.23', '2020.04.22'],
    eventName: '过构造',
    describe: '前方构造',
    'files|+1': ['1126（1）工作面附件', '1815（3）工作面附件', '1016（2）工作面附件', '1540（1）工作面附件', '1020（2）工作面附件'],
    yields: 80.56,
    yTotal: 97,
    push: 0,
    pTotal: 1680,
    lifecycle: [
      {
        dateTime: '2020-8-20',
        event: '过构造',
        describe: '前方构造',
        complete: true
      }, {
        dateTime: '2020-8-1',
        event: '过断层',
        describe: '过断层',
        complete: true
      }
    ]
  }]
})

module.exports = [
  // table 数据
  {
    url: '/working-lifecycle/list',
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

