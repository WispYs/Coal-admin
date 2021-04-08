export const flowTableConfig = {
  actions: ['edit', 'delete'],
  checkbox: true,
  columns: [
    { label: '流程名称', field: 'flowName', width: '160', layout: 'Text', placeholder: '请填写流程名称' },
    { label: '业务表', field: 'businessTable', width: '160', layout: 'Text', placeholder: '请填写业务表' }
    // { label: '所属部门', field: 'sysDeptId', width: '120', layout: 'TreeSelect', require: true,
    //   options: [
    //     {
    //       value: 1,
    //       label: '顾桥矿',
    //       children: [
    //         { value: 2, label: '机关', children: [
    //           { value: 3, label: '矿领导' },
    //           { value: 4, label: '办公室', children: [
    //             { value: 5, label: '部门' },
    //             { value: 6, label: '办公室科室（中央区）' }
    //           ] },
    //           { value: 7, label: '人力资源部' }
    //         ] }
    //       ]
    //     }
    //   ], placeholder: '请选择所属部门' },
    // { label: '排序', field: 'orderNum', width: '80', layout: 'Text', placeholder: '请选择排序' },
    // { label: '备注', field: 'remark', width: '', layout: 'Textarea', placeholder: '请填写备注' }
  ]
}
