// 矿井基础信息
export const mineInformationConfig = {
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
  actions: [],
  otherActionTitle: [],
  summary: false,
  summaryField: [],
  checkbox: true,
  columns: [
    { label: '矿井名称', field: 'mineName', width: '120', layout: 'Text', require: true, placeholder: '请填写矿井名称' },
    { label: '可采储量(万吨)', field: 'recoverableReserve', width: '150', layout: 'Number', placeholder: '请填写可采储量(万吨)' },
    { label: '剩余可采储量(万吨)', field: 'residueRecoverableReserve', width: '150', layout: 'Number', hidden: true, placeholder: '请填写剩余可采储量(万吨)' },
    { label: '核定生产能力(万吨)', field: 'vouchProcapacity', width: '120', layout: 'Number', multiple: true, placeholder: '请填写核定生产能力(万吨)' },
    { label: '剩余服务年限(年)', field: 'surplusServiceyear', width: '120', layout: 'Number', placeholder: '请填写剩余服务年限(年)' },
    { label: '正常涌水量(m³/h)', field: 'normalWaterinflow', width: '120', layout: 'Number', placeholder: '请填写正常涌水量(m³/h)' },
    { label: '最大涌水量(m³/h)', field: 'maxWaterinflow', width: '120', layout: 'Number', placeholder: '请填写最大涌水量(m³/h)' },
    { label: '水文地质类型', field: 'hydrogeologyTypeId', width: '150', layout: 'Select',
      options: [], placeholder: '请选择水文地质类型' },
    { label: '自然发火期(月)', field: 'natureFireTerm', width: '120', layout: 'Number', placeholder: '请填写自然发火期(月)' },
    { label: '瓦斯等级', field: 'gasGrade', width: '120', layout: 'Select',
      options: [], placeholder: '请选择瓦斯等级' },
    { label: '井田面积(km²)', field: 'fieldArea', width: '120', layout: 'Number', hidden: true, placeholder: '请填写井田面积(km²)' },
    { label: '煤田名称', field: 'coalFieldName', width: '120', layout: 'Text', hidden: true, placeholder: '请填写煤田名称' },
    { label: '开拓方式', field: 'exploitId', width: '120', layout: 'Select', options: [], hidden: true, placeholder: '请选择开拓方式' },
    { label: '煤尘爆炸指数', field: 'braizeExponentId', width: '120', layout: 'Select', options: [], hidden: true, placeholder: '选择写煤尘爆炸指数' },
    { label: '组织机构', field: 'unitId', width: '120', layout: 'TreeSelect', options: [], hidden: true, require: true, placeholder: '请选择组织机构' },
    { label: '单位类型', field: 'unitTypeId', width: '120', layout: 'Select', options: [], hidden: true, require: true, placeholder: '请选择单位类型' },
    { label: '排序', field: 'orderNum', width: '120', layout: 'Number', hidden: true, placeholder: '请填写排序' },
    { label: '工作制度', field: 'workSystemId', width: '150', layout: 'Select',
      options: [], placeholder: '请选择工作制度' },
    { label: '矿井简介文档', field: 'eventId', width: '120', layout: 'Upload', showType: 'underline', placeholder: '请上传矿井简介文档' }
  ]
}
export const mineInformationPermissionConfig = {
  menuId: '',
  tableActions: [], // ListTable 按钮
  othertableActions:[],
  filterAction: ['other'],// FilterBar 按钮
  // filterConfigName: 'mineInformationFilterConfig',
  // tableConfigName: 'mineInformationConfig',
}
// 矿井基础信息 搜所
export const mineInformationFilterConfig = {
  /**
   * @param {array} actions   操作按钮
   * @param {array} filters   筛选项
   * @param {array} options   选择器配置项
   */
  actions: [],
  filters: [
    { label: '关键字', field: 'name', width: '220', layout: 'Text', placeholder: '矿井名称' }
  ]
}

