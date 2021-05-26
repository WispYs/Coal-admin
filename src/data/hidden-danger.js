export const MechanismTableConfig = {
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
   * @param {string}  showType          表格内数据显示方式，属于对展现形式有特殊要求的配置项，例如：colorLump 色块显示
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
  columns: [
    { label: '单位', field: 'unit', width: 'auto', layout: 'Text', require: true, placeholder: '请选择单位' },
    { label: '编号', field: 'num', width: 'auto', layout: 'Text', require: true, placeholder: '请填写编号' },
    { label: '组织机构类型', field: 'organizationType', width: 'auto', layout: 'Select', require: true,
      options: [
        { value: 1, label: '井工矿' },
        { value: 2, label: '矿机构' },
        { value: 3, label: '职务' }
      ], placeholder: '请选择组织机构类型' },
    { label: '排序', field: 'sort', width: 'auto', layout: 'Text', require: true, placeholder: '请填写排序' },
    { label: '上级节点', field: 'parentId', layout: 'TreeSelect', require: true, hidden: true,
      options: [
        {
          value: 1,
          label: '顾桥矿',
          children: [
            { value: 2, label: '机关', children: [
              { value: 3, label: '矿领导' },
              { value: 4, label: '办公室', children: [
                { value: 5, label: '部门', children: [
                  { value: 6, label: '安全部门' },
                  { value: 7, label: '监管部门' },
                  { value: 8, label: '采掘部门' },
                  { value: 9, label: '生产部门' },
                  { value: 10, label: '调度部门' },
                  { value: 11, label: '防控部门' },
                  { value: 12, label: '应急部门' }
                ] },
                { value: 13, label: '办公室科室（中央区）' },
                { value: 14, label: '办公室科室（南区）' },
                { value: 15, label: '办公室科室（西区）' },
                { value: 16, label: '办公室科室（东区）' }
              ] },
              { value: 17, label: '人力资源部' }
            ] }
          ]
        }
      ], placeholder: '请选择上级节点' }
  ]
}

export const MechanismFilterConfig = {
  /**
   * @param {array} actions   操作按钮
   * @param {array} filters   筛选项
   * @param {array} options   选择器配置项
   */
  actions: ['search', 'create'],
  filters: [
    { label: '单位', field: 'name', width: '220', layout: 'Text', placeholder: '请输入单位' }
  ]
}

// 隐患责任体系
export const liabilitySystemFilterConfig = {
  /**
   * @param {array} actions   操作按钮
   * @param {array} filters   筛选项
   * @param {array} options   选择器配置项
   */
  actions: ['search', 'create'],
  filters: [
    { label: '责任人/职位', field: 'name', width: '220', layout: 'Text', placeholder: '请输入责任人/职位' }
  ]
}

// 事故隐患登记 搜索
export const dangeRegistrationFilterConfig = {
  /**
   * @param {array} actions   操作按钮
   * @param {array} filters   筛选项
   * @param {array} options   选择器配置项
   */
  actions: ['search', 'create', 'import'],
  filters: [
    { label: '隐患内容/整改意见', field: 'name', width: '220', layout: 'Text', placeholder: '隐患内容 整改意见' }
  ]
}

