const Mock = require('mockjs')

/** ---- 机电管理 ---- **/
// 大型设备列表
const largeEquipmentData = Mock.mock({
  'items|3': [{
    'deviceCode|+1': ['GQ100001', 'GQ100002', 'GQ100003'],
    'deviceName|+1': ['落地式多绳摩擦提升机', '落地式多绳摩擦提升机', '落地式多绳摩擦提升机'],
    'area|+1': [1, 2, 3],
    'part|+1': [1, 2, 3],
    'std|1': ['JKLD5*4'],
    factory: '中信重工',
    'assetsCode|+1': ['001021221', '001021223', '001021226'],
    outFacTime: '',
    arrivalTime: '',
    useTime: '2021-01-31',
    rawValue: 120,
    netValue: 120,
    runTime: 60,
    file: '无附件',
    barCode: '二维码'

  }]
})
// 所属场所
const equipmentAreaData = [
  {
    children: [{ label: '提升机', value: '2' }],
    label: '中央区主井提升机房',
    value: '1'
  }, {
    children: [{ label: '提升机', value: '4' }],
    label: '中央区副井提升机房',
    value: '3'
  }, {
    children: [{ label: '空气压缩机', value: '6' }],
    label: '中央区压风机房',
    value: '5'
  }, {
    children: [{ label: '减压装置', value: '8' }, { label: '组合开关', value: '9' }, { label: '电动机', value: '10' }],
    label: '中央区井下水泵房',
    value: '7'
  }
]
// 大型设备类型
const largeEquipmentTypeData = Mock.mock({
  'items|3': [{
    'id|+1': [1, 2, 3],
    'name|+1': ['中央区主井提升机房', '中央区副井提升机房', '中央区压风机房'],
    'sort|+1': [1, 2, 3],
    createData: '2021-01-31',
    'area|+1': [1, 2, 3],
    remark: '',
    children: [
      {
        id: 4,
        name: '提升机',
        sort: 10,
        createDate: '',
        area: 1,
        remark: ''
      }
    ]
  }]
})
// 维修知识库
const knowLedgeData = Mock.mock({
  'items|3': [{
    area: 1,
    'project|+1': ['检查风道', '防爆门', '轴承'],
    'addr|+1': ['风道', '反风设施', '电机'],
    'period|+1': ['月', '季度', '周'],
    person: '',
    standard: '',
    remark: ''
  }]
})
// 设备能耗分析知识库
const disKnowLedgeData = Mock.mock({
  'items|3': [{
    area: 1,
    standard: 'GB/T 2941231',
    'alarm|+1': [0.5, 0.13, 0.85],
    'unit|+1': ['Kwh/T.ah'],
    'explain|+1': ['每吨水百米扬程消耗的电能', '兆帕每小时风流量', '副井提升机'],
    formula: '<p>x + y = z</p>',
    decision: '',
    evaluate: '<p>C</p>'
  }]
})

/** ---- 运输管理 ---- **/
// 典型故障知识库
const typicalFaultData = Mock.mock({
  'items|3': [{
    'area|+1': [1, 2, 3],
    'fault|+1': [1, 2, 3],
    'level|+1': [1, 2, 3],
    phenomenon: '',
    reason: '',
    way: '',
    remark: ''
  }]
})
// 历史故障知识库
const historyFaultData = Mock.mock({
  'items|3': [{
    'area|+1': [1, 2, 3],
    'keyword|+1': ['副井更换主电机', '主井电控故障处理', '主井底积煤'],
    'time|+1': ['2019-12-01', '2019-12-12', '2020-01-21'],
    record: '',
    reason: '',
    way: ''
  }]
})