// 煤层编号信息
export const coalBedNumberInfoConfig = {
  actions: ['edit', 'delete'],
  summary: false,
  summaryField: [],
  checkbox: true,
  columns: [
    { label: '矿井名称', field: 'mineName', width: '120', layout: 'Text', immutable: true, placeholder: '请填写矿井名称' },
    { label: '煤层编号', field: 'coalCode', width: '150', layout: 'Text', require: true, placeholder: '请填写煤层编号' },
    { label: '煤层厚度(m)', field: 'coalThick', width: '150', layout: 'Text', placeholder: '请填写煤层厚度(m)' },
    { label: '煤层倾角(°)', field: 'coalDip', width: '120', layout: 'Text', placeholder: '请填写煤层倾角(°)' },
    { label: '煤层标高(m)', field: 'coalElevation', width: '120', layout: 'Number', placeholder: '请填写煤层标高(m)' },
    { label: '瓦斯含量(m³/t)', field: 'gasContent', width: '120', layout: 'Number', placeholder: '请填写瓦斯含量(m³/t)' },
    { label: '煤层结构', field: 'coalStructureId', width: '120', layout: 'Select', options: [], placeholder: '请选择煤层结构' },
    { label: '稳定性', field: 'stabilityId', width: '150', layout: 'Select', options: [], placeholder: '请选择稳定性' },
    { label: '可采性', field: 'workabilityId', width: '120', layout: 'Select', options: [], placeholder: '请选择可采性' },
    { label: '所属煤田', field: 'coalField', width: '120', layout: 'Text', require: true, placeholder: '请填写所属煤田' },
    { label: '说明', field: 'remark', width: '120', layout: 'Textarea', placeholder: '请填写说明' },
    { label: '煤层柱状图', field: 'eventId', width: '120', layout: 'Upload', showType: 'underline', placeholder: '请上传煤层柱状图' }
  ]
}

// 煤层编号信息  搜所
export const coalBedNumberInfoFilterConfig = {
  /**
   * @param {array} actions   操作按钮
   * @param {array} filters   筛选项
   * @param {array} options   选择器配置项
   */
  actions: ['create'],
  filters: [
    { label: '关键字', field: 'name', width: '220', layout: 'Text', placeholder: '煤层编号 煤田' }
  ]
}

// 水平基本信息  搜所
export const levelBaseInfoFilterConfig = {
  actions: ['create'],
  filters: [
    { label: '关键字', field: 'name', width: '220', layout: 'Text', placeholder: '水平名称' }
  ]
}

// 水平基本信息
export const levelBaseInfoConfig = {
  actions: ['edit', 'delete'],
  summary: false,
  summaryField: [],
  checkbox: true,
  columns: [
    { label: '水平名称', field: 'levelName', width: '120', layout: 'Text', require: true, placeholder: '请填写水平名称' },
    { label: '所属煤矿', field: 'mineName', width: '150', layout: 'Text', immutable: true, placeholder: '请填写所属煤矿' },
    { label: '所属煤层', field: 'coalFieldId', width: '150', layout: 'Select', options: [], placeholder: '请选择所属煤层' },
    { label: '采储量(万吨)', field: 'recoverableReserve', width: '120', layout: 'Number', require: true, placeholder: '请填写采储量(万吨)' },
    { label: '标高上限(米)', field: 'levelUpperLimit', width: '120', layout: 'Number', placeholder: '请填写标高上限(米)' },
    { label: '标高下限(米)', field: 'levelLowerLimit', width: '120', layout: 'Number', placeholder: '请填写标高下限(米)' },
    { label: '水平倾角(°)', field: 'levelDip', width: '120', layout: 'Number', placeholder: '请填写水平倾角(°)' },
    { label: '服务年限(年)', field: 'levelServiceYear', width: '150', layout: 'Number', placeholder: '请填写服务年限(年)' },
    { label: '说明', field: 'remark', width: '120', layout: 'Textarea', placeholder: '请填写说明' }
  ]
}

// 采区基本信息  搜所
export const panelBaseInfoFilterConfig = {
  actions: ['create'],
  filters: [
    { label: '关键字', field: 'name', width: '240', layout: 'Text', placeholder: '采区 所属煤层 所属水平' }
  ]
}

// 采区基本信息
export const panelBaseInfoConfig = {
  actions: ['edit', 'delete'],
  summary: false,
  summaryField: [],
  checkbox: true,
  columns: [
    { label: '采区名称', field: 'mineAreaName', width: 'auto', layout: 'Text', require: true, placeholder: '请填写采区名称' },
    { label: '所属煤矿', field: 'mineName', width: 'auto', layout: 'Text', immutable: true, placeholder: '请填写所属煤矿' },
    { label: '所属煤层', field: 'coalFieldId', width: 'auto', layout: 'Select', options: [], placeholder: '请选择所属煤层' },
    { label: '所属水平', field: 'level', width: 'auto', layout: 'Select', options: [], require: true, placeholder: '请选择所属水平' },
    { label: '可采储量(万吨)', field: 'recoverableReserve', width: 'auto', layout: 'Number', placeholder: '请填写可采储量(万吨)' },
    { label: '采深(米)', field: 'mineDepth', width: 'auto', layout: 'Number', placeholder: '请填写采深(米)' },
    { label: '排序', field: 'orderNum', width: 'auto', layout: 'Number', require: true, hidden: true, placeholder: '请填写排序' },
    { label: '说明', field: 'remark', width: 'auto', layout: 'Textarea', placeholder: '请选择说明' }
  ]
}