// 事故隐患登记
export const dangeRegistConfig = {
  actions: ['edit', 'delete'],
  summary: false,
  summaryField: [],
  checkbox: true,
  columns: [
    { label: '检查日期', field: 'examineTime', width: 'auto', layout: 'DateTime', dateFormat: 'yyyy-MM-dd', require: true, placeholder: '请选择检查时间' },
    { label: '检查班次', field: 'examineShiftId', width: 'auto', layout: 'Select', require: true,
      options: [], hidden: true, placeholder: '请选择检查班次' },
    { label: '检查类别', field: 'examineTypeId', width: 'auto', layout: 'Select', require: true,
      options: [], hidden: true, placeholder: '请选择检查类别' },
    { label: '检查单位', field: 'examineUnit', width: 'auto', layout: 'TreeSelect', require: true,
      options: [], hidden: true, placeholder: '请选择检查单位' },
    { label: '检查人员', field: 'examineUserName', width: 'auto', layout: 'Text', require: true, placeholder: '请填写检查人员' },
    { label: '陪同人员', field: 'accompany', width: 'auto', layout: 'Text', hidden: true, placeholder: '请填写陪同人员' },
    { label: '隐患部门', field: 'hiddenDeptId', layout: 'TreeSelect', require: true, options: [], placeholder: '请选择隐患部门' },
    { label: '责任人员', field: 'dutyUserName', width: 'auto', layout: 'Text', require: true, placeholder: '请选择责任人员' },
    { label: '检查地点', field: 'examinePathId', width: 'auto', layout: 'Select', require: true, options: [], placeholder: '请填写检查地点' },
    { label: '隐患类别', field: 'hiddenTypeId', layout: 'Select', require: true, options: [], hidden: true, placeholder: '请选择隐患类别' },
    { label: '隐患级别', field: 'hiddenGrade', layout: 'Select', require: true, options: [], placeholder: '请选择隐患级别' },
    { label: '隐患状态', field: 'hiddenStatus', width: 'auto', layout: 'Text', require: true, immutable: true, placeholder: '请填写隐患状态' },
    { label: '限改时间', field: 'xgTime', width: 'auto', layout: 'DateTime', require: true, dateFormat: 'yyyy-MM-dd', placeholder: '请选择限改时间' },
    { label: '督办人', field: 'supervisePerson', width: 'auto', layout: 'Text', immutable: true, placeholder: '请填写督办人' },
    { label: '督办单位', field: 'superviseDept', layout: 'Text', immutable: true, placeholder: '请选择督办单位' },
    { label: '复查单位', field: 'reviewUnitId', width: 'auto', layout: 'TreeSelect', options: [], require: true, hidden: true, placeholder: '请填写复查单位' },
    { label: '状态说明', field: 'statusExplain', width: 'auto', layout: 'Text', immutable: true, placeholder: '请选择状态说明' },
    { label: '隐患内容', field: 'hiddenContent', width: 'auto', layout: 'Textarea', require: true, placeholder: '请填写隐患内容' },
    { label: '整改措施', field: 'rectifyMeasure', width: 'auto', layout: 'Textarea', require: true, placeholder: '请选择整改措施' },
    { label: '整改预案', field: 'rectifyPlan', width: 'auto', layout: 'Textarea', require: true, placeholder: '请填写整改预案' },
    { label: '附件', field: 'eventId', width: '120', layout: 'Upload', showType: 'underline', hidden: true, placeholder: '请上传附件' }
  ]
}

// 隐患整改
export const reformTableConfig = {
  actions: ['other'],
  otherActionTitle: ['送审复查','退回隐患','申请延期'],
  actionWidth: 200,
  summary: false,
  summaryField: [],
  // checkbox: true,
  columns: [
    { label: '隐患状态', field: 'hiddenStatus', width: 'auto', layout: 'Text', require: true, placeholder: '请选择隐患级别' },
    { label: '检查时间', field: 'examineTime', width: '90', layout: 'DateTime', require: true, dateFormat: 'yyyy-MM-dd', placeholder: '请填写隐患状态' },
    { label: '检查班次', field: 'examineShiftId', width: 'auto', layout: 'Select',
      options: [], placeholder: '请选择检查班次' },
    { label: '检查类别', field: 'examineTypeId', width: 'auto', layout: 'Select',
      options: [], placeholder: '请选择检查类别' },
    { label: '检查单位', field: 'examineUnit', width: 'auto', layout: 'TreeSelect',
      options: [], placeholder: '请选择检查单位' },
    { label: '检查人员', field: 'examineUserName', width: 'auto', layout: 'Text', require: true, placeholder: '请填写检查人员' },
    { label: '陪同人员', field: 'accompany', width: 'auto', layout: 'Text', require: true, placeholder: '请填写陪同人员' },
    { label: '隐患部门', field: 'hiddenDeptId', layout: 'TreeSelect', require: true, options: [], placeholder: '请选择隐患部门' },
    { label: '责任人员', field: 'dutyUserName', width: 'auto', layout: 'Text', require: true, placeholder: '请选择责任人员' },
    { label: '检查地点', field: 'examinePathId', width: '210', layout: 'TreeSelect', require: true, options: [], placeholder: '请填写检查地点' },
    { label: '隐患类别', field: 'hiddenTypeId', width: '90', layout: 'Select', require: true, options: [], placeholder: '请选择隐患类别' },
    { label: '隐患级别', field: 'hiddenGrade', width: '90', layout: 'Select', require: true, options: [], placeholder: '请选择隐患级别' },
    { label: '限改时间', field: 'xgTime', width: '90', layout: 'DateTime', dateFormat: 'yyyy-MM-dd', placeholder: '请选择限改时间' },
    { label: '状态说明', field: 'statusExplain', width: 'auto', layout: 'Text', require: true, placeholder: '请选择状态说明' },
    { label: '复查单位', field: 'reviewUnitId', layout: 'TreeSelect', require: true, options: [], placeholder: '请选择复查单位' },
    { label: '隐患内容', field: 'hiddenContent', width: 'auto', layout: 'Textarea', require: true, placeholder: '请填写隐患内容' },
    { label: '整改意见', field: 'rectifyPlan', width: 'auto', layout: 'Textarea', placeholder: '请选择整改措施' },
    { label: '登记附件', field: 'eventId', width: 'auto', layout: 'Upload', showType: 'underline', placeholder: '请上传登记附件' }
  ]
}

