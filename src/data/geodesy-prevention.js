export const geophysicalProspectingInfoConfig = {
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
  actions: ['edit', 'delete', 'other'],
  otherActionTitle: ['操作查看'],
  summary: false,
  summaryField: [],
  checkbox: true,
  columns: [
    { label: '地点类型', field: 'locationTypeId', width: 'auto', layout: 'Select', options: [], hidden: true, placeholder: '请选择地点类型' },
    { label: '探测地点名称', field: 'detectPositionNameId', width: 'auto', layout: 'Select', options: [], require: true, placeholder: '请选择探测地点名称' },
    { label: '完成推动距离', field: 'completePushDistance', width: 'auto', layout: 'Number', immutable: true, placeholder: '请选择完成推动距离' },
    { label: '物探间距(米)', field: 'detectIntervalDistance', width: 'auto', layout: 'Number', placeholder: '请选择物探间距(米)' },
    { label: '最新物探时间', field: 'recentDetectTime', width: 'auto', layout: 'DateTime', dateFormat: 'yyyy-MM-dd', immutable: true, placeholder: '请选择最新物探时间' },
    { label: '距上次物探工作面推进距离(米)', field: 'lastDetectPushDistance', width: 'auto', layout: 'Number', immutable: true, placeholder: '请填写距上次物探工作面推进距离(米)' },
    { label: '预计下次物探时间', field: 'nextDetectTime', width: 'auto', layout: 'DateTime', dateFormat: 'yyyy-MM-dd', immutable: true, placeholder: '请选择预计下次物探时间' },
    { label: '物探状态', field: 'detectStatus', layout: 'Radio', width: 'auto',
      options: [{ value: '正常', label: '正常' }, { value: '异常', label: '异常' }], immutable: true, placeholder: '请选择状态' },
    { label: '排序', field: 'orderNum', width: 'auto', layout: 'Text', hidden: true, placeholder: '请填写排序' }
  ]
}

export const geophysicalProspectingInfoFilterConfig = {
  /**
   * @param {array} actions   操作按钮
   * @param {array} filters   筛选项
   * @param {array} options   选择器配置项
   */
  actions: ['search', 'create'],
  filters: [
    { label: '关键字', field: 'name', width: '220', layout: 'Text', placeholder: '地点名称' }
  ]
}

// 超前物探信息表 搜索
export const geophysicalProspectingInfoDetailedFilterConfig = {
  actions: ['search', 'create'],
  filters: [
    { label: '关键字', field: 'name', width: '220', layout: 'Text', placeholder: '物探地点 物探明细' }
  ]
}

// 超前物探信息表
export const geophysicalProspectingInfoDetailedConfig = {
  actions: ['edit', 'delete'],
  summary: false,
  summaryField: [],
  checkbox: true,
  columns: [
    { label: '物探日期', field: 'detectTime', width: 'auto', layout: 'DateTime', dateFormat: 'yyyy-MM-dd', require: true, placeholder: '请选择物探日期' },
    { label: '物探地点', field: 'detectPosition', width: 'auto', layout: 'Text', require: true, placeholder: '请填写物探地点' },
    { label: '物探状态', field: 'detectStatusId', layout: 'Radio', width: 'auto', options: [], require: true, placeholder: '请选择状态' },
    { label: '预计下次物探时间', field: 'nextDetectTime', width: 'auto', layout: 'DateTime', dateFormat: 'yyyy-MM-dd', require: true, placeholder: '预计下次物探时间' },
    { label: '物探明细', field: 'detectExplain', width: 'auto', layout: 'Textarea', placeholder: '请填写物探明细' }
  ]
}

// 超前物探信息表 搜索
export const tunnelConnectionFilterConfig = {
  actions: ['search', 'create'],
  filters: [
    { label: '关键字', field: 'name', width: '220', layout: 'Text', placeholder: '巷道名称' }
  ]
}

// 巷道贯通管理
export const tunnelConnectionConfig = {
  actions: ['edit', 'delete', 'other'],
  otherActionTitle: ['贯通通知单'],
  summary: false,
  summaryField: [],
  checkbox: true,
  columns: [
    { label: '巷道名称', field: 'tunnelId', width: 'auto', layout: 'Select', options: [], require: true, placeholder: '请选择巷道名称' },
    { label: '岩性类别', field: 'lithologyType', width: 'auto', layout: 'Text', disabled: true, placeholder: '请选择巷道名称' },
    { label: '设计长度', field: 'designerLength', width: 'auto', layout: 'Number', immutable: true, placeholder: '请填写设计长度' },
    { label: '已掘长度', field: 'completeLength', width: 'auto', layout: 'Number', immutable: true, placeholder: '请填写已掘长度' },
    { label: '剩余长度', field: 'residueLength', width: 'auto', layout: 'Number', immutable: true, placeholder: '请填写剩余长度' },
    { label: '预警距离', field: 'forewarningLength', width: 'auto', layout: 'Number', placeholder: '请填写预警距离' },
    { label: '报警距离', field: 'alarmLength', width: 'auto', layout: 'Number', placeholder: '请填写报警距离' },
    { label: '是否预警', field: 'isForewarning', layout: 'Text', width: 'auto', immutable: true, placeholder: '请填写是否预警' },
    { label: '是否报警', field: 'isAlarm', layout: 'Text', width: 'auto', immutable: true, placeholder: '请填写是否报警' },
    { label: '状态', field: 'tunnelStatus', layout: 'Text', width: 'auto', immutable: true, placeholder: '请填写状态' }
  ]
}

