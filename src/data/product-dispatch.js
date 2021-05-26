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

/** ---- 生产调度 ---- **/
// 公文公告
export const DispatchAnnounceTableConfig = {
  actions: ['edit', 'delete', 'other'],
  otherActionTitle: ['预览'],
  checkbox: true,
  columns: [
    { label: '标题', field: 'title', layout: 'Text', require: true, placeholder: '请填写标题' },
    { label: '分类', field: 'type', layout: 'Select', require: true,
      options: [], placeholder: '请选择分类' },
    { label: '部门', field: 'dept', layout: 'Text', placeholder: '请填写部门' },
    { label: '日期', field: 'createTime', width: '150', sortable: true, layout: 'DateTime', require: true, placeholder: '请选择日期' },
    { label: '附件', field: 'eventId', layout: 'Upload', showType: 'underline', placeholder: '请上传附件' },
    { label: '文字内容', field: 'content', layout: 'TextEditor', hidden: true, placeholder: '请填写文字内容' }
  ]
}
export const DispatchAnnounceFilterConfig = {
  actions: ['search', 'reset', 'create'],
  filters: [
    { label: '关键字', field: 'keyword', width: '220', layout: 'Text', placeholder: '标题，类型' }
  ]
}
// 调度下派任务
export const DispatchZdhldxprwTableConfig = {
  actions: ['edit', 'delete', 'other'],
  otherActionTitle: ['作废'],
  checkbox: true,
  columns: [
    { label: '任务名称', field: 'taskName', layout: 'Text', require: true, placeholder: '请填写任务名称' },
    { label: '任务明细', field: 'taskDetail', layout: 'Text', placeholder: '请填写任务明细' },
    { label: '安排任务领导', field: 'dispatchTaskLeader', layout: 'Text', require: true, placeholder: '请填写安排任务的领导' },
    { label: '责任科室', field: 'dutyDept', layout: 'Text', placeholder: '请填写责任科室' },
    { label: '责任人', field: 'dutyUser', layout: 'Select', require: true,
      options: [
        { value: '1', label: '超级管理员' },
        { value: '2', label: '管理员' },
        { value: '3', label: '操作工' },
        { value: '4', label: '访客' }
      ], placeholder: '请填写责任人' },
    { label: '规定完成时间', field: 'specifiedCompletionTime', width: '150', layout: 'DateTime', require: true, placeholder: '请选择规定完成时间' },
    { label: '完成情况', field: 'completionSituation', layout: 'Text', placeholder: '请填写完成情况' },
    { label: '完成百分比(%)', field: 'completionPercent', layout: 'Number', placeholder: '请填写完成进度百分比' },
    { label: '完成情况记录', field: 'completionSituationRecord', layout: 'Text', placeholder: '请填写完成情况记录' },
    { label: '延期情况', field: 'delay', layout: 'Text', placeholder: '请填写延期情况' },
    { label: '延期天数', field: 'delayDay', layout: 'Number', placeholder: '请填写完成进度百分比' },
    { label: '延期完成时间', field: 'delaySpecifiedCompletionTime', width: '150', layout: 'DateTime', placeholder: '请选择延期完成时间' },
    { label: '延期申请说明', field: 'delayApply', layout: 'Textarea', placeholder: '请填写延期申请说明' },
    { label: '延期审批意见', field: 'delayApproval', layout: 'Textarea', placeholder: '请填写延期审批意见' },
    { label: '申请验收', field: 'applyAccept', layout: 'Text', placeholder: '请填写申请验收' },
    { label: '验收审核意见', field: 'approvalComment', layout: 'Textarea', placeholder: '请填写验收审核意见' },
    { label: '作废', field: 'status', layout: 'Radio', immutable: true,
      options: [
        { value: '0', label: '是' },
        { value: '1', label: '否' }
      ], placeholder: '请填写验收审核意见' }
  ]
}
export const DispatchZdhldxprwFilterConfig = {
  actions: ['search', 'reset', 'create'],
  filters: [
    { label: '关键字', field: 'keyword', width: '220', layout: 'Text', placeholder: '任务名称' }
  ]
}
// 调度下派任务记录
export const DispatchZdhldxprwjlTableConfig = {
  columns: [
    { label: '任务名称', field: 'taskName', layout: 'Text', require: true, placeholder: '请填写任务名称' },
    { label: '任务明细', field: 'taskDetail', layout: 'Text', placeholder: '请填写任务明细' },
    { label: '安排任务领导', field: 'dispatchTaskLeader', layout: 'Text', require: true, placeholder: '请填写安排任务的领导' },
    { label: '责任科室', field: 'dutyDept', layout: 'Text', placeholder: '请填写责任科室' },
    { label: '责任人', field: 'dutyUser', layout: 'Select', require: true,
      options: [
        { value: '1', label: '超级管理员' },
        { value: '2', label: '管理员' },
        { value: '3', label: '操作工' },
        { value: '4', label: '访客' }
      ], placeholder: '请填写责任人' },
    { label: '规定完成时间', field: 'specifiedCompletionTime', width: '150', layout: 'DateTime', require: true, placeholder: '请选择规定完成时间' },
    { label: '完成情况', field: 'completionSituation', layout: 'Text', placeholder: '请填写完成情况' },
    { label: '完成百分比(%)', field: 'completionPercent', layout: 'Number', placeholder: '请填写完成进度百分比' },
    { label: '完成情况记录', field: 'completionSituationRecord', layout: 'Text', placeholder: '请填写完成情况记录' },
    { label: '延期情况', field: 'delay', layout: 'Text', placeholder: '请填写延期情况' },
    { label: '延期天数', field: 'delayDay', layout: 'Number', placeholder: '请填写完成进度百分比' },
    { label: '延期完成时间', field: 'delaySpecifiedCompletionTime', width: '150', layout: 'DateTime', placeholder: '请选择延期完成时间' },
    { label: '延期申请说明', field: 'delayApply', layout: 'Textarea', placeholder: '请填写延期申请说明' },
    { label: '延期审批意见', field: 'delayApproval', layout: 'Textarea', placeholder: '请填写延期审批意见' },
    { label: '申请验收', field: 'applyAccept', layout: 'Text', placeholder: '请填写申请验收' },
    { label: '验收审核意见', field: 'approvalComment', layout: 'Textarea', placeholder: '请填写验收审核意见' },
    { label: '作废', field: 'status', layout: 'Radio', immutable: true,
      options: [
        { value: '0', label: '是' },
        { value: '1', label: '否' }
      ], placeholder: '请填写验收审核意见' }
  ]
}
export const DispatchZdhldxprwjlFilterConfig = {
  actions: ['search', 'reset'],
  filters: [
    { label: '关键字', field: 'keyword', width: '220', layout: 'Text', placeholder: '任务名称' }
  ]
}

