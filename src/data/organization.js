export const OTableConfig = {
  /**
   * 这种表格配置表对整个项目而言耦合性较高，后续每次对表格有特殊要求都需要修改
   * 而且由于某些字段需要前端方法处理，所以这个配置也应由前端定义交给后端，然后再通过接口动态调用
   *
   * @param {array}   actions           操作按钮，例如：['preview', 'edit', 'delete', 'upload', 'other']
   * @param {string}  otherActionTitle  其他特定操作按钮文本
   * @param {number}  actionWidth       操作按钮表格长度，Number类型，默认为 160
   * @param {boolean} summary           是否需要合计数据
   * @param {array}   summaryField      合计字段
   * @param {boolean} inlineEdit        是否支持在表格行内直接编辑，默认不支持且编辑为弹窗形式
   * @param {boolean} noSerialNum       是否隐藏表格序号，默认false，值为true时为隐藏序号
   * @param {array}   columns           每列参数
   * @param {boolean} sortable          是否需要排序
   * @param {string}  align             单元表格对齐方向，默认为'center'
   * @param {string}  unit              字段单位，例如：元、kw/h
   * @param {string}  layout            表单类型
   * @param {boolean} require           是否为必填字段，默认false为非必填
   * @param {boolean} rule              自定义验证方法
   * @param {string}  dateFormat        日期格式
   * @param {array}   options           选择器配置项
   * @param {boolean} hidden            是否在表格中隐藏，默认false，值为true时只在新建、编辑中显示该字段
   * @param {boolean} disabled          不可在新增、编辑中修改的字段，默认false，值为true时表示该字段后台自动生成不可编辑
   * @param {string}  showType          表格内数据显示方式，属于对展现形式有特殊要求的配置项，例如：colorLump-有背景色块;underline-下划线可点击
   * @param {string}  underlineText     表格内数据显示方式为underline时，下划线的文字
   * @param {string}  rowKey            行数据的key，渲染树形表格必填，一般选唯一字段 id
   * @param {boolean} lazy              是否异步加载树形表格子节点数据，默认false，值为true时为异步
   * @param {boolean} multiple          下拉选择是否多选,默认false，值为true时多选
   */
  actions: ['edit', 'delete'],
  rowKey: 'aqglRiskTissueId',
  summary: false,
  summaryField: [],
  checkbox: false,
  noSerialNum: true,
  lazy: true,
  columns: [
    { label: '名称', field: 'aqglRiskTissueName', width: '200', layout: 'Text', placeholder: '请填写名称' },
    { label: '编号', field: 'aqglRiskTissueId', width: '150', layout: 'Text', disabled: true, placeholder: '请填写编号' },
    { label: '创建日期', field: 'createTime', width: '200', sortable: true, layout: 'DateTime', disabled: true, placeholder: '请选择日期' },
    { label: '排序', field: 'orderNum', width: '150', layout: 'Text', placeholder: '请选择排序' },
    { label: '上级节点', field: 'parentId', layout: 'TreeSelect', hidden: true,
      options: [{
        value: 1,
        label: '顾桥矿'
      }], placeholder: '请选择上级节点' },
    { label: '备注', field: 'remark', width: '', layout: 'Textarea', placeholder: '请填写备注' }
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
    { label: '名称', field: 'name', width: '220', layout: 'Text', placeholder: '请输入名称' }
  ]
}

// 隐患组织机构搜索
export const HiddenTissueFilterConfig = {
  actions: ['search', 'reset', 'create'],
  filters: [
    { label: '单位', field: 'name', width: '220', layout: 'Text', placeholder: '请输入单位' }
  ]
}

// 隐患组织机构
export const HiddenTissueConfig = {
  actions: ['edit', 'delete'],
  rowKey: 'code',
  summary: false,
  summaryField: [],
  checkbox: false,
  noSerialNum: true,
  lazy: true,
  columns: [
    { label: '隐患组织id', field: 'aqglHiddenTissueId', width: '150', layout: 'Text', disabled: true, placeholder: '请填写隐患组织id', hidden: true },
    { label: '单位', field: 'company', width: '200', layout: 'Text', placeholder: '请填写名称' },
    { label: '编号', field: 'code', width: '150', layout: 'Text', disabled: true, placeholder: '请填写编号' },
    { label: '组织机构类型', field: 'unitId', width: 'auto', layout: 'Select', require: true,
      options: [], placeholder: '请选择组织机构' },
    { label: '排序', field: 'orderNum', width: '150', layout: 'Text', placeholder: '请选择排序' },
    { label: '上级节点', field: 'parentId', layout: 'TreeSelect', hidden: true,
      options: [{ value: 1, label: '隐患组织机构' }], placeholder: '请选择上级节点' }
  ]
}