// 工作面管理  搜索
export const workingFaceManageFilterConfig = {
  actions: ['search'],
  filters: [
    { label: '关键字', field: 'name', width: '240', layout: 'Text', placeholder: '工作面名称' }
  ]
}

// 工作面转孔注浆管理
export const workingFaceManageConfig = {
  actions: ['other'],
  otherActionTitle: ['顶板探查孔统计', '底板注浆改造统计'],
  summary: false,
  summaryField: [],
  actionWidth: 220,
  checkbox: true,
  columns: [
    { label: '工作面名称', field: 'gzmName', width: 'auto', layout: 'Text', require: true, placeholder: '请填写工作面名称' },
    { label: '单位', field: 'unit', width: 'auto', layout: 'Text', require: true, placeholder: '请选择单位' },
    { label: '工作面长度(m)', field: 'gzmLength', width: 'auto', layout: 'Number', placeholder: '请填写工作面长度(米)' },
    { label: '设计长度(m)', field: 'designLength', width: 'auto', layout: 'Number', placeholder: '请填写设计长度(米)' },
    { label: '采高(m)', field: 'miningHeight', width: 'auto', layout: 'Number', require: true, placeholder: '请填写采高(米)' },
    { label: '可采储量(万吨)', field: 'availableReserve', width: 'auto', layout: 'Number', require: true, placeholder: '请填写可采储量(万吨)' },
    { label: '状态', field: 'workStatusId', width: 'auto', layout: 'Select', options: [], placeholder: '请选择状态' }
  ]
}

// 沉陷观测  搜索
export const subsidenceObservationFilterConfig = {
  actions: ['search'],
  filters: [
    { label: '关键字', field: 'name', width: '240', layout: 'Text', placeholder: '工作面名称' }
  ]
}

// 沉陷观测
export const subsidenceObservationConfig = {
  actions: ['other'],
  otherActionTitle: ['沉陷观测记录'],
  summary: false,
  summaryField: [],
  actionWidth: 120,
  checkbox: true,
  columns: [
    { label: '矿井名称', field: 'mineName', width: 'auto', layout: 'Text', require: true, placeholder: '请填写矿井名称' },
    { label: '工作面名称', field: 'gzmName', width: 'auto', layout: 'Text', require: true, placeholder: '请填写工作面名称' },
    { label: '工作面长度(m)', field: 'gzmLength', width: 'auto', layout: 'Number', placeholder: '请填写工作面长度(米)' },
    { label: '设计长度(m)', field: 'designLength', width: 'auto', layout: 'Number', placeholder: '请填写设计长度(米)' },
    { label: '采高(m)', field: 'miningHeight', width: 'auto', layout: 'Number', require: true, placeholder: '请填写采高(米)' },
    { label: '采煤工艺', field: 'coalMiningCraftId', width: 'auto', layout: 'Select', options: [], placeholder: '请选择采煤工艺' },
    { label: '状态', field: 'workStatusId', width: 'auto', layout: 'Select', options: [], placeholder: '请选择状态' },
    { label: '采深(米)', field: 'miningDepth', width: 'auto', layout: 'Number', require: true, placeholder: '请填写采深(米)' }
  ]
}

// 沉陷观测详情  搜索
export const subsidenceObservationRecordFilterConfig = {
  actions: ['create'],
  filters: [
    // { label: '关键字', field: 'name', width: '240', layout: 'Text', placeholder: '工作面名称' }
  ]
}

// 沉陷观测详情
export const subsidenceObservationRecordConfig = {
  actions: ['edit', 'delete', 'other'],
  otherActionTitle: ['添加观测记录', '查看记录'],
  // summary: false,
  noSerialNum: true,
  // summaryField: [],
  actionWidth: 240,
  checkbox: true,
  columns: [
    { label: '工作面名称', field: 'gzmName', width: '160', layout: 'Text', immutable: true, placeholder: '请填写工作面名称' },
    { label: '观测日期', field: 'observeTime', width: '100', layout: 'DateTime', dateFormat: 'yyyy-MM-dd', require: true, placeholder: '请选择观测日期' },
    { label: '观测人员', field: 'observePerson', width: '160', layout: 'Text', placeholder: '请填写观测人员' },
    { label: '备注说明', field: 'remark', width: 'auto', layout: 'Textarea', placeholder: '请填写备注说明' }
  ]
}