/** ---- 检修管理 ---- **/
// 检修计划
const servicePlanData = Mock.mock({
  'items|3': [{
    'area|+1': [1, 2, 3],
    'name|+1': ['主电机碳刷', '电气部分'],
    'time|+1': ['2019-12-01', '2019-12-12', '2020-01-21'],
    'period|+1': [1, 2, 3, 4],
    'warning|+1': [10, 2],
    'alarm|+1': [5, 0],
    remind: '',
    person: '管理员',
    copyPerson: '',
    copy: '',
    maintain: '',
    remark: ''
  }]
})
// 设备维修
const equipmentServiceData = Mock.mock({
  'items|3': [{
    'area|+1': [1, 2, 3],
    'name|+1': ['主电机碳刷', '电气部分'],
    'type|+1': [1, 2, 3, 4],
    'fault|+1': ['中央泵房启动器...', ''],
    condition: '',
    'status|+1': [1, 2],
    course: '',
    result: '',
    person: '',
    'time|+1': ['2019-12-01', '2019-12-12', '2020-01-21'],
    file: ''
  }]
})
// 备品备件
const SparePartData = Mock.mock({
  'items|3': [{
    'area|+1': ['1', '2', '3'],
    'name|+1': ['主电机碳', '电气部分'],
    'model|+1': ['CXJ2031'],
    unit: '',
    addr: '',
    store: '',
    sum: '',
    warning: '',
    person: '',
    updater: '',
    'status|1': [1, 2]
  }]
})

/** ---- 设备管理 ---- **/
// 供应商管理
const supplierData = Mock.mock({
  'items|3': [{
    area: 1,
    'supplier|+1': ['安徽普特', '安徽三正', '安徽巨正'],
    telephone: '',
    addr: '',
    postcode: '',
    fax: '',
    url: '',
    person: '',
    position: '',
    contact: '',
    phone: '',
    email: '',
    remark: ''
  }]
})

module.exports = [
  // 大型设备列表
  {
    url: '/device/detail/list',
    type: 'post',
    response: config => {
      const items = largeEquipmentData.items
      return {
        code: 200,
        data: {
          records: items.length,
          rows: items
        }
      }
    }
  },
  // 设备所属场所
  {
    url: '/equipment-area/list',
    type: 'get',
    response: config => {
      const items = equipmentAreaData
      return {
        code: 200,
        data: items
      }
    }
  },
  // 大型设备类型列表
  {
    url: '/large-equipment-type/list',
    type: 'get',
    response: config => {
      const items = largeEquipmentTypeData.items
      return {
        code: 200,
        data: {
          records: items.length,
          rows: items
        }
      }
    }
  },
  // 维修知识库
  {
    url: '/know-ledge/list',
    type: 'get',
    response: config => {
      const items = knowLedgeData.items
      return {
        code: 200,
        data: {
          records: items.length,
          rows: items
        }
      }
    }
  },
  // 设备能耗分析知识库
  {
    url: '/dissipation-know-ledge/list',
    type: 'get',
    response: config => {
      const items = disKnowLedgeData.items
      return {
        code: 200,
        data: {
          records: items.length,
          rows: items
        }
      }
    }
  },
  // 典型故障知识库
  {
    url: '/typical-fault/list',
    type: 'get',
    response: config => {
      const items = typicalFaultData.items
      return {
        code: 200,
        data: {
          records: items.length,
          rows: items
        }
      }
    }
  },
  // 历史故障知识库
  {
    url: '/history-fault/list',
    type: 'get',
    response: config => {
      const items = historyFaultData.items
      return {
        code: 200,
        data: {
          records: items.length,
          rows: items
        }
      }
    }
  },
  // 检修计划
  {
    url: '/service-plan/list',
    type: 'get',
    response: config => {
      const items = servicePlanData.items
      return {
        code: 200,
        data: {
          records: items.length,
          rows: items
        }
      }
    }
  },
  // 设备维修
  {
    url: '/equipment-service/list',
    type: 'get',
    response: config => {
      const items = equipmentServiceData.items
      return {
        code: 200,
        data: {
          records: items.length,
          rows: items
        }
      }
    }
  },
  // 查看备品备件
  {
    url: '/spare-part/list',
    type: 'get',
    response: config => {
      const items = SparePartData.items
      return {
        code: 200,
        data: {
          records: items.length,
          rows: items
        }
      }
    }
  },
  // 供应商管理
  {
    url: '/supplier/list',
    type: 'post',
    response: config => {
      const items = supplierData.items
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