// 采煤队基本信息  搜索
export const coalMiningTeamInfoFilterConfig = {
  actions: ['create'],
  filters: [
    { label: '关键字', field: 'name', width: '240', layout: 'Text', placeholder: '队组名称 矿井名称' }
  ]
}

// 采煤队基本信息
export const coalMiningTeamInfoConfig = {
  actions: ['edit', 'delete','other'],
  otherActionTitle: ['生产情况'],
  summary: false,
  summaryField: [],
  checkbox: true,
  columns: [
    { label: '矿井名称', field: 'mineName', width: 'auto', layout: 'Text', immutable: true, placeholder: '请填写矿井名称' },
    { label: '队组名称', field: 'teamName', width: 'auto', layout: 'Text', require: true, placeholder: '请填写队组名称' },
    { label: '所属矿区', field: 'diggingsId', width: 'auto', layout: 'Select', options: [], require: true, placeholder: '请选择所属矿区' },
    { label: '所属工区', field: 'workAreaId', width: 'auto', layout: 'TreeSelect', options: [], require: true, placeholder: '请选择所属工区' },
    { label: '所属单位', field: 'unitId', width: 'auto', layout: 'TreeSelect', options: [], require: true, placeholder: '请选择所属单位' },
    { label: '队组类型', field: 'teamTypeId', width: 'auto', layout: 'Select', options: [], placeholder: '请选择队组类型' },
    { label: '在册人员数', field: 'registryNum', width: 'auto', layout: 'Number', hidden: true, placeholder: '请填写在册人员数' },
    { label: '管理人员数', field: 'manageNum', width: 'auto', layout: 'Number', require: true, placeholder: '请填写管理人员数' },
    { label: '队长', field: 'teamLeader', width: 'auto', layout: 'Text', placeholder: '请填写队长' },
    { label: '技术员', field: 'technician', width: 'auto', layout: 'Text', placeholder: '请填写技术员' },
    { label: '排序', field: 'orderNum', width: 'auto', layout: 'Number', placeholder: '请填写排序' }
  ]
}

// 采掘修队伍  搜索
export const tunnelingTeamInfoFilterConfig = {
  actions: ['search','create'],
  filters: [
    { label: '关键字', field: 'name', width: '240', layout: 'Text', placeholder: '单位名称' }
  ]
}

// 采掘修队伍
export const tunnelingTeamInfoConfig = {
  actions: ['edit', 'delete','other'],
  otherActionTitle: ['工作明细'],
  summary: false,
  summaryField: [],
  checkbox: true,
  columns: [
    { label: '矿井名称', field: 'mineName', width: 'auto', layout: 'Text', immutable: true, placeholder: '请填写矿井名称' },
    { label: '单位名称', field: 'deptName', width: 'auto', layout: 'Text', require: true, placeholder: '请填写队组名称' },
    { label: '所属矿区', field: 'diggingsId', width: 'auto', layout: 'Select', options: [], require: true, placeholder: '请选择所属矿区' },
    { label: '所属工区', field: 'workAreaId', width: 'auto', layout: 'TreeSelect', options: [], require: true, placeholder: '请选择所属工区' },
    { label: '所属单位', field: 'unitId', width: 'auto', layout: 'TreeSelect', options: [], require: true, placeholder: '请选择所属单位' },
    { label: '队组类别', field: 'teamTypeId', width: 'auto', layout: 'Select', options: [], placeholder: '请选择队组类型' },
    { label: '在册人数', field: 'registryNum', width: 'auto', layout: 'Number', hidden: true, placeholder: '请填写在册人员数' },
    { label: '队长', field: 'teamLeader', width: 'auto', layout: 'Text', placeholder: '请填写队长' },
    { label: '技术员', field: 'technician', width: 'auto', layout: 'Text', placeholder: '请填写技术员' },
    { label: '排序', field: 'orderNum', width: 'auto', layout: 'Number', require: true, hidden:true, placeholder: '请填写排序' }
  ]
}