// 水质分析台账
export const waterAnalysisBookConfig = {
  actions: ['edit', 'delete', 'other'],
  otherActionTitle: ['样本数据'],
  summary: false,
  summaryField: [],
  actionWidth: 150,
  checkbox: true,
  columns: [
    { label: '化验室内编号', field: 'hysNo', width: '110', layout: 'Text', placeholder: '请填写化验室内编号' },
    { label: '含水层编号及名称', field: 'hscNoName', width: '140', layout: 'Text', require: true, placeholder: '请选择含水层编号及名称' },
    { label: '水样点坐标X(36)', field: 'zbx', width: '130', layout: 'Number', placeholder: '请填写水样点坐标X(36)' },
    { label: '水样点坐标Y(394)', field: 'zby', width: '140', layout: 'Number', placeholder: '请填写水样点坐标Y(394)' },
    { label: '水样点坐标Z', field: 'zbz', width: '110', layout: 'Number', placeholder: '请填写水样点坐标Z' },
    { label: '取样日期', field: 'qyDate', width: '146', layout: 'DateTime', dateFormat: 'yyyy-MM-dd', placeholder: '请选择取样日期' },
    { label: '化验日期', field: 'hyDate', width: '146', layout: 'DateTime', dateFormat: 'yyyy-MM-dd', placeholder: '请选择化验日期' },
    { label: '取样层位', field: 'qycw', width: 'auto', layout: 'Text', require: true, placeholder: '请填写取样层位' },
    { label: '总硬度', field: 'zyd', width: 'auto', layout: 'Number', placeholder: '请填写总硬度' },
    { label: '永久硬度', field: 'yjyd', width: 'auto', layout: 'Number', placeholder: '请填写永久硬度' },
    { label: '暂硬硬度', field: 'zyyd', width: 'auto', layout: 'Number', placeholder: '请填写暂硬硬度' },
    { label: '负硬硬度', field: 'fyyd', width: 'auto', layout: 'Number', placeholder: '请填写负硬硬度' },
    { label: '碱度(mg当量/l)', field: 'jd', width: '120', layout: 'Number', placeholder: '请填写碱度(mg当量/l)' },
    { label: 'PH值', field: 'phz', width: 'auto', layout: 'Number', placeholder: '请填写PH值' },
    { label: '矿化度(mg/l)', field: 'khd', width: '110', layout: 'Number', placeholder: '请填写矿化度(mg/l)' },
    { label: '耗氧量(mg/l)', field: 'hyl', width: '110', layout: 'Number', placeholder: '请填写耗氧量(mg/l)' },
    { label: '溶解量(mg/l)', field: 'rjl', width: '110', layout: 'Number', placeholder: '请填写溶解量(mg/l)' },
    { label: '是否标准水样', field: 'sfbzsy', width: '110', layout: 'Radio', options: [{ value: 2, label: '是' }, { value: 0, label: '否' }], hidden: true, placeholder: '请选择是否标准水样' },
    { label: '备注', field: 'remark', width: 'auto', layout: 'Textarea', placeholder: '请填写备注' }
    // { label: '样本数据', field: 'sampleData', width: 'auto', layout: 'Textarea', showType: 'underline', underlineText: '', immutable:true, placeholder: '请填写备注' },
  ]
}

// 水质分析台账  搜索
export const waterAnalysisBookFilterConfig = {
  actions: ['create', 'import'],
  filters: [
    { label: '关键字', field: 'name', width: '240', layout: 'Text', placeholder: '含水层编号及名称' }
  ]
}

// 水质分析台账 样本数据  搜索
export const waterAnalysisBookDetailFilterConfig = {
  actions: ['create'],
  filters: [
    // { label: '关键字', field: 'name', width: '240', layout: 'Text', placeholder: '含水层编号及名称' }
  ]
}

