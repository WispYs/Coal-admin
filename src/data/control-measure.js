export const TableConfig = {
  /**
   * 这种表格配置表对整个项目而言耦合性较高，后续每次对表格有特殊要求都需要修改
   * 而且由于某些字段需要前端方法处理，所以这个配置也应由前端定义交给后端，然后再通过接口动态调用
   *
   * @param {array}   actions           操作按钮，例如：['preview', 'edit', 'delete', 'upload', 'other']
   * @param {string}  otherActionTitle  其他特定操作按钮文本
   * @param {boolean} summary           是否需要合计数据
   * @param {array}   summaryField      合计字段
   * @param {boolean} inlineEdit        是否支持在表格行内直接编辑，默认不支持且编辑为弹窗形式
   * @param {array}   columns           每列参数
   * @param {boolean} sortable          是否需要排序
   * @param {string}  align             单元表格对齐方向，默认为'center'
   * @param {string}  unit              字段单位，例如：元、kw/h
   * @param {string}  layout            表单类型
   * @param {string}  dateFormat        日期格式
   * @param {array}   options           选择器配置项
   * @param {string}  showType          表格内数据显示方式，属于对展现形式有特殊要求的配置项，例如：colorLump 色块显示
   */
  actions: ['other'],
  otherActionTitle: ['落实情况'],
  summary: false,
  summaryField: [],
  columns: [
    { label: '风险类型', field: 'riskType', width: '90', layout: 'Select',
      options: [
        {
          value: 1,
          label: '环'
        }, {
          value: 2,
          label: '机'
        }, {
          value: 3,
          label: '管'
        }, {
          value: 4,
          label: '环,管'
        }
      ], placeholder: '请选择风险类型' },
    { label: '辨别时间', field: 'date', width: '200', sortable: true, layout: 'DateTime', placeholder: '请选择日期' },
    { label: '风险点名称', field: 'riskPoint', width: '150', layout: 'Select',
      options: [
        {
          value: 1,
          label: 'b26445d84562'
        }, {
          value: 2,
          label: '1126(1)工作面'
        }, {
          value: 3,
          label: '东区副井提升系统'
        }, {
          value: 4,
          label: '中央区副井提升系统'
        }
      ], placeholder: '请选择风险点' },
    { label: '事故类型', field: 'accidentType', width: '150', layout: 'Select',
      options: [
        {
          value: 1,
          label: '年度辨别'
        }, {
          value: 2,
          label: '设计前'
        }, {
          value: 3,
          label: '变化后'
        }, {
          value: 4,
          label: '事故前'
        }
      ], placeholder: '请选择事故类型' },
    { label: '风险等级', field: 'riskLevel', width: '150', showType: 'colorLump', layout: 'Select',
      options: [
        {
          value: 1,
          label: '没有风险'
        }, {
          value: 2,
          label: '轻度风险'
        }, {
          value: 3,
          label: '较大风险'
        }, {
          value: 4,
          label: '重大风险'
        }
      ], placeholder: '请选择风险等级' },
    { label: '主要危险有害因素', field: 'riskFactor', width: '180', layout: 'Text', placeholder: '请填写主要危险有害因素' },
    { label: '管控措施', field: 'controlMeasure', width: '180', layout: 'Textarea', placeholder: '请填写管控措施' },
    { label: '应急措施', field: 'emergencyMeasure', width: '180', layout: 'Textarea', placeholder: '请填写管控措施' },
    { label: '管控等级', field: 'controlLevel', width: '120', layout: 'Text', placeholder: '请填写管控等级' },
    { label: '责任人', field: 'proMan', width: '120', layout: 'Text', placeholder: '请填写责任人' },
    { label: '检查频次', field: 'checkTime', width: '120', layout: 'Text', placeholder: '请填写检查频次' },
    { label: '状态', field: 'status', width: '110', layout: 'Select',
      options: [
        {
          value: 1,
          label: '未辨别'
        }, {
          value: 2,
          label: '辨别中'
        }, {
          value: 3,
          label: '已辨别'
        }
      ], placeholder: '请选择状态' }
  ]
}

export const FilterConfig = {
  /**
   * @param {array} actions   操作按钮
   * @param {array} filters   筛选项
   * @param {array} options   选择器配置项
   */
  actions: ['search', 'reset'],
  filters: [
    { label: '事故类型', field: 'name', width: '220', layout: 'Text', placeholder: '请输入事故类型' }
  ]
}