// 工作面管理  搜索
export const workingFaceManageFilterConfig = {
  actions: ['search','create'],
  filters: [
    { label: '关键字', field: 'name', width: '240', layout: 'Text', placeholder: '工作面名称 工作面状态' }
  ]
}

// 工作面管理
export const workingFaceManageConfig = {
  actions: ['edit', 'delete','other'],
  otherActionTitle: ['工作面进度'],
  summary: false,
  summaryField: [],
  checkbox: true,
  columns: [
    { label: '矿井名称', field: 'mineName', width: 'auto', layout: 'Text', immutable: true, placeholder: '请填写矿井名称' },
    { label: '工作面名称', field: 'gzmName', width: 'auto', layout: 'Text', require: true, placeholder: '请填写工作面名称' },
    { label: '单位', field: 'unitId', width: 'auto', layout: 'TreeSelect', options: [], require: true, placeholder: '请选择单位' },
    { label: '所属煤层', field: 'coalFieldId', width: 'auto', layout: 'Select', options: [], require: true, placeholder: '请选择所属煤层' },
    { label: '类别', field: 'typeId', width: 'auto', layout: 'Select', options: [], require: true, placeholder: '请选择类别' },
    { label: '所属采区', field: 'mineAreaId', width: 'auto', layout: 'TreeSelect', options: [], require: true, placeholder: '请选择所属采区' },
    { label: '工作面长度(米)', field: 'gzmLength', width: 'auto', layout: 'Number', placeholder: '请填写工作面长度(米)' },
    { label: '设计长度(米)', field: 'designLength', width: 'auto', layout: 'Number', placeholder: '请填写设计长度(米)' },
    { label: '采高(米)', field: 'miningHeight', width: 'auto', layout: 'Number', require: true, placeholder: '请填写采高(米)' },
    { label: '煤层视密度(t/m³)', field: 'coalApparentDensity', width: 'auto', layout: 'Number', placeholder: '请填写视密度(t/m³)' },
    { label: '倾角(°)', field: 'dip', width: 'auto', layout: 'Number', placeholder: '请填写倾角(°)' },
    { label: '煤厚(米)', field: 'coalThick', width: 'auto', layout: 'Number', placeholder: '请填写煤厚(米)' },
    { label: '资源储量(万吨)', field: 'resourceReserve', width: 'auto', layout: 'Number', placeholder: '请填写资源储量(万吨)' },
    { label: '可采储量(万吨)', field: 'availableReserve', width: 'auto', layout: 'Number', require: true, placeholder: '请填写采储量(万吨)' },
    { label: '采煤工艺', field: 'coalMiningCraftId', width: 'auto', layout: 'Select', options: [], placeholder: '请选择采煤工艺' },
    { label: '落煤方式', field: 'coalWay', width: 'auto', layout: 'Text', placeholder: '请填写落煤方式' },
    { label: '回采率', field: 'recoalPercent', width: 'auto', layout: 'Text', placeholder: '请填写回采率' },
    { label: '采深(米)', field: 'miningDepth', width: 'auto', layout: 'Number', require: true, placeholder: '请填写采深(米)' },
    { label: '状态', field: 'workStatusId', width: 'auto', layout: 'Select', options: [], placeholder: '请选择状态' },
    { label: '接续工作面', field: 'gzmContinueId', width: 'auto', layout: 'Select', options: [], placeholder: '请选择接续工作面' },
    { label: '排序', field: 'orderNum', width: 'auto', layout: 'Number', require: true, placeholder: '请填写排序' },
    { label: '开始时间', field: 'startTime', width: 'auto', layout: 'DateTime', dateFormat:'yyyy-MM-dd', require: true, placeholder: '请选择开始时间' },
    { label: '结束时间', field: 'endTime', width: 'auto', layout: 'DateTime', dateFormat:'yyyy-MM-dd', placeholder: '请选择结束时间' },
  ]
}


// 巷道管理  搜索
export const tunnelManageFilterConfig = {
  actions: ['search','create'],
  filters: [
    { label: '关键字', field: 'name', width: '240', layout: 'Text', placeholder: '巷道名称 巷道状态' }
  ]
}

