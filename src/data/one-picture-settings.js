// 实体分类表格配置

const EntityTypeTableConfig = {
  actions: ['edit', 'delete'],
  rowKey: 'value',
  columns: [
    { label: '分类名称', field: 'label', layout: 'Text', placeholder: '请输入名称分类', require: true },
    { label: '分类编号', field: 'code', layout: 'Text', placeholder: '请输入分类编号', require: true, immutable: true },
    { label: '父级', field: 'parentId', layout: 'TreeSelect', options: [], placeholder: '请输入父级', require: true, hidden: true },
    { label: '显示级别', field: 'level', layout: 'Number', require: true, placeholder: '请输入显示级别' },
    { label: '备注', field: 'remark', layout: 'Textarea', placeholder: '请输入备注' }
  ]
}

// 实体分类头部配置
const EntityTypeFilterConfig = {
  actions: ['search', 'reset', 'create', 'delete', 'refresh'],
  filters: [
    { label: '搜索', field: 'keyword', width: '220', layout: 'Text', placeholder: '名称、值' }
  ]
}

// 属性设置表格配置
const AttributeSetTableConfig = {
  actions: ['editReport'],
  rowKey: 'id',
  columns: [
    { label: '实体名称', field: 'entityName', layout: 'Text', placeholder: '请输入实体名称' },
    { label: '实体编号', field: 'entityCode', layout: 'Text', placeholder: '请输入实体编号', immutable: true },
    { label: '图层级别', field: 'level', layout: 'Text', placeholder: '请输入一级等级' },
    { label: '创建时间', field: 'createTime', layout: 'DateTime', require: true, placeholder: '请输入创建时间' },
    { label: '属性内容', field: 'remark', layout: 'Textarea', require: true, placeholder: '请输入属性内容', hidden: true }
  ]
}

// 属性设置头部配置
const AttributeSetFilterConfig = {
  filters: [
    { label: '搜索', field: 'keyword', width: '220', layout: 'Text', placeholder: '名称' }
  ]
}

// 实体设置表格配置
const EntitySetTableConfig = {
  columns: [
    { label: '实体类型', field: 'shapeType', layout: 'Text', placeholder: '请输入实体类型', require: true, disabled: true },
    { label: '层级', field: 'level', layout: 'Text', placeholder: '请输入层级', disabled: true },
    { label: 'X坐标', field: 'x', layout: 'Text', placeholder: '请输入X坐标', disabled: true },
    { label: 'Y坐标', field: 'z', layout: 'Text', require: true, placeholder: '请输入Y坐标', disabled: true },
    { label: '实体名称', field: 'entityName', layout: 'Text', require: true, placeholder: '请输入实体名称' },
    { label: '实体类型', field: 'sysEntityTypeId', layout: 'TreeSelect', options: [], require: true, placeholder: '请输入实体类型' },
    { label: '图标', field: 'icon', layout: 'Text', placeholder: '请输入图标' },
    { label: '关联传感器', field: 'sensorId', layout: 'Select', options: [], placeholder: '请输入关联传感器' },
    { label: '关联工作面', field: 'gzmName', layout: 'Select', options: [], placeholder: '请输入关联工作面' },
    { label: '关联巷道', field: 'tunnelName', layout: 'Select', options: [], placeholder: '请输入关联巷道' },
    { label: '关联文档', field: 'eventName', layout: 'Select', options: [], placeholder: '请输入关联文档' },
    { label: '锚点Id', field: 'dotId', layout: 'Text', options: [], placeholder: '请输入锚点Id', immutable: true }

  ]
}

// 地点表格配置
const AddrTableConfig = {
  actions: ['location', 'locationByPos'],
  columns: [
    {
      value: 'no',
      label: '序号',
      width: 50
    },
    {
      value: 'label',
      label: '地点',
      width: 'auto'
    }
  ]
}

// 添加地点Dialog配置
const AddAddrDialogConfig = {
  columns: [
    { label: 'X坐标', field: 'X', width: '200', layout: 'Text', placeholder: '请输入X坐标', disabled: true },
    { label: 'Y坐标', field: 'Y', width: '200', layout: 'Text', placeholder: '请输入Y坐标', disabled: true },
    { label: '名称', field: 'name', width: '200', layout: 'Text', require: true, placeholder: '请输入名称' },
    { label: '类型', field: 'type', layout: 'Select', require: true, options: [], placeholder: '请输入类型' },
    { label: '排序', field: 'sort', width: '200', layout: 'Number', placeholder: '请输入排序' }
  ]
}

export {
  EntityTypeTableConfig,
  EntityTypeFilterConfig,
  AttributeSetTableConfig,
  AttributeSetFilterConfig,
  AddrTableConfig,
  AddAddrDialogConfig,
  EntitySetTableConfig
}
