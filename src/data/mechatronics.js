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
   */
/**
   * FilterConfig
   * @param {array} actions   操作按钮
   * @param {array} filters   筛选项
   * @param {array} options   选择器配置项
   */

/** ---- 机电管理 ---- **/
// 大型设备管理
export const MechLargeEquipTableConfig = {
  actions: ['edit', 'delete', 'other'],
  otherActionTitle: ['特有属性'],
  checkbox: true,
  columns: [
    { label: '设备编号', field: 'eid', width: '120', layout: 'Text', require: true, placeholder: '请填写设备编号' },
    { label: '设备名称', field: 'name', width: '120', layout: 'Text', require: true, placeholder: '请填写设备名称' },
    { label: '所属场所', field: 'area', layout: 'Select', require: true,
      options: [
        {
          value: 1,
          label: '中央区'

        }
      ], placeholder: '请选择所属场所' },
    { label: '所属部件', field: 'part', width: '90', layout: 'Select', require: true,
      options: [
        {
          value: 1,
          label: '提升机'
        }, {
          value: 2,
          label: '空气压缩机'
        }, {
          value: 3,
          label: '通风机'
        }
      ], placeholder: '请选择所属部件' },
    { label: '规格型号', field: 'model', width: '120', layout: 'Text', placeholder: '请填写规格型号' },
    { label: '生产厂家', field: 'factory', width: '90', layout: 'Text', placeholder: '请填写生产厂家' },
    { label: '资产编号', field: 'uid', width: '120', layout: 'Text', placeholder: '请填写资产编号' },
    { label: '出厂日期', field: 'createData', width: '120', sortable: true, layout: 'DateTime', require: true, placeholder: '请选择日期' },
    { label: '到货日期', field: 'deliveryData', width: '120', sortable: true, layout: 'DateTime', require: true, placeholder: '请选择日期' },
    { label: '使用日期', field: 'useDate', width: '120', sortable: true, layout: 'DateTime', placeholder: '请选择日期' },
    { label: '原值', field: 'originalValue', width: '120', layout: 'Text', hidden: true, placeholder: '请填写原值' },
    { label: '净值', field: 'netValue', width: '120', layout: 'Text', hidden: true, placeholder: '请填写净值' },
    { label: '运行时长', field: 'runtime', width: '120', layout: 'Text', hidden: true, placeholder: '请填写运行时长' },
    { label: '附件', field: 'file', width: '120', layout: 'Upload', showType: 'underline', placeholder: '请上传附件' },
    { label: '二维码', field: 'QRcode', width: '120', layout: 'Upload', showType: 'underline', disabled: true }
  ]
}
export const MechLargeEquipFilterConfig = {
  actions: ['search', 'reset', 'create'],
  filters: [
    { label: '关键字', field: 'keyword', width: '220', layout: 'Text', placeholder: '设备编号，设备名称' }
  ]
}
export const MechLargeEquipDetailTableConfig = {
  actions: ['edit', 'delete'],
  checkbox: true,
  columns: [
    { label: '属性名称', field: 'name', layout: 'Text', require: true, placeholder: '请填写属性名称' },
    { label: '属性内容', field: 'info', layout: 'Text', require: true, placeholder: '请填写属性内容' },
    { label: '排序', field: 'sort', layout: 'Text', require: true, placeholder: '请填写排序' }
  ]
}
export const MechLargeEquipDetailFilterConfig = {
  actions: ['search', 'reset', 'create'],
  filters: [
    { label: '关键字', field: 'keyword', width: '220', layout: 'Text', placeholder: '属性名称，属性内容' }
  ]
}
// 大型设备类型
export const MechLargeEquipTypeTableConfig = {
  actions: ['edit', 'delete', 'other'],
  otherActionTitle: ['展开详情'],
  checkbox: true,
  rowKey: 'id',
  columns: [
    { label: '类型名称', field: 'name', layout: 'Text', require: true, placeholder: '请填写类型名称' },
    { label: '排序', field: 'sort', layout: 'Text', placeholder: '请填写排序' },
    { label: '备注', field: 'remark', layout: 'Text', require: true, placeholder: '请填写备注' },
    { label: '录入时间', field: 'createDate', layout: 'DateTime', disabled: true, placeholder: '请填写录入时间' },
    { label: '所属场所', field: 'area', layout: 'TreeSelect', hidden: true,
      options: [
        {
          value: 1,
          label: '顾桥矿',
          children: [
            { value: 2, label: '机关', children: [
              { value: 3, label: '矿领导' },
              { value: 17, label: '人力资源部' }
            ] }
          ]
        }
      ], placeholder: '请选择所属场所' }
  ]
}
export const MechLargeEquipTypeFilterConfig = {
  actions: ['search', 'reset', 'create'],
  filters: [
    { label: '关键字', field: 'keyword', width: '220', layout: 'Text', placeholder: '类型名称' }
  ]
}
// 维修知识库
export const KnowLedgeTableConfig = {
  actions: ['edit', 'delete'],
  checkbox: true,
  columns: [
    { label: '所属场所', field: 'area', layout: 'Select', require: true,
      options: [{ value: 1, label: '中央区' }], placeholder: '请选择所属场所' },
    { label: '检查项目', field: 'project', layout: 'Text', require: true, placeholder: '请填写检查项目' },
    { label: '检修位置', field: 'addr', layout: 'Text', require: true, placeholder: '请填写检修位置' },
    { label: '检修周期', field: 'period', layout: 'Text', require: true, placeholder: '请填写检修周期' },
    { label: '责任人', field: 'person', layout: 'Text', require: true, placeholder: '请填写责任人' },
    { label: '检查检修标准', field: 'standard', width: '120px', layout: 'Textarea', placeholder: '请填写检查检修标准' },
    { label: '备注', field: 'remark', width: '', layout: 'Textarea', placeholder: '请填写备注' }
  ]
}
export const KnowLedgeFilterConfig = {
  actions: ['search', 'reset', 'create', 'delete'],
  filters: [
    { label: '关键字', field: 'keyword', width: '220', layout: 'Text', placeholder: '所属场所，检修位置' }
  ]
}
// 设备能耗分析知识库
export const DisKnowLedgeTableConfig = {
  actions: ['edit', 'delete'],
  checkbox: true,
  columns: [
    { label: '所属场所', field: 'area', layout: 'Select', require: true,
      options: [{ value: 1, label: '中央区' }], placeholder: '请选择所属场所' },
    { label: '参考国家标准', field: 'standard', width: '120px', layout: 'Text', require: true, placeholder: '请填写参考国家标准' },
    { label: '报警阈值', field: 'alarm', layout: 'Text', require: true, placeholder: '请填写报警阈值' },
    { label: '能耗单位', field: 'unit', layout: 'Text', require: true, placeholder: '请填写能耗单位' },
    { label: '说明', field: 'explain', width: '120px', layout: 'Textarea', placeholder: '请填写说明' },
    { label: '能耗公式', field: 'formula', layout: 'TextEditor', showType: 'underline', underlineText: '展开公式', placeholder: '请填写能耗公式' },
    { label: '辅助决策', field: 'decision', layout: 'Textarea', placeholder: '请填写辅助决策' },
    { label: '等级评定', field: 'evaluate', layout: 'TextEditor', showType: 'underline', underlineText: '等级评定', placeholder: '请填写等级评定' }
  ]
}
export const DisKnowLedgeFilterConfig = {
  actions: ['search', 'reset', 'create', 'delete'],
  filters: [
    { label: '关键字', field: 'keyword', width: '220', layout: 'Text', placeholder: '参考国家标准，辅助决策' }
  ]
}