// 巷道管理
export const tunnelManageConfig = {
  actions: ['edit', 'delete','other'],
  otherActionTitle: ['巷修情况','巷修进度'],
  actionWidth: 220,
  summary: false,
  summaryField: [],
  checkbox: true,
  columns: [
    { label: '矿井名称', field: 'mineName', width: 'auto', layout: 'Text', immutable: true, placeholder: '请填写矿井名称' },
    { label: '巷道名称', field: 'tunnelName', width: 'auto', layout: 'Text', require: true, placeholder: '请填写巷道名称' },
    { label: '巷道类型', field: 'tunnelTypeId', width: 'auto', layout: 'Select', options: [], require: true, hidden: true, placeholder: '请选择巷道类型' },
    { label: '队伍名称', field: 'teamId', width: 'auto', layout: 'TreeSelect', options: [], multiple: true, placeholder: '请选择队伍名称' },
    { label: '断面形状', field: 'fractureSurfaceId', width: 'auto', layout: 'Select', options: [], placeholder: '请选择断面形状' },
    { label: '岩性类型', field: 'lithologyTypeId', width: 'auto', layout: 'Select', options: [], require: true, placeholder: '请选择岩性类型' },
    { label: '采掘阶段', field: 'digStageId', width: 'auto', layout: 'Select', options: [], require: true, placeholder: '请选择采掘阶段' },
    { label: '关联工作面', field: 'workFacetId', width: '100', layout: 'Select', options: [], placeholder: '请填写关联工作面' },
    { label: '巷道状态', field: 'tunnelStatusId', width: 'auto', layout: 'Select', options: [], placeholder: '请选择巷道状态' },
    { label: '掘进方式', field: 'digWayId', width: 'auto', layout: 'Select', options: [], require: true, hidden: true, placeholder: '请选择掘进方式' },
    { label: '支护方式', field: 'shoringWayId', width: 'auto', layout: 'Select', options: [], require: true, hidden: true, placeholder: '请选择支付方式' },
    { label: '标高范围(m)', field: 'elevationRange', width: 'auto', layout: 'Text', require: true, hidden: true, placeholder: '请填写标高范围(m)' },
    { label: '净断面积(m²)', field: 'jdArea', width: 'auto', layout: 'Number', require: true, hidden: true, placeholder: '请填写净断面积(m²)' },
    { label: '设计长度(m)', field: 'designerLength', width: '100', layout: 'Number', require: true, placeholder: '请填写设计长度(m)' },
    { label: '巷道尺寸', field: 'tunnelSize', width: 'auto', layout: 'Text', require: true, hidden: true, placeholder: '请填写巷道尺寸' },
    { label: '开始时间', field: 'startTime', width: 'auto', layout: 'DateTime', require: true, dateFormat:'yyyy-MM-dd', placeholder: '请选择开始时间)' },
    // { label: '巷修情况', field: 'dip', width: 'auto', layout: 'Number', placeholder: '请填写倾角(°)' },
    { label: '排序', field: 'orderNum', width: 'auto', layout: 'Number', require: true, hidden: true, placeholder: '请填写排序' },
    { label: '完成时间', field: 'endTime', width: 'auto', layout: 'DateTime', hidden: true, dateFormat:'yyyy-MM-dd', placeholder: '请选择完成时间' }
  ]
}

// 巷道情况  搜索
export const laneRepairFilterconfig = {
  actions: ['search','create'],
  filters: [
    { label: '关键字', field: 'name', width: '240', layout: 'Text', placeholder: '巷道名称' }
  ]
}

// 巷修情况
export const laneRepairconfig = {
  actions: ['edit', 'delete'],
  summary: false,
  summaryField: [],
  checkbox: true,
  columns: [
    { label: '巷道名称', field: 'tunnelName', width: '100', layout: 'Text', disabled: true, placeholder: '请填写巷道名称' },
    { label: '扩修时间', field: 'expandTime', width: '144', layout: 'DateTime', dateFormat:'yyyy-MM-dd', placeholder: '请选择扩修时间' },
    { label: '扩修后断面', field: 'expandFractureSurface', width: '100', layout: 'Text', placeholder: '请填写扩修后断面' },
    { label: '工作内容', field: 'workContent', width: 'auto', layout: 'Text', placeholder: '请填写工作内容' },
    { label: '巷修情况报告', field: 'eventId', width: '110', layout: 'Upload', showType: 'underline', placeholder: '请上传巷修情况报告' }
  ]
}

