// 地点表格配置
const AddrTableConfig = {
  actions: ['location'],
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
    { label: 'X坐标', field: 'x', width: '200', layout: 'Text', placeholder: '请输入X坐标', disabled: true },
    { label: 'Y坐标', field: 'z', width: '200', layout: 'Text', placeholder: '请输入Y坐标', disabled: true },
    { label: '名称', field: 'addressName', width: '200', layout: 'Text', require: true, placeholder: '请输入名称' },
    { label: '类型', field: 'typeId', layout: 'Select', require: true, options: [], placeholder: '请输入类型' },
    { label: '排序', field: 'orderNum', width: '200', layout: 'Number', placeholder: '请输入排序' }
  ]
}

export {
  AddrTableConfig,
  AddAddrDialogConfig
}
