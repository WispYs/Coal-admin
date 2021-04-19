/** 应急救援保障菜单下配置 */

// 手机号码验证
import { validatePhone } from '@/utils/validate'

// 应急通讯组织机构table表
const EmergencyCommunicationOrganizationTableConfig = {
  actions: ['edit', 'delete'],
  rowKey: 'yjjyCommunicationTissueId',
  lazy: true,
  columns: [
    { label: '名称', field: 'name', layout: 'Text', placeholder: '请填写名称' },
    { label: '编号', field: 'code', layout: 'Text', placeholder: '请填写编号', disabled: true },
    { label: '排序', field: 'orderNum', layout: 'Text', placeholder: '请填写排序' },
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
      ], placeholder: '请选择上级节点' },
    { label: '创建日期', field: 'beginTime', layout: 'DateTime', disabled: true, placeholder: '请填写创建日期' },
    { label: '备注', field: 'remark', layout: 'Textarea', placeholder: '请填写备注' }
  ]
}

// 应急通讯组织机构头部配置
const EmergencyCommunicationOrganizationFilterConfig = {
  actions: ['search', 'reset', 'create', 'delete', 'refresh'],
  filters: [
    { label: '搜索', field: 'keyword', width: '220', layout: 'Text', placeholder: '名称' }
  ]
}

// 应急通讯table表
const EmergencyCommunicationTableConfig = {
  actions: ['edit', 'delete'],
  checkbox: true,
  columns: [
    { label: '序号', field: 'index', layout: 'Text', placeholder: '请填写序号', disabled: true },
    { label: '所属组织', field: 'yjjyCommunicationTissueId', layout: 'TreeSelect', options: [
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
    ], placeholder: '请填写所属组织' },
    { label: '姓名', field: 'userName', layout: 'Text', placeholder: '请填写姓名', require: true },
    { label: '职务', field: 'duty', layout: 'Text', placeholder: '请填写职务' },
    { label: '工号', field: 'jobNumber', layout: 'Text', placeholder: '请填写工号' },
    { label: '办公室电话', field: 'officePhone', layout: 'Text', placeholder: '请填写办公室电话' },
    { label: '手机', field: 'phone', layout: 'Text', placeholder: '请填写手机', rule: [
      { validator: validatePhone, trigger: 'blur' }
    ], require: true },
    { label: '电子邮件', field: 'email', layout: 'Text', placeholder: '请填写电子邮件' },
    { label: '通讯地址', field: 'path', layout: 'Text', placeholder: '请填写通讯地址' },
    { label: '备注', field: 'remark', layout: 'Text', placeholder: '请填写备注' },
    { label: '排序', field: 'orderNum', layout: 'Text', placeholder: '请填写排序' }
  ]
}

// 应急通讯头部配置
const EmergencyCommunicationFilterConfig = {
  actions: ['search', 'reset', 'create', 'delete', 'refresh'],
  filters: [
    { label: '搜索', field: 'keyword', width: '220', layout: 'Text', placeholder: '姓名、工号' }
  ]
}

// 应急队伍table表
const EmergencyResponseTeamTableConfig = {
  actions: ['edit', 'delete'],
  checkbox: true,
  columns: [
    { label: '序号', field: 'index', layout: 'Text', placeholder: '请填写序号', disabled: true },
    { label: '队员姓名', field: 'teamUserName', layout: 'Text', placeholder: '请填写队员姓名', require: true },
    { label: '队伍类别', field: 'teamType', layout: 'Select',
      options: [
        { value: 1, label: '专业队' },
        { value: 2, label: '兼职队' }
      ], placeholder: '请填写队伍类别', require: true },
    { label: '出生日期', field: 'birthTime', layout: 'DateTime', placeholder: '请填写出生日期' },
    { label: '性别', field: 'gender', layout: 'Select',
      options: [
        { value: 1, label: '男' },
        { value: 2, label: '女' }
      ], placeholder: '请填写性别', require: true },
    { label: '身份证', field: 'identityCard', layout: 'Text', placeholder: '请填写身份证' },
    { label: '联系电话', field: 'phone', layout: 'Text', placeholder: '请填写联系电话', rule: [
      { validator: validatePhone, trigger: 'blur' }
    ], require: true },
    { label: '教育水平', field: 'educationalLevel', layout: 'Text', placeholder: '请填写教育水平' },
    { label: '备注', field: 'remark', layout: 'Text', placeholder: '请填写备注' }
  ]
}