// 水质分析台账 样本数据
export const waterAnalysisBookDetailConfig = {
  actions: ['edit', 'delete'],
  summary: false,
  summaryField: [],
  actionWidth: 100,
  noSerialNum: true,
  columns: [
    { label: '含水层名称', field: 'hNoName', width: '110', layout: 'Text', disabled: true, placeholder: '未获取含水层名称' },
    { label: '取样地点', field: 'qycw', width: '140', layout: 'Text', disabled: true, placeholder: '未获取取样地点' },
    { label: '单位', field: 'dcfzsUnit', width: '140', layout: 'Text', disabled: true, placeholder: '未获取单位' },
    { label: 'Na+&K+', field: 'indicatorNaK', width: '130', layout: 'Number', placeholder: '请填写Na+&K+' },
    { label: 'Ca2+', field: 'indicatorCa', width: '140', layout: 'Number', placeholder: '请填写Ca2+' },
    { label: 'Mg2+', field: 'indicatorMg', width: '110', layout: 'Number', placeholder: '请填写Mg2+' },
    { label: 'Fe3', field: 'indicatorFe3', width: '146', layout: 'Number', placeholder: '请填写Fe3' },
    { label: 'NH4+', field: 'indicatorNh', width: '146', layout: 'Number', placeholder: '请填写NH4+' },
    { label: 'Cl-', field: 'indicatorCl', width: 'auto', layout: 'Number', placeholder: '请填写Cl-' },
    { label: 'SO42-', field: 'indicatorSo', width: 'auto', layout: 'Number', placeholder: '请填写SO42-' },
    { label: 'HCO3-', field: 'indicatorHco', width: 'auto', layout: 'Number', placeholder: '请填写HCO3-' },
    { label: 'CO32-', field: 'indicatorCo', width: 'auto', layout: 'Number', placeholder: '请填写CO32-' },
    { label: 'NO3-', field: 'indicatorNo3', width: 'auto', layout: 'Number', placeholder: '请填写NO3-' },
    { label: 'NO2-', field: 'indicatorNo2', width: '120', layout: 'Number', placeholder: '请填写NO2-' }
  ]
}

// 已知水样分析  搜索
export const knownWaterSampleAnalysisFilterConfig = {
  actions: [],
  filters: [
    { label: '关键字', field: 'name', width: '240', layout: 'Text', placeholder: '含水层编号及名称' }
  ]
}

// 已知水样分析
export const knownWaterSampleAnalysisConfig = {
  actions: ['other'],
  otherActionTitle: ['查看', '分析'],
  summary: false,
  summaryField: [],
  actionWidth: 150,
  // checkbox: true,
  columns: [
    { label: '含水层编号及名称', field: 'hscNoName', width: 'auto', layout: 'Text', require: true, placeholder: '请选择含水层编号及名称' },
    { label: '矿井名称', field: 'mineName', width: 'auto', layout: 'Text', require: true, placeholder: '请选择矿井名称' },
    { label: '取样日期', field: 'qyDate', width: 'auto', layout: 'DateTime', dateFormat: 'yyyy-MM-dd', placeholder: '请选择取样日期' },
    { label: '取样地点', field: 'samplingLocation', width: 'auto', layout: 'Text', placeholder: '请选择取样地点' }
  ]
}

// 已知水样分析 样本数据
export const knownWaterSampleAnalysisDetailConfig = {
  actions: [],
  summary: false,
  summaryField: [],
  actionWidth: 100,
  noSerialNum: true,
  columns: [
    { label: '含水层名称', field: 'hNoName', width: '110', layout: 'Text', immutable: true, placeholder: '请填写含水层名称' },
    { label: '取样地点', field: 'qycw', width: '110', layout: 'Text', placeholder: '请选择取样地点' },
    { label: '单位', field: 'dcfzsUnit', width: 'auto', layout: 'Text', placeholder: '请选择单位' },
    { label: 'Na+&K+', field: 'indicatorNaK', width: 'auto', layout: 'Number', placeholder: '请填写Na+&K+' },
    { label: 'Ca2+', field: 'indicatorCa', width: 'auto', layout: 'Number', placeholder: '请填写Ca2+' },
    { label: 'Mg2+', field: 'indicatorMg', width: 'auto', layout: 'Number', placeholder: '请填写Mg2+' },
    { label: 'Fe3', field: 'indicatorFe3', width: 'auto', layout: 'Number', placeholder: '请填写Fe3' },
    { label: 'NH4+', field: 'indicatorNh', width: 'auto', layout: 'Number', placeholder: '请填写NH4+' },
    { label: 'Cl-', field: 'indicatorCl', width: 'auto', layout: 'Number', placeholder: '请填写Cl-' },
    { label: 'SO42-', field: 'indicatorSo', width: 'auto', layout: 'Number', placeholder: '请填写SO42-' },
    { label: 'HCO3-', field: 'indicatorHco', width: 'auto', layout: 'Number', placeholder: '请填写HCO3-' },
    { label: 'CO32-', field: 'indicatorCo', width: 'auto', layout: 'Number', placeholder: '请填写CO32-' },
    { label: 'NO3-', field: 'indicatorNo3', width: 'auto', layout: 'Number', placeholder: '请填写NO3-' },
    { label: 'NO2-', field: 'indicatorNo2', width: 'auto', layout: 'Number', placeholder: '请填写NO2-' }
  ]
}