// 隐患整改 搜索
export const reformFilterConfig = {
  actions: ['search'],
  filters: [
    { label: '隐患内容/整改意见', field: 'name', width: '220', layout: 'Text', placeholder: '隐患内容 整改意见' }
  ]
}

// 送审复查
export const submitForCensorshipCheck = {
  actions: [],
  summary: false,
  summaryField: [],
  checkbox: true,
  columns: [
    { label: '整改人员', field: 'abarbeitungUser', width: 'auto', layout: 'Text', require: true, placeholder: '请选择整改人员' },
    { label: '完成时间', field: 'completeTime', width: 'auto', layout: 'DateTime', require: true, dateFormat: 'yyyy-MM-dd', placeholder: '请选择完成时间' },
    { label: '治理资金', field: 'theMoney', width: 'auto', layout: 'Number', require: true, placeholder: '请填写治理资金' },
    { label: '整改措施', field: 'measure', width: 'auto', layout: 'Textarea', require: true, placeholder: '请填写整改措施' },
    { label: '整改说明', field: 'measureExplain', width: 'auto', layout: 'Textarea', require: true, placeholder: '请填写整改预案' },
    { label: '附件2', field: 'eventId', width: '120', layout: 'Upload', showType: 'underline', placeholder: '请上传附件' }
  ]
}

// 退回整改
export const returnRectification = {
  actions: [],
  summary: false,
  summaryField: [],
  columns: [
    { label: '整改人员', field: 'abarbeitungUser', width: 'auto', layout: 'Text', require: true, placeholder: '请填写整改人员' },
    { label: '退回日期', field: 'returnTime', width: 'auto', layout: 'DateTime', require: true, dateFormat: 'yyyy-MM-dd', placeholder: '请选择退回日期' },
    { label: '返回说明', field: 'returnExplain', width: 'auto', layout: 'Textarea', placeholder: '请填写返回说明' },
    { label: '附件3', field: 'eventId', width: '120', layout: 'Upload', showType: 'underline', placeholder: '请上传附件' }
  ]
}

// 申请延期
export const applyDelay = {
  actions: [],
  summary: false,
  summaryField: [],
  columns: [
    { label: '延期申请人员', field: 'postponeUser', width: 'auto', layout: 'Text', require: true, placeholder: '请填写延期申请人员' },
    { label: '延期申请日期', field: 'postponeApplyTime', width: 'auto', layout: 'DateTime', disabled: true, dateFormat: 'yyyy-MM-dd', placeholder: '请选择延期申请日期' },
    { label: '申请延期日期', field: 'postponeEndTime', width: 'auto', layout: 'DateTime', require: true, dateFormat: 'yyyy-MM-dd', placeholder: '请选择申请延期日期' },
    { label: '延期说明', field: 'eventId', width: '120', layout: 'Textarea', placeholder: '请填写延期说明' }
  ]
}

