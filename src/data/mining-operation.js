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
   * @param {string}  rowKey            行数据的key，渲染树形表格必填，一般选唯一字段 id
   */
  actions: ['edit', 'delete'],
  summary: false,
  summaryField: [],
  columns: [
    { label: '规程编号', field: 'rid', width: '150', layout: 'Text', placeholder: '请填写规程编号' },
    { label: '规程名称', field: 'name', width: '220', layout: 'Text', placeholder: '请填写规程名称' },
    { label: '编辑人', field: 'editor', width: '120', layout: 'Text', placeholder: '请填写编辑人' },
    { label: '编辑时间', field: 'editDate', width: '120', sortable: true, layout: 'DateTime', placeholder: '请选择编辑时间' },
    { label: '施工单位', field: 'team', width: '', layout: 'Text', placeholder: '请填写施工单位' },
    { label: '执行时间', field: 'executeDate', width: '120', sortable: true, layout: 'DateTime', placeholder: '请选择执行时间' },
    { label: '作业规程文件', field: 'operateFile', width: '150', layout: 'Upload', showType: 'underline', placeholder: '请上传附件' },
    { label: '补充措施文件', field: 'measureFile', width: '150', layout: 'Upload', showType: 'underline', placeholder: '请上传附件' }
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
    { label: '规程名称', field: 'name', width: '220', layout: 'Text', placeholder: '规程编号、规程名称' }
  ]
}
