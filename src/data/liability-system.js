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
   * @param {boolean} hidden            是否在表格中隐藏，默认false，值为true时只在新建、编辑中显示该字段
   * @param {string}  showType          表格内数据显示方式，属于对展现形式有特殊要求的配置项，例如：colorLump 色块显示
   * @param {string}  rowKey            行数据的key，渲染树形表格必填，一般选唯一字段 id
   */
  actions: ['edit', 'delete'],
  summary: false,
  summaryField: [],
  columns: [
    { label: '负责人', field: 'proMan', width: '200', layout: 'Text', placeholder: '请填写负责人' },
    { label: '所属组织', field: 'organization', width: '200', layout: 'Text', placeholder: '请填写所属组织' },
    { label: '职位', field: 'position', width: '200', layout: 'Text', placeholder: '请填写职位' },
    { label: '创建日期', field: 'createDate', width: '200', sortable: true, layout: 'DateTime', placeholder: '请选择日期' },
    { label: '责任和义务', field: 'liability', width: '', layout: 'Textarea', placeholder: '请填写责任和义务' }
  ]
}

export const FilterConfig = {
  /**
   * @param {array} actions   操作按钮
   * @param {array} filters   筛选项
   * @param {array} options   选择器配置项
   */
  actions: ['search', 'reset', 'create'],
  filters: [
    { label: '负责人名称', field: 'name', width: '220', layout: 'Text', placeholder: '负责人、职位' }
  ]
}