export const miningOperationConfig = {
  actions: ['edit', 'delete','other'],
  otherActionTitle: ['作业规程文件','补充措施文件'],
  actionWidth: 260,
  summary: false,
  summaryField: [],
  checkbox: true,
  columns: [
    { label: '规程编号', field: 'ruleCode', width: 'auto', layout: 'Text', require: true, placeholder: '请填写规程编号' },
    { label: '规程名称', field: 'ruleName', width: 'auto', layout: 'Text', require: true, placeholder: '请填写规程名称' },
    { label: '编辑人', field: 'editor', width: 'auto', layout: 'Text', require: true, placeholder: '请填写编辑人' },
    { label: '编辑日期', field: 'editTime', width: '144', sortable: true, layout: 'DateTime', dateFormat:'yyyy-MM-dd', require: true, placeholder: '请选择编辑时间' },
    { label: '施工单位', field: 'unit', width: 'auto', layout: 'Text', placeholder: '请填写施工单位' },
    { label: '执行时间', field: 'executeDate', width: '144', sortable: true, layout: 'DateTime', dateFormat:'yyyy-MM-dd', placeholder: '请选择执行时间' },
    // { label: '作业规程文件', field: 'operateFile', width: '150', layout: 'Upload', showType: 'underline', placeholder: '请上传附件' },
    // { label: '补充措施文件', field: 'measureFile', width: '150', layout: 'Upload', showType: 'underline', placeholder: '请上传附件' }
  ]
}

export const miningOperationFilterConfig = {
  /**
   * @param {array} actions   操作按钮
   * @param {array} filters   筛选项
   * @param {array} options   选择器配置项
   */
  actions: ['search', 'reset', 'create', 'delete'],
  filters: [
    { label: '规程名称', field: 'name', width: '220', layout: 'Text', placeholder: '规程编号、规程名称' }
  ]
}

// 工作面生命周期管理
export const workingLifectcleConfig = {
  actions: ['edit', 'delete', 'other'],
  otherActionTitle: ['工作面进度'],
  summary: false,
  summaryField: [],
  checkbox: true,
  columns: [
    { label: '工作面名称', field: 'gzmNameId', width: '150', layout: 'Select', options: [], require: true, placeholder: '请填写工作面名称' },
    { label: '日期', field: 'gzmTime', width: '150', sortable: true, layout: 'DateTime', require: true, dateFormat:'yyyy-MM-dd', placeholder: '请选择日期' },
    { label: '事件名称', field: 'eventName', width: '150', layout: 'Text', placeholder: '请填写事件名称' },
    { label: '排序', field: 'orderNum', width: '100', layout: 'Number', hidden: true, placeholder: '请填写排序' },
    { label: '说明', field: 'remark', width: 'auto', layout: 'Textarea', require: true, placeholder: '请填写说明' },
    { label: '附件', field: 'eventId', width: '150', layout: 'Upload', showType: 'underline', placeholder: '请上传附件' }
  ]
}

// 工作面生命周期管理 搜索
export const workingLifectcleFilterConfig = {
  actions: ['search', 'reset', 'create', 'delete'],
  filters: [
    { label: '关键字', field: 'name', width: '220', layout: 'Text', placeholder: '工作面名称、说明' }
  ]
}

// 巷道生命周期管理
export const roadwayLifecyleConfig = {
  actions: ['edit', 'delete', 'other'],
  otherActionTitle: ['巷道进度'],
  summary: false,
  summaryField: [],
  checkbox: true,
  columns: [
    { label: '巷道名称', field: 'tunnelNameId', width: '150', layout: 'Select', options: [], placeholder: '请填写工作面名称' },
    { label: '事件名称', field: 'eventName', width: '150', layout: 'Text', placeholder: '请填写事件名称' },
    { label: '日期', field: 'tunnelTime', width: '150', sortable: true, layout: 'DateTime', dateFormat:'yyyy-MM-dd', placeholder: '请选择日期' },
    { label: '排序', field: 'orderNum', width: '100', layout: 'Number', hidden: true, placeholder: '请填写排序' },
    { label: '说明', field: 'remark', width: 'auto', layout: 'Textarea', placeholder: '请填写说明' },
    { label: '附件', field: 'eventId', width: '150', layout: 'Upload', showType: 'underline', placeholder: '请上传附件' }
  ]
}

// 巷道生命周期管理 搜索
export const roadwayLifecyleFilterConfig = {
  /**
   * @param {array} actions   操作按钮
   * @param {array} filters   筛选项
   * @param {array} options   选择器配置项
   */
  actions: ['search', 'reset', 'create', 'delete'],
  filters: [
    { label: '巷道名称', field: 'name', width: '220', layout: 'Text', placeholder: '巷道名称、事件名称' }
  ]
}