/** ---- 运输管理 ---- **/
// 大型设备管理（同机电管理）
// 大型设备类型（同机电管理）
// 典型故障知识库
export const TypicalFaultTableConfig = {
  actions: ['edit', 'delete'],
  checkbox: true,
  columns: [
    { label: '所属场所', field: 'area', layout: 'Select', require: true,
      options: [{ value: 1, label: '中央区' }], placeholder: '请选择所属场所' },
    { label: '故障种类', field: 'fault', layout: 'Select', require: true,
      options: [
        { value: 1, label: '机械' },
        { value: 2, label: '电气' },
        { value: 3, label: '液压' },
        { value: 4, label: '综合' }
      ], placeholder: '请填写故障种类' },
    { label: '故障程度分级', field: 'level', layout: 'Select', require: true,
      options: [
        { value: 1, label: '工人级' },
        { value: 2, label: '区队级' },
        { value: 3, label: '科室级' },
        { value: 4, label: '矿长级' }
      ], placeholder: '请填写故障种类' },
    { label: '故障现象', field: 'phenomenon', layout: 'Textarea', placeholder: '请填写故障现象' },
    { label: '故障原因', field: 'reason', layout: 'Textarea', placeholder: '请填写故障原因' },
    { label: '排除方法', field: 'way', layout: 'Textarea', placeholder: '请填写排除方法' },
    { label: '备注', field: 'remark', layout: 'Textarea', placeholder: '请填写备注' }
  ]
}
export const TypicalFaultFilterConfig = {
  actions: ['search', 'reset', 'create', 'delete'],
  filters: [
    { label: '关键字', field: 'keyword', width: '220', layout: 'Text', placeholder: '所在场所、故障种类' }
  ]
}
// 历史故障知识库
export const HistoryFaultTableConfig = {
  actions: ['edit', 'delete'],
  checkbox: true,
  columns: [
    { label: '事故关键词', field: 'keyword', layout: 'Text', require: true, placeholder: '请填写事故关键词' },
    { label: '所属场所', field: 'area', layout: 'Select', require: true,
      options: [{ value: 1, label: '中央区' }], placeholder: '请选择所属场所' },
    { label: '时间', field: 'time', layout: 'DateTime', require: true, placeholder: '请选择时间' },
    { label: '故障记录', field: 'record', layout: 'Textarea', require: true, placeholder: '请填写故障记录' },
    { label: '原因分析', field: 'reason', layout: 'Textarea', require: true, placeholder: '请填写原因分析' },
    { label: '防范措施', field: 'way', layout: 'Textarea', require: true, placeholder: '请填写防范措施' }
  ]
}
export const HistoryFaultFilterConfig = {
  actions: ['search', 'reset', 'create', 'delete'],
  filters: [
    { label: '关键字', field: 'keyword', width: '220', layout: 'Text', placeholder: '事故关键词，故障记录' }
  ]
}