// 延期审批
export const delayApprovalTableConfig = {
  actions: ['other'],
  otherActionTitle: ['延期审批'],
  actionWidth: 80,
  summary: false,
  summaryField: [],
  checkbox: true,
  columns: [
    { label: '隐患状态', field: 'hiddenStatus', width: 'auto', layout: 'Text', require: true, placeholder: '请选择隐患级别' },
    { label: '检查时间', field: 'examineTime', width: '90', layout: 'DateTime', require: true, dateFormat: 'yyyy-MM-dd', placeholder: '请填写隐患状态' },
    { label: '检查班次', field: 'examineShiftId', width: 'auto', layout: 'Select',
      options: [], placeholder: '请选择检查班次' },
    { label: '检查类别', field: 'examineTypeId', width: 'auto', layout: 'Select',
      options: [], placeholder: '请选择检查类别' },
    { label: '检查单位', field: 'examineUnit', width: 'auto', layout: 'TreeSelect',
      options: [], placeholder: '请选择检查单位' },
    { label: '检查人员', field: 'examineUserName', width: 'auto', layout: 'Text', require: true, placeholder: '请填写检查人员' },
    { label: '陪同人员', field: 'accompany', width: 'auto', layout: 'Text', require: true, placeholder: '请填写陪同人员' },
    { label: '隐患部门', field: 'hiddenDeptId', layout: 'TreeSelect', require: true, options: [], placeholder: '请选择隐患部门' },
    { label: '责任人员', field: 'dutyUserName', width: 'auto', layout: 'Text', require: true, placeholder: '请选择责任人员' },
    { label: '检查地点', field: 'examinePathId', width: '210', layout: 'TreeSelect', require: true, options: [], placeholder: '请填写检查地点' },
    { label: '隐患类别', field: 'hiddenTypeId', width: '90', layout: 'Select', require: true, options: [], placeholder: '请选择隐患类别' },
    { label: '隐患级别', field: 'hiddenGrade', width: '90', layout: 'Select', require: true, options: [], placeholder: '请选择隐患级别' },
    { label: '限改时间', field: 'xgTime', width: '90', layout: 'DateTime', dateFormat: 'yyyy-MM-dd', placeholder: '请选择限改时间' },
    { label: '状态说明', field: 'statusExplain', width: 'auto', layout: 'Text', require: true, placeholder: '请选择状态说明' },
    { label: '复查单位', field: 'reviewUnitId', layout: 'TreeSelect', require: true, options: [], placeholder: '请选择复查单位' },
    { label: '隐患内容', field: 'hiddenContent', width: 'auto', layout: 'Textarea', require: true, placeholder: '请填写隐患内容' },
    { label: '整改意见', field: 'rectifyPlan', width: 'auto', layout: 'Textarea', placeholder: '请选择整改措施' },
    { label: '登记附件', field: 'eventId', width: 'auto', layout: 'Upload', showType: 'underline', placeholder: '请上传登记附件' }
  ]
}

// 延期审批 按钮
export const delayApprovalBttonConfig = {
  actions: [],
  summary: false,
  summaryField: [],
  checkbox: true,
  columns: [
    { label: '延期审批人员', field: 'reviewUser', width: 'auto', layout: 'Text', require: true, placeholder: '请填写延期审批人员' },
    { label: '延期审批日期', field: 'reviewTime', width: 'auto', layout: 'DateTime', require: true, dateFormat: 'yyyy-MM-dd', placeholder: '请选择延期审批日期' },
    { label: '审批结果', field: 'delayApproveResult', width: 'auto', layout: 'Radio', options: [{ value: '通过', label: '通过' }, { value: '不通过', label: '驳回' }], require: true, placeholder: '请填写审批结果' },
    { label: '审批说明', field: 'reviewExplain', width: 'auto', layout: 'Textarea', require: true, placeholder: '请填写审批说明' }
  ]
}

// 隐患验收
export const accepationTableConfig = {
  actions: ['other'],
  otherActionTitle: ['隐患验收'],
  actionWidth: 80,
  summary: false,
  summaryField: [],
  checkbox: true,
  columns: [
    { label: '隐患状态', field: 'hiddenStatus', width: 'auto', layout: 'Text', require: true, placeholder: '请选择隐患级别' },
    { label: '检查时间', field: 'examineTime', width: 'auto', layout: 'Text', require: true, placeholder: '请填写隐患状态' },
    { label: '检查班次', field: 'examineShiftId', width: 'auto', layout: 'Select',
      options: [], placeholder: '请选择检查班次' },
    { label: '检查类别', field: 'examineTypeId', width: 'auto', layout: 'Select',
      options: [], placeholder: '请选择检查类别' },
    { label: '检查单位', field: 'examineUnit', width: 'auto', layout: 'TreeSelect',
      options: [], placeholder: '请选择检查单位' },
    { label: '检查人员', field: 'examineUserName', width: 'auto', layout: 'Text', require: true, placeholder: '请填写检查人员' },
    { label: '隐患部门', field: 'hiddenDeptId', layout: 'TreeSelect', require: true, options: [], placeholder: '请选择隐患部门' },
    { label: '责任人员', field: 'dutyUserName', width: 'auto', layout: 'Text', require: true, placeholder: '请选择责任人员' },
    { label: '检查地点', field: 'examinePathId', width: 'auto', layout: 'TreeSelect', require: true, options: [], placeholder: '请填写检查地点' },
    { label: '隐患类别', field: 'hiddenTypeId', layout: 'Select', require: true, options: [], placeholder: '请选择隐患类别' },
    { label: '隐患级别', field: 'hiddenGrade', layout: 'Select', require: true, options: [], placeholder: '请选择隐患级别' },
    { label: '限改时间', field: 'xgTime', width: 'auto', layout: 'DateTime', dateFormat: 'yyyy-MM-dd', placeholder: '请选择限改时间' },
    { label: '隐患内容', field: 'hiddenContent', width: 'auto', layout: 'Textarea', require: true, placeholder: '请填写隐患内容' },
    { label: '整改意见', field: 'rectifyPlan', width: 'auto', layout: 'Textarea', placeholder: '请选择整改措施' },
    { label: '状态说明', field: 'statusExplain', width: 'auto', layout: 'Textarea', placeholder: '请选择状态说明' },
    { label: '整改人员', field: 'abarbeitungUser', width: 'auto', layout: 'Textarea', placeholder: '请选择整改措施' },
    { label: '整改措施', field: 'rectifyMeasure', width: 'auto', layout: 'Textarea', placeholder: '请选择状态说明' },
    { label: '完成时间', field: 'completeTime', width: 'auto', layout: 'Textarea', placeholder: '请选择状态说明' },
    { label: '所需资金', field: 'theMoney', width: 'auto', layout: 'Textarea', placeholder: '请选择整改措施' },
    { label: '整改说明', field: 'measureExplain', width: 'auto', layout: 'Textarea', placeholder: '请选择状态说明' }
  ]
}

