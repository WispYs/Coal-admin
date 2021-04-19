// 应急救援指南菜单下配置

// 事故管理
const AccidentTableConfig = {
  actions: ['preview', 'delete'],
  checkbox: true,
  columns: [
    { label: '序号', field: 'index', layout: 'Text', placeholder: '请填写序号', disabled: true },
    { label: '事故单位', field: 'accidentUnit', layout: 'Text', placeholder: '请填写事故单位', disabled: true },
    { label: '事故类别', field: 'accidentType', layout: 'Select', require: true, options: [
      { value: 1, label: '模板1' },
      { value: 2, label: '模板2' },
      { value: 3, label: '模板3' }
    ], placeholder: '请填写事故类别' },
    { label: '流程类型', field: 'flowType', layout: 'Checkbox', options: [
      {
        value: '阶段一',
        label: '综合预案流程'
      }]
    },
    { label: '影响人员', field: 'influencePerson', layout: 'Text', placeholder: '请填写影响人员' },
    { label: '事故地点', field: 'accidentPath', layout: 'Select', require: true, options: [
      {
        value: '阶段一',
        label: '综合预案流程'
      }], placeholder: '请填写事故地点' },
    { label: '填报人员', field: 'fillUserName', layout: 'Text', placeholder: '请填写填报人员' },
    { label: '事故时间', field: 'accidentTime', layout: 'DateTime', require: true, placeholder: '请填写事故时间' },
    { label: '联系电话', field: 'relationPhone', layout: 'Text', placeholder: '请填写联系电话' },
    { label: '事故状态', field: 'accidentStatus', layout: 'Text', placeholder: '请填写事故状态' },
    { label: '处理情况', field: 'situation', layout: 'Textarea', require: true, placeholder: '请填写处理情况' }
  ]
}

// 事故管理头部配置
const AccidentFilterConfig = {
  actions: ['search', 'reset', 'create', 'delete', 'refresh'],
  filters: [
    { label: '搜索', field: 'keyword', width: '220', layout: 'Text', placeholder: '事故类型、事故地点' }
  ]
}

// 应急流程table表
const EmergencyTableConfig = {
  actions: ['edit', 'delete'],
  checkbox: true,
  columns: [
    { label: '序号', field: 'index', layout: 'Text', placeholder: '请填写序号', disabled: true },
    { label: '矿井名称', field: 'mineName', layout: 'Text', placeholder: '请填写矿井名称', disabled: true },
    { label: '模板名称', field: 'templateName', layout: 'Text', placeholder: '请填写模板名称', require: true },
    { label: '模板类型', field: 'templateType', layout: 'Select', options: [
      { value: 1, label: '模板1' },
      { value: 2, label: '模板2' },
      { value: 3, label: '模板3' }
    ], placeholder: '请填写模板类型', require: true },
    { label: '流程描述', field: 'processDesc', layout: 'Textarea', placeholder: '请填写流程描述' },
    { label: '流程状态', field: 'processStatus', layout: 'Select', options: [
      { value: 1, label: '状态1' },
      { value: 2, label: '状态2' }
    ], placeholder: '请填写流程状态' },
    { label: '创建时间', field: 'createTime', layout: 'Text', placeholder: '请填写创建时间', disabled: true }
  ]
}

// 应急流程头部配置
const EmergencyFilterConfig = {
  actions: ['search', 'reset', 'create', 'delete'],
  filters: [
    { label: '搜索', field: 'keyword', width: '220', layout: 'Text', placeholder: '请输入模板名称' }
  ]
}

export {
  AccidentTableConfig,
  AccidentFilterConfig,
  EmergencyTableConfig,
  EmergencyFilterConfig
}