/** ---- 检修管理 ---- **/
// 检修计划
export const ServicePlanTableConfig = {
  actions: ['edit', 'delete'],
  checkbox: true,
  columns: [
    { label: '所属场所', field: 'area', layout: 'Select', width: '120px', require: true,
      options: [{ value: 1, label: '中央区' }], placeholder: '请选择所属场所' },
    { label: '设备名称', field: 'name', layout: 'Text', require: true, placeholder: '请填写设备名称' },
    { label: '检修时间', field: 'time', layout: 'DateTime', width: '100px', require: true, placeholder: '请选择检修时间' },
    { label: '检修周期', field: 'period', layout: 'Select', require: true,
      options: [
        { value: 1, label: '年' },
        { value: 2, label: '月' },
        { value: 3, label: '周' },
        { value: 4, label: '日' }
      ], placeholder: '请选择检修周期' },
    { label: '管理预警天数', field: 'warning', layout: 'Text', width: '110px', require: true, placeholder: '请填写管理预警天数' },
    { label: '管理报警天数', field: 'alarm', layout: 'Text', width: '110px', require: true, placeholder: '请填写管理报警天数' },
    { label: '多次提醒次数', field: 'remind', layout: 'Text', width: '110px', require: true, placeholder: '请填写多次提醒次数' },
    { label: '责任人', field: 'person', layout: 'Text', require: true, placeholder: '请填写责任人' },
    { label: '抄送人', field: 'copyPerson', layout: 'Text', require: true, placeholder: '请填写抄送人' },
    { label: '抄送内容', field: 'copy', layout: 'Text', require: true, placeholder: '请填写抄送内容' },
    { label: '维检内容', field: 'maintain', layout: 'Textarea', require: true, placeholder: '请填写维检内容' },
    { label: '备注', field: 'remark', layout: 'Textarea', require: true, placeholder: '请填写备注' }
  ]
}
export const ServicePlanFilterConfig = {
  actions: ['search', 'reset', 'create', 'delete'],
  filters: [
    { label: '关键字', field: 'keyword', width: '220', layout: 'Text', placeholder: '所属场所，设备名称' }
  ]
}
// 日常维检管理
export const DailyServiceTableConfig = {
  actions: ['other'],
  otherActionTitle: ['日常维检', '维检记录'],
  columns: [
    { label: '所属场所', field: 'area', layout: 'Select', width: '120px', require: true,
      options: [{ value: 1, label: '中央区' }], placeholder: '请选择所属场所' },
    { label: '设备名称', field: 'name', layout: 'Text', require: true, placeholder: '请填写设备名称' },
    { label: '维检内容', field: 'maintain', layout: 'Textarea', require: true, placeholder: '请填写维检内容' },
    { label: '检修时间', field: 'time', layout: 'DateTime', width: '100px', require: true, placeholder: '请选择检修时间' },
    { label: '检修周期', field: 'period', layout: 'Select', require: true,
      options: [
        { value: 1, label: '年' },
        { value: 2, label: '月' },
        { value: 3, label: '周' },
        { value: 4, label: '日' }
      ], placeholder: '请选择检修周期' },
    { label: '管理预警天数', field: 'warning', layout: 'Text', width: '110px', require: true, placeholder: '请填写管理预警天数' },
    { label: '管理报警天数', field: 'alarm', layout: 'Text', width: '110px', require: true, placeholder: '请填写管理报警天数' },
    { label: '责任人', field: 'person', layout: 'Text', require: true, placeholder: '请填写责任人' },
    { label: '备注', field: 'remark', layout: 'Textarea', require: true, placeholder: '请填写备注' }
  ]
}
export const DailyServiceFilterConfig = {
  actions: ['search', 'reset'],
  filters: [
    { label: '关键字', field: 'keyword', width: '220', layout: 'Text', placeholder: '所属场所，设备名称' }
  ]
}
// 设备维修
export const EquipmentServiceTableConfig = {
  actions: ['edit', 'delete', 'other'],
  otherActionTitle: ['进展'],
  checkbox: true,
  columns: [
    { label: '所属场所', field: 'area', layout: 'Select', width: '120px', require: true,
      options: [{ value: 1, label: '中央区' }], placeholder: '请选择所属场所' },
    { label: '设备名称', field: 'name', layout: 'Text', require: true, placeholder: '请填写设备名称' },
    { label: '类型', field: 'type', layout: 'Select', require: true,
      options: [{ value: 1, label: '日常维检' }], placeholder: '请选择类型' },
    { label: '故障主题', field: 'fault', layout: 'Textarea', require: true, placeholder: '请填写故障主题' },
    { label: '故障情况', field: 'condition', layout: 'Textarea', placeholder: '请填写故障情况' },
    { label: '状态', field: 'status', layout: 'Select', width: '100px', require: true, showType: 'colorLump',
      options: [{ value: 1, label: '已处理' }, { value: 2, label: '未处理' }], placeholder: '请选择状态' },
    { label: '处理过程', field: 'course', layout: 'Text', width: '100px', placeholder: '请填写处理过程' },
    { label: '处理结果', field: 'result', layout: 'Text', width: '100px', placeholder: '请填写处理结果' },
    { label: '处理人', field: 'person', layout: 'Text', placeholder: '请填写处理人' },
    { label: '处理时间', field: 'time', layout: 'DateTime', width: '100px', require: true, placeholder: '请选择处理时间' },
    { label: '附件', field: 'file', layout: 'Upload', placeholder: '请上传附件' }
  ]
}
export const EquipmentServiceFilterConfig = {
  actions: ['search', 'reset', 'create', 'checkSpare'],
  filters: [
    { label: '关键字', field: 'keyword', width: '220', layout: 'Text', placeholder: '故障主题，故障情况' }
  ]
}
// 查看备品备件
export const CheckSpareTableConfig = {
  columns: [
    { label: '所属场所', field: 'area', layout: 'Select', width: '120px', require: true,
      options: [{ value: 1, label: '中央区' }], placeholder: '请选择所属场所' },
    { label: '备件名称', field: 'name', layout: 'Text', require: true, placeholder: '请填写名称' },
    { label: '规格型号', field: 'model', layout: 'Text', require: true, placeholder: '请填写规格型号' },
    { label: '计量单位', field: 'unit', layout: 'Text', placeholder: '请填写计量单位' },
    { label: '使用地点', field: 'addr', layout: 'Text', placeholder: '请填写使用地点' },
    { label: '存放位置', field: 'store', layout: 'Text', placeholder: '请填写存放位置' },
    { label: '当前数量', field: 'sum', layout: 'Text', placeholder: '请填写当前数量' },
    { label: '预警数量限制', field: 'warning', layout: 'Text', placeholder: '请填写预警数量限制' },
    { label: '责任人', field: 'person', layout: 'Text', placeholder: '请填写处理人' },
    { label: '更新人', field: 'updater', layout: 'Text', placeholder: '请填写处理人' },
    { label: '状态', field: 'status', layout: 'Select', width: '100px', require: true, showType: 'colorLump',
      options: [{ value: 1, label: '已处理' }, { value: 2, label: '未处理' }], placeholder: '请选择状态' }
  ]
}
// 备品备件
export const SparePartTableConfig = {
  actions: ['edit', 'delete', 'other'],
  otherActionTitle: ['领用', '入库', '明细'],
  actionWidth: 200,
  checkbox: true,
  columns: [
    { label: '所属场所', field: 'area', layout: 'Select', width: '120px', require: true,
      options: [{ value: '1', label: '主井' }, { value: '2', label: '副井' }], placeholder: '请选择所属场所' },
    { label: '备件名称', field: 'name', layout: 'Text', require: true, placeholder: '请填写名称' },
    { label: '规格型号', field: 'model', layout: 'Text', require: true, placeholder: '请填写规格型号' },
    { label: '计量单位', field: 'unit', layout: 'Text', placeholder: '请填写计量单位' },
    { label: '使用地点', field: 'addr', layout: 'Text', placeholder: '请填写使用地点' },
    { label: '存放位置', field: 'store', layout: 'Text', placeholder: '请填写存放位置' },
    { label: '当前数量', field: 'sum', layout: 'Text', placeholder: '请填写当前数量' },
    { label: '预警数量限制', field: 'warning', layout: 'Text', placeholder: '请填写预警数量限制' },
    { label: '责任人', field: 'person', layout: 'Text', placeholder: '请填写处理人' },
    { label: '更新人', field: 'updater', layout: 'Text', placeholder: '请填写处理人' },
    { label: '状态', field: 'status', layout: 'Select', width: '100px', require: true, showType: 'colorLump',
      options: [{ value: 1, label: '已处理' }, { value: 2, label: '未处理' }], placeholder: '请选择状态' }
  ]
}
export const SparePartFilterConfig = {
  actions: ['search', 'reset', 'create'],
  filters: [
    { label: '关键字', field: 'keyword', width: '220', layout: 'Text', placeholder: '所属场所' }
  ]
}
// 备品备用 - 领用
export const ReceiveTableConfig = {
  columns: [
    { label: '用途', field: 'use', layout: 'Text', require: true, placeholder: '请填写用途' },
    { label: '领用数量', field: 'sum', layout: 'Text', require: true, placeholder: '请填写领用数量' },
    { label: '领用人', field: 'recipient', layout: 'Text', require: true, placeholder: '请填写领用人' },
    { label: '领用时间', field: 'time', layout: 'DateTime', require: true, placeholder: '请选择领用时间' }
  ]
}
// 备品备用 - 入库
export const StoreTableConfig = {
  columns: [
    { label: '入库数量', field: 'sum', layout: 'Text', require: true, placeholder: '请填写入库数量' },
    { label: '入库人', field: 'person', layout: 'Text', require: true, placeholder: '请填写入库人' },
    { label: '入库时间', field: 'time', layout: 'DateTime', require: true, placeholder: '请选择入库时间' }
  ]
}