// 申请延期
export const delayApprovalButton = {
  actions: [],
  summary: false,
  summaryField: [],
  columns: [
    { label: '延期审批人员', field: 'postponeUser', width: 'auto', layout: 'Text', require: true, placeholder: '请填写延期审批人员' },
    { label: '延期审批日期', field: 'postponeApplyTime', width: 'auto', layout: 'DateTime', require: true, dateFormat: 'yyyy-MM-dd', placeholder: '请选择延期审批日期' },
    { label: '审批结果', field: 'reviewResult', width: 'auto', layout: 'Select', options: [{ value: '通过', label: '通过' }, { value: '不通过', label: '不通过' }], require: true, placeholder: '请填写申审批结果' },
    { label: '审批说明', field: 'postponeExplain', width: '120', layout: 'Textarea', require: true, placeholder: '请填写延期说明' }
  ]
}

// 隐患验收
export const hiddenDangerAcceptance = {
  actions: [],
  summary: false,
  summaryField: [],
  columns: [
    { label: '验收人', field: 'reviewUser', width: 'auto', layout: 'Text', require: true, placeholder: '请填写验收人' },
    { label: '验收日期', field: 'reviewTime', width: 'auto', layout: 'DateTime', require: true, dateFormat: 'yyyy-MM-dd', placeholder: '请选择验收日期' },
    { label: '验收结果', field: 'reviewResult', width: 'auto', layout: 'Radio', options: [{ value: '通过', label: '通过' }, { value: '不通过', label: '驳回' }], require: true, placeholder: '请填写验收结果' },
    { label: '登记附件', field: 'eventId', width: 'auto', layout: 'Upload', showType: 'underline', placeholder: '请上传登记附件' }
  ]
}

// 治理督办
export const supervisionTableConfig = {
  actions: ['other'],
  otherActionTitle: ['督办隐患','取消督办'],
  actionWidth: 140,
  summary: false,
  summaryField: [],
  // checkbox: true,
  columns: [
    { label: '隐患状态', field: 'hiddenStatus', width: 'auto', layout: 'Text', require: true, placeholder: '请选择隐患级别' },
    { label: '督办状态', field: 'superviseStatus', width: 'auto', layout: 'Text', require: true, placeholder: '请填写督办状态' },
    { label: '检查时间', field: 'examineTime', width: 'auto', layout: 'DateTime', require: true, dateFormat: 'yyyy-MM-dd', placeholder: '请填写检查时间' },
    { label: '检查班次', field: 'examineShiftId', width: 'auto', layout: 'Select',
      options: [], placeholder: '请选择检查班次' },
    { label: '检查类别', field: 'examineTypeId', width: 'auto', layout: 'Select',
      options: [], placeholder: '请选择检查类别' },
    { label: '检查单位', field: 'examineUnit', width: 'auto', layout: 'TreeSelect',
      options: [], placeholder: '请选择检查单位' },
    { label: '检查人员', field: 'examineUserName', width: 'auto', layout: 'Text', require: true, placeholder: '请填写检查人员' },
    { label: '隐患部门', field: 'hiddenDeptId', layout: 'TreeSelect', require: true, options: [], placeholder: '请选择隐患部门' },
    { label: '责任人员', field: 'dutyUserName', width: 'auto', layout: 'Text', require: true, placeholder: '请选择责任人员' },
    { label: '检查地点', field: 'examinePathId', width: 'auto', layout: 'TreeSelect', require: true, options: [], placeholder: '请填写检查地点' },
    { label: '隐患内容', field: 'hiddenContent', width: 'auto', layout: 'Textarea', require: true, placeholder: '请填写隐患内容' },
    { label: '整改意见', field: 'rectifyPlan', width: 'auto', layout: 'Textarea', placeholder: '请选择整改措施' },
    { label: '隐患类别', field: 'hiddenTypeId', layout: 'Select', require: true, options: [], placeholder: '请选择隐患类别' },
    { label: '隐患级别', field: 'hiddenGrade', layout: 'Select', require: true, options: [], placeholder: '请选择隐患级别' }
  ]
}

