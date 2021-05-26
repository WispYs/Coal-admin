/**
   * TableConfig
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
   * @param {string}  layout            表单类型；layout为 SelectUser 时，点击该表单字段调用 '选择人员' 公共组件
   * @param {boolean} require           是否为必填字段，默认false为非必填
   * @param {boolean} rule              自定义验证方法
   * @param {string}  dateFormat        日期格式，例如：yyyy-MM-dd、yyyy-MM-dd HH:mm:ss
   * @param {array}   options           选择器配置项
   * @param {boolean} hidden            是否在表格中隐藏，默认false，值为true时只在新建、编辑中显示该字段
   * @param {boolean} immutable         不可在新增、编辑中修改的字段，默认false，值为true时表示该字段后台自动生成不可编辑，也不再修改表单中显示
   * @param {boolean} disabled          是否禁用表单字段，默认false，值为true时禁用该字段
   * @param {string}  showType          表格内数据显示方式，属于对展现形式有特殊要求的配置项，例如：colorLump-有背景色块;underline-下划线可点击
   * @param {string}  underlineText     表格内数据显示方式为underline时，下划线的文字
   * @param {string}  rowKey            行数据的key，渲染树形表格必填，一般选唯一字段 id
   * @param {boolean} lazy              是否异步加载树形表格子节点数据，默认false，值为true时为异步
   * @param {boolean} multiple          下拉选择是否多选,默认false，值为true时多选
   * @param {string}  subField          针对动态获取的多级联动下拉菜单，无法通过value值渲染label名称时，采取的备用名称字段
   * @param {boolean} fullLine          该表单字段长度是否为整行，默认false，值为true时表示整行显示
   * @param {string}  associate         针对关联字段显示隐藏(改变某字段值为绑定值才会出现的字段)，fields表示相关联字段，value表示绑定值(例如：'1,2,3')，视项目需求待添加到公共组件
   */
/**
   * FilterConfig
   * @param {array} actions   操作按钮
   * @param {array} filters   筛选项
   * @param {array} options   选择器配置项
   */

/** ---- 大数据指标库 ---- **/
// 安全诊断指标库
export const SafetyDiagnosisTableConfig = {
  actions: ['edit', 'delete'],
  checkbox: true,
  columns: [
    { label: '类型', field: 'type', layout: 'Select', require: true, options: [], placeholder: '请选择类型' },
    { label: '诊断对象', field: 'name', layout: 'Text', require: true, placeholder: '请填写诊断对象' },
    { label: '影响程度', field: 'incidence', layout: 'Text', require: true, placeholder: '请填写影响程度' },
    { label: '不安全因素', field: 'unsafe', layout: 'Textarea', placeholder: '请填写不安全因素' },
    { label: '诊断依据及影响', field: 'according', layout: 'Textarea', placeholder: '请填写诊断依据及影响' },
    { label: '处置措施', field: 'measure', layout: 'Textarea', placeholder: '请填写处置措施' }
  ]
}
export const SafetyDiagnosisFilterConfig = {
  actions: ['search', 'reset', 'create'],
  filters: [
    { label: '关键字', field: 'keyword', width: '220', layout: 'Text', placeholder: '名称、值' }
  ]
}
