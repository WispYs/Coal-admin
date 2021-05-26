export const TableConfig = {
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
  actions: ['edit', 'delete'],
  summary: false,
  summaryField: [],
  checkbox: true,
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

export const FilterConfig = {
  /**
   * @param {array} actions   操作按钮
   * @param {array} filters   筛选项
   * @param {array} options   选择器配置项
   */
  actions: ['search', 'create', 'identificationEnd'],
  filters: [
    { label: '负责人', field: 'name', width: '220', layout: 'Text', placeholder: '请输入负责人' }
  ]
}