// 隐患清单 搜索
export const dangerListFilterConfig = {
  actions: ['search'],
  filters: [
    { label: '隐患内容/整改预案', field: 'name', width: '220', layout: 'Text', placeholder: '隐患内容 整改预案' }
  ]
}

// 隐患清单
export const dangerListTableConfig = {
  actions: ['other'],
  summary: false,
  summaryField: [],
  otherActionTitle: ['详情'],
  columns: [
    { label: '隐患状态', field: 'hiddenStatus', width: 'auto', layout: 'Text', require: true, placeholder: '请选择隐患级别' },
    { label: '检查时间', field: 'examineTime', width: 'auto', layout: 'DateTime', require: true, dateFormat: 'yyyy-MM-dd', placeholder: '请填写检查时间' },
    { label: '检查人员', field: 'examineUserName', width: 'auto', layout: 'Text', require: true, placeholder: '请填写检查人员' },
    { label: '隐患部门', field: 'hiddenDeptId', layout: 'TreeSelect', require: true, options: [], placeholder: '请选择隐患部门' },
    { label: '责任人员', field: 'dutyUserName', width: 'auto', layout: 'Text', require: true, placeholder: '请选择责任人员' },
    { label: '检测地点', field: 'examinePathId', layout: 'TreeSelect', require: true, options: [], placeholder: '请选择检测地点' },
    { label: '隐患级别', field: 'hiddenGrade', width: 'auto', layout: 'Text', require: true, placeholder: '请选择隐患级别' },
    { label: '隐患内容', field: 'hiddenContent', width: 'auto', layout: 'Textarea', require: true, placeholder: '请填写隐患内容' },
    { label: '整改预案', field: 'rectifyPlan', width: 'auto', layout: 'Textarea', placeholder: '请选择整改预案' },
    { label: '限改时间', field: 'xgTime', width: 'auto', layout: 'DateTime', dateFormat: 'yyyy-MM-dd', placeholder: '请选择限改时间' },
    { label: '复查单位', field: 'reviewUnitId', width: 'auto', layout: 'Textarea', placeholder: '请选择复查单位' },
    { label: '状态说明', field: 'statusExplain', width: 'auto', layout: 'Textarea', placeholder: '请选择状态说明' }
  ]
}

// 隐患清单操作
export const dangerListoperation = {
  actions: [],
  summary: false,
  summaryField: [],
  otherActionTitle: ['详情'],
  columns: [
    { label: '操作人员', field: 'operationUserName', width: 'auto', layout: 'Text', placeholder: '请填写操作人员' },
    { label: '所属单位', field: 'unit', width: 'auto', layout: 'Text', placeholder: '请填写所属单位' },
    { label: '操作时间', field: 'operationTime', width: 'auto', layout: 'DateTime', dateFormat: 'yyyy-MM-dd', placeholder: '请选择操作时间' },
    { label: '操作状态内容', field: 'operationContent', layout: 'Text', placeholder: '请填写操作状态内容' },
    { label: '操作摘要', field: 'operationAbstract', width: 'auto', layout: 'Text', placeholder: '请选择责任人员' },
    { label: '备注', field: 'remark', width: 'auto', layout: 'Text', placeholder: '请填写备注' }
  ]
}

// 三违登记 搜索
export const threeViolationFilterConfig = {
  /**
   * @param {array} actions   操作按钮
   * @param {array} filters   筛选项
   * @param {array} options   选择器配置项
   */
  actions: ['search', 'create', 'import'],
  filters: [
    { label: '关键字', field: 'name', width: '270', layout: 'Text', placeholder: '违章违纪/检查部门/责任单位' }
  ]
}

