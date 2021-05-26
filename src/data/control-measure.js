export const controlMeasureConfig = {
  actions: ['other'],
  otherActionTitle: ['落实情况'],
  summary: false,
  summaryField: [],
  // checkbox: true,
  columns: [
    { label: '专业', field: 'majorId', width: '120', layout: 'Select', require: true,
      options: [], placeholder: '请选择专业' },
    { label: '风险点', field: 'riskId', width: '150', layout: 'Select', require: true,
      options: [], placeholder: '请选择风险点' },
    { label: '风险类型', field: 'riskTypeId', width: '120', layout: 'Select', require: true, multiple: true,
      options: [], placeholder: '请选择风险类型' },
    { label: '风险描述', field: 'riskDescribe', width: '120', layout: 'Textarea', require: true, placeholder: '请填写风险描述' },
    { label: '管控措施', field: 'measure', width: '120', layout: 'Textarea', require: true, placeholder: '请填写管控措施' },
    { label: '事故可能性', field: 'accidentPossibilityId', width: '120', layout: 'Select',
      options: [], hidden: true, placeholder: '请选择发生事故的可能性' },
    { label: '事故严重性', field: 'accidentHappensId', width: '120', layout: 'Select',
      options: [], hidden: true, placeholder: '请选择发生事故的后果严重性' },
    { label: '风险值', field: 'riskValue', width: '120', layout: 'Text', require: true, hidden: true, placeholder: '请填写风险值' },
    { label: '风险等级', field: 'riskGradeId', width: '100', layout: 'Select', require: true,
      options: [], placeholder: '请选择风险等级' },
    { label: '资金', field: 'capital', width: '120', layout: 'Text', hidden: true, placeholder: '请填写资金' },
    { label: '人数上限', field: 'personMax', width: '120', layout: 'Text', hidden: true, placeholder: '请填写人数上限' },
    { label: '责任人', field: 'riskUserName', width: '80', layout: 'Text', require: true, placeholder: '请填写负责人' },
    { label: '措施执行单位', field: 'executeUnit', width: '110', layout: 'Text', placeholder: '请填写措施执行单位' },
    { label: '辨别类型', field: 'identifyTheTypeId', width: '90', layout: 'Select', require: true,
      options: [], placeholder: '请选择辨别类型' },
    { label: '辨别开始时间', field: 'startTime', width: '160', sortable: true, layout: 'DateTime', immutable: true, placeholder: '请选择日期' },
    { label: '辨别结束时间', field: 'endTime', width: '160', sortable: true, layout: 'DateTime', immutable: true, placeholder: '请选择日期' },
    { label: '状态', field: 'riskStatus', width: '90', layout: 'Text', immutable: true, placeholder: '请选择状态' }
  ]
}

export const controlMeasureFilterConfig = {
  /**
   * @param {array} actions   操作按钮
   * @param {array} filters   筛选项
   * @param {array} options   选择器配置项
   */
  actions: ['search'],
  filters: [
    { label: '关键字', field: 'name', width: '220', layout: 'Text', placeholder: '风险点 辨别类型' }
  ]
}


export const controlMeasureImplementationConfig = {
  actions: ['edit','delete'],
  summary: false,
  summaryField: [],
  checkbox: true,
  columns: [
    { label: '落实人', field: 'updatedBy', width: '120', layout: 'Text', require: true, placeholder: '请填写落实人' },
    { label: '工作内容', field: 'workContent', width: '120', layout: 'Textarea', require: true, placeholder: '请选择工作内容' },
    { label: '落实情况', field: 'workableCondition', width: '150', layout: 'Textarea', require: true, placeholder: '请选择落实情况' },
    { label: '落实时间', field: 'workableTime', width: '120', layout: 'DateTime', require: true, placeholder: '请选择落实时间' }
  ]
}