// 应急队伍头部配置
const EmergencyResponseFilterConfig = {
  actions: ['search', 'reset', 'create', 'delete'],
  filters: [
    { label: '搜索', field: 'keyword', width: '220', layout: 'Text', placeholder: '队员姓名、队伍类别' }
  ]
}

// 应急专家table表
const EmergencyExpertsTableConfig = {
  actions: ['edit', 'delete'],
  checkbox: true,
  columns: [
    { label: '序号', field: 'index', layout: 'Text', placeholder: '请填写序号', disabled: true },
    { label: '单位名称', field: 'unitName', layout: 'Text', placeholder: '请填写单位名称', require: true },
    { label: '专家姓名', field: 'specialistName', layout: 'Text', placeholder: '请填写专家姓名', require: true },
    { label: '专业', field: 'major', layout: 'Select',
      options: [
        { value: 1, label: '专业队' },
        { value: 2, label: '兼职队' }
      ], placeholder: '请填写专业', require: true },
    { label: '固定电话', field: 'fixedPhone', layout: 'Text', placeholder: '请填写固定电话' },
    { label: '手机', field: 'phone', layout: 'Text', placeholder: '请填写手机', rule: [
      { validator: validatePhone, trigger: 'blur' }
    ], require: true },
    { label: '职位', field: 'job', layout: 'Text', placeholder: '请填写职位' },
    { label: '时间', field: 'createTime', layout: 'DateTime', placeholder: '请填写时间', disabled: true }
  ]
}

// 应急专家头部配置
const EmergencyExpertsFilterConfig = {
  actions: ['search', 'reset', 'create', 'delete'],
  filters: [
    { label: '搜索', field: 'keyword', width: '220', layout: 'Text', placeholder: '专家姓名、专业' }
  ]
}

// 应急物资table表
const EmergencySuppliesTableConfig = {
  actions: ['edit', 'delete'],
  checkbox: true,
  columns: [
    { label: '序号', field: 'index', layout: 'Text', placeholder: '请填写序号', disabled: true },
    { label: '部门名称', field: 'deptName', layout: 'Text', placeholder: '请填写部门名称', require: true },
    { label: '事故类别', field: 'accidentType', layout: 'Select',
      options: [
        { value: 1, label: '专业队' },
        { value: 2, label: '兼职队' }
      ], placeholder: '请填写事故类别', require: true },
    { label: '设备名称', field: 'deviceName', layout: 'Text', placeholder: '请填写设备名称', require: true },
    { label: '设备种类', field: 'deviceType', layout: 'Select',
      options: [
        { value: 1, label: '专业队' },
        { value: 2, label: '兼职队' }
      ], placeholder: '请填写设备种类', require: true },
    { label: '数量', field: 'goodNumber', layout: 'Text', placeholder: '请填写数量' },
    { label: '单位', field: 'unit', layout: 'Text', placeholder: '请填写单位' },
    { label: '规格', field: 'specification', layout: 'Text', placeholder: '请填写规格' },
    { label: '存放地点', field: 'path', layout: 'Text', placeholder: '请填写存放地点' },
    { label: '性能', field: 'performance', layout: 'Text', placeholder: '请填写性能' },
    { label: '用途', field: 'purpose', layout: 'Text', placeholder: '请填写用途' },
    { label: '用法', field: 'goodsUsage', layout: 'Text', placeholder: '请填写用法' },
    { label: '管理单位', field: 'administrationUnit', layout: 'Text', placeholder: '请填写管理单位' },
    { label: '维护单位', field: 'maintainUnit', layout: 'Text', placeholder: '请填写维护单位' },
    { label: '负责人', field: 'userName', layout: 'Text', placeholder: '请填写负责人', require: true },
    { label: '联系电话', field: 'phone', layout: 'Text', placeholder: '请填写联系电话', rule: [
      { validator: validatePhone, trigger: 'blur' }
    ], require: true }
  ]
}