// 三违登记
export const threeViolationConfig = {
  actions: ['edit', 'delete', 'other'],
  otherActionTitle: ['详情'],
  summary: false,
  summaryField: [],
  checkbox: true,
  columns: [
    { label: '检查部门', field: 'examineDept', width: 'auto', layout: 'Text', require: true, placeholder: '请填写检查部门' },
    { label: '检查时间', field: 'examineTime', width: '200', layout: 'DateTime', dateFormat: 'yyyy-MM-dd', require: true, placeholder: '请选择检查时间' },
    { label: '检查人员', field: 'examineUserName', width: 'auto', layout: 'Text', require: true, placeholder: '请填写检查人员' },
    { label: '检查班次', field: 'examineShiftId', width: 'auto', layout: 'Select', options: [], require: true, placeholder: '请选择检查班次' },
    { label: '检查地点', field: 'examinePathId', layout: 'Select', require: true, hidden: true, options: [], placeholder: '请选择检查地点' },
    { label: '责任单位', field: 'unit', width: 'auto', layout: 'Text', require: true, placeholder: '请填写责任单位' },
    { label: '违章人员', field: 'breakUserName', width: 'auto', layout: 'Text', require: true, placeholder: '请填写违章人员' },
    { label: '用工类型', field: 'empType', width: 'auto', layout: 'Text', hidden: true, placeholder: '请填写用工类型' },
    { label: '文化程度', field: 'standard', width: 'auto', layout: 'Text', hidden: true, placeholder: '请填写文化程度' },
    { label: '工种', field: 'workType', width: 'auto', layout: 'Text', hidden: true, placeholder: '请填写工种' },
    { label: '年龄', field: 'age', width: 'auto', layout: 'Number', hidden: true, placeholder: '请填写年龄' },
    { label: '工龄', field: 'workAge', width: 'auto', layout: 'Number', hidden: true, placeholder: '请填写工龄' },
    { label: '是否党员', field: 'flag', layout: 'Radio', hidden: true, options: [], placeholder: '请选择是否党员' },
    { label: '带班班长', field: 'squadLeader', width: 'auto', layout: 'Text', hidden: true, placeholder: '请填写带班班长' },
    { label: '带班区长', field: 'wardenLeader', width: 'auto', layout: 'Text', hidden: true, placeholder: '请填写带班区长' },
    { label: '违章违纪', field: 'disciplinary', width: 'auto', layout: 'Textarea', require: true, placeholder: '请填写违章违纪' },
    { label: '严重级别', field: 'grade', width: 'auto', layout: 'Select', require: true, options: [], placeholder: '请选择严重级别' },
    { label: '处理结果', field: 'disposeResult', width: 'auto', layout: 'Textarea', require: true, placeholder: '请填写处理结果' },
    { label: '违章扣分', field: 'disposeDeduct', width: 'auto', layout: 'Number', placeholder: '请填写违章扣分' },
    { label: '备注', field: 'remark', width: 'auto', layout: 'Textarea', placeholder: '请填写备注' },
    { label: '附件', field: 'eventId', width: 'auto', layout: 'Upload', showType: 'underline', placeholder: '请选择附件' }
  ]
}

// 三证一照
export const certificatePhotoConfig = {
  actions: ['edit', 'delete'],
  summary: false,
  summaryField: [],
  checkbox: true,
  columns: [
    { label: '煤矿名称', field: 'coalMineName', width: 'auto', layout: 'Text', require: true, placeholder: '请选择煤矿名称' },
    { label: '证照名称', field: 'licenseName', width: 'auto', layout: 'Text', require: true, placeholder: '请选择证照名称' },
    { label: '发证机构', field: 'organization', width: 'auto', layout: 'Text', require: true, placeholder: '请选择发证机构' },
    { label: '证照号码', field: 'licenseCode', width: 'auto', layout: 'Text', require: true, placeholder: '请选择证照号码' },
    { label: '管理预警天数', field: 'warningDay1', width: 'auto', layout: 'Number', require: true, placeholder: '请填写管理预警天数' },
    { label: '管理报警天数', field: 'callDay', width: 'auto', layout: 'Number', require: true, placeholder: '请填写管理报警天数' },
    { label: '有效期开始日期', field: 'startTime', width: 'auto', layout: 'DateTime', require: true, dateFormat: 'yyyy-MM-dd', placeholder: '请选择有效开始日期' },
    { label: '有效期结束日期', field: 'endTime', width: 'auto', layout: 'DateTime', require: true, dateFormat: 'yyyy-MM-dd', placeholder: '请选择有效结束日期' },
    { label: '抄送人', field: 'copyUserName', subField: 'copyUserId', width: 'auto', layout: 'SelectUser', hidden: true, options: [], placeholder: '请填写抄送人' },
    { label: '抄送内容', field: 'copyContent', layout: 'Text', hidden: true, placeholder: '请选择抄送内容' },
    { label: '重复提醒次数', field: 'repeatRemindCount', layout: 'Number', hidden: true, placeholder: '请选择重复提醒次数' },
    { label: '状态', field: 'status', width: 'auto', layout: 'Text', immutable: true, placeholder: '请填写状态' },
    { label: '附件', field: 'eventId', layout: 'Upload', showType: 'underline', placeholder: '请选择附件' },
    { label: '备注', field: 'remark', layout: 'Textarea', hidden: true, placeholder: '请选择备注' }
  ]
}

// 三证一照 搜索
export const certificatePhotoFilterConfig = {
  /**
   * @param {array} actions   操作按钮
   * @param {array} filters   筛选项
   * @param {array} options   选择器配置项
   */
  actions: ['search', 'create'],
  filters: [
    { label: '关键字', field: 'name', width: '220', layout: 'Text', placeholder: '证照名称/发证机构' }
  ]
}

// 事故警示教育 搜索
export const warningEducationFilterConfig = {
  actions: ['search', 'create'],
  filters: [
    { label: '关键字', field: 'name', width: '220', layout: 'Text', placeholder: '标题 描述' }
  ]
}

// 事故警示教育
export const warningEducationConfig = {
  actions: ['edit', 'delete'],
  summary: false,
  summaryField: [],
  checkbox: true,
  columns: [
    { label: '标题', field: 'headline', width: 'auto', layout: 'Text', require: true, placeholder: '请选择煤矿名称' },
    { label: '描述', field: 'describeCode', width: 'auto', layout: 'Textarea', placeholder: '请选择证照名称' },
    { label: '附件', field: 'eventId', layout: 'Upload', showType: 'underline', placeholder: '请选择附件' }
  ]
}

// 员工培训台账 搜索
export const staffTrainingAccountFilterConfig = {
  actions: ['search', 'create'],
  filters: [
    { label: '关键字', field: 'name', width: '220', layout: 'Text', placeholder: '部门名称 姓名 证书名称' }
  ]
}

// 员工培训台账
export const staffTrainingAccountConfig = {
  actions: ['edit', 'delete'],
  summary: false,
  summaryField: [],
  checkbox: true,
  columns: [
    { label: '部门名称', field: 'deptId', width: 'auto', layout: 'TreeSelect', options: [], require: true, placeholder: '请选择部门名称' },
    { label: '姓名', field: 'name', width: 'auto', layout: 'Text', require: true, placeholder: '请选择姓名' },
    { label: '职务', field: 'dutuies', width: 'auto', layout: 'Text', placeholder: '请选择职务' },
    { label: '证书名称', field: 'certificateName', width: 'auto', layout: 'Text', require: true, placeholder: '请选择证书名称' },
    { label: '证书编号', field: 'certificateCode', width: 'auto', layout: 'Text', placeholder: '请选择证书编号' },
    { label: '发证时间', field: 'startTime', width: 'auto', layout: 'DateTime', dateFormat: 'yyyy-MM-dd', placeholder: '请选择发证时间' },
    { label: '有效期至', field: 'endTime', width: 'auto', layout: 'DateTime', dateFormat: 'yyyy-MM-dd', placeholder: '请选择有效期至' },
    { label: '附件', field: 'eventId', layout: 'Upload', showType: 'underline', placeholder: '请上传附件' }
  ]
}

// 标准化评分管理 搜索
export const StandardizedScorecFilteConfig = {
  actions: ['create'],
  filters: [
    // { label: '关键字', field: 'name', width: '220', layout: 'Text', placeholder: '部门名称 姓名 证书名称' }
  ]
}

// 标准化评分管理
export const StandardizedScoreConfig = {
  actions: ['edit', 'delete', 'other'],
  otherActionTitle: ['查看'],
  summary: false,
  summaryField: [],
  checkbox: true,
  columns: [
    { label: '评价年月', field: 'evaluateDate', width: 'auto', layout: 'DateTime', require: true, placeholder: '请选择部门名称' },
    { label: '专业', field: 'major', width: 'auto', layout: 'Text', require: true, placeholder: '请选择姓名' },
    { label: '分数', field: 'fraction', width: 'auto', layout: 'Text', placeholder: '请选择职务' },
    { label: '单位', field: 'unit', width: 'auto', layout: 'Text', require: true, placeholder: '请选择证书名称' },
    { label: '录入日期', field: 'inputDate', width: 'auto', layout: 'DateTime', placeholder: '请选择证书编号' },
    { label: '录入人', field: 'enteredBy', width: 'auto', layout: 'DateTime', placeholder: '请选择发证时间' }
  ]
}