// 应急物资头部配置
const EmergencySuppliesFilterConfig = {
  actions: ['search', 'reset', 'create', 'delete'],
  filters: [
    { label: '搜索', field: 'keyword', width: '220', layout: 'Text', placeholder: '部门名称' }
  ]
}

// 应急车辆table表
const EmergencyVehiclesTableConfig = {
  actions: ['edit', 'delete'],
  checkbox: true,
  columns: [
    { label: '序号', field: 'index', layout: 'Text', placeholder: '请填写序号', disabled: true },
    { label: '车辆名称', field: 'vehicleName', layout: 'Text', placeholder: '请填写车辆名称', require: true },
    { label: '所属单位', field: 'unit', layout: 'Select',
      options: [
        { value: 1, label: '专业队' },
        { value: 2, label: '兼职队' }
      ], placeholder: '请填写所属单位', require: true },
    { label: '规格型号', field: 'modelNumber', layout: 'Text', placeholder: '请填写规格型号' },
    { label: '数量', field: 'number', layout: 'Text', placeholder: '请填写数量' },
    { label: '存放地点', field: 'path', layout: 'Text', placeholder: '请填写存放地点', require: true },
    { label: '创建日期', field: 'createTime', layout: 'Text', placeholder: '请填写创建日期', disabled: true },
    { label: '备注', field: 'remark', layout: 'Textarea', placeholder: '请填写备注' }
  ]
}

// 应急车辆头部配置
const EmergencyVehiclesFilterConfig = {
  actions: ['search', 'reset', 'create', 'delete'],
  filters: [
    { label: '搜索', field: 'keyword', width: '220', layout: 'Text', placeholder: '车辆名称、规格型号' }
  ]
}

// 应急医疗table表
const EmergencyMedicalTableConfig = {
  actions: ['edit', 'delete'],
  checkbox: true,
  columns: [
    { label: '序号', field: 'index', layout: 'Text', placeholder: '请填写序号', disabled: true },
    { label: '医疗单位', field: 'medicalUnit', layout: 'Text', placeholder: '请填写医疗单位', require: true },
    { label: '负责人', field: 'userName', layout: 'Text', placeholder: '请填写负责人', require: true },
    { label: '所属单位', field: 'unit', layout: 'Text', placeholder: '请填写所属单位' },
    { label: '所在地址', field: 'path', layout: 'Text', placeholder: '请填写所在地址', require: true },
    { label: '联系电话', field: 'phone', layout: 'Text', rule: [
      { validator: validatePhone, trigger: 'blur' }
    ], placeholder: '请填写联系电话', require: true },
    { label: '创建日期', field: 'createTime', layout: 'Text', placeholder: '请填写创建日期' },
    { label: '备注', field: 'remark', layout: 'Textarea', placeholder: '请填写备注' }
  ]
}

// 应急医疗头部配置
const EmergencyMedicalFilterConfig = {
  actions: ['search', 'reset', 'create', 'delete'],
  filters: [
    { label: '搜索', field: 'keyword', width: '220', layout: 'Text', placeholder: '医疗单位、负责人' }
  ]
}

export {
  EmergencyCommunicationOrganizationTableConfig,
  EmergencyCommunicationOrganizationFilterConfig,
  EmergencyCommunicationTableConfig,
  EmergencyCommunicationFilterConfig,
  EmergencyResponseTeamTableConfig,
  EmergencyResponseFilterConfig,
  EmergencyExpertsTableConfig,
  EmergencyExpertsFilterConfig,
  EmergencySuppliesTableConfig,
  EmergencySuppliesFilterConfig,
  EmergencyVehiclesTableConfig,
  EmergencyVehiclesFilterConfig,
  EmergencyMedicalTableConfig,
  EmergencyMedicalFilterConfig
}
