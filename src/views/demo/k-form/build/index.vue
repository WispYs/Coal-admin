<template>
  <div>
    <a-button type="primary" @click="showModal">
      Open Modal
    </a-button>
    <a-modal v-model="visible" width="822px" title="Basic Modal" @ok="handleOk">
      <k-form-build ref="kfb" :value="jsonData" />
    </a-modal>
  </div>
</template>

<script>

export default {
  data() {
    return {
      visible: false,
      jsonData: {
        list: [
          {
            type: 'grid',
            label: '栅格布局',
            columns: [
              {
                span: 12,
                list: [
                  {
                    type: 'input',
                    label: '姓名',
                    icon: 'icon-write',
                    options: {
                      type: 'text',
                      width: '100%',
                      defaultValue: '',
                      placeholder: '请输入',
                      clearable: false,
                      maxLength: null,
                      hidden: false,
                      disabled: false
                    },
                    model: 'name',
                    key: 'input_1616657162274',
                    help: '',
                    prefix: '',
                    suffix: '',
                    rules: [
                      {
                        required: true,
                        message: '必填项'
                      }
                    ]
                  }
                ]
              },
              {
                span: 12,
                list: [
                  {
                    type: 'input',
                    label: '年龄',
                    icon: 'icon-write',
                    options: {
                      type: 'text',
                      width: '100%',
                      defaultValue: '',
                      placeholder: '请输入',
                      clearable: false,
                      maxLength: null,
                      hidden: false,
                      disabled: false
                    },
                    model: 'age',
                    key: 'input_1616657163923',
                    help: '',
                    prefix: '',
                    suffix: '',
                    rules: [
                      {
                        required: true,
                        message: '必填项'
                      }
                    ]
                  }
                ]
              }
            ],
            options: {
              gutter: 0
            },
            key: 'grid_1616657157529'
          },
          {
            type: 'grid',
            label: '栅格布局',
            columns: [
              {
                span: 12,
                list: [
                  {
                    type: 'radio',
                    label: '性别',
                    options: {
                      disabled: false,
                      hidden: false,
                      defaultValue: 'male',
                      dynamicKey: '',
                      dynamic: false,
                      options: [
                        {
                          value: 'male',
                          label: '男'
                        },
                        {
                          value: 'female',
                          label: '女'
                        }
                      ]
                    },
                    model: 'sex',
                    key: 'radio_1616657199578',
                    help: '',
                    rules: [
                      {
                        required: true,
                        message: '必填项'
                      }
                    ]
                  }
                ]
              },
              {
                span: 12,
                list: [
                  {
                    type: 'date',
                    label: '生日',
                    icon: 'icon-calendar',
                    options: {
                      width: '100%',
                      defaultValue: '',
                      rangeDefaultValue: [],
                      range: false,
                      showTime: false,
                      disabled: false,
                      hidden: false,
                      clearable: false,
                      placeholder: '请选择',
                      rangePlaceholder: ['开始时间', '结束时间'],
                      format: 'YYYY-MM-DD'
                    },

                    model: 'birthday',
                    key: 'date_1616657348672',
                    help: '',
                    rules: [
                      {
                        required: true,
                        message: '必填项'
                      }
                    ]
                  }
                ]
              }
            ],
            options: {
              gutter: 0
            },
            key: 'grid_1616657287523'
          },
          {
            type: 'grid',
            label: '栅格布局',
            columns: [
              {
                span: 12,
                list: [
                  {
                    type: 'switch',
                    label: '开启评分',
                    icon: 'icon-kaiguan3',
                    options: {
                      defaultValue: false,
                      hidden: false,
                      disabled: false
                    },
                    model: 'openRate',
                    key: 'switch_1616657573585',
                    help: '',
                    rules: [
                      {
                        required: false,
                        message: '必填项'
                      }
                    ]
                  }
                ]
              },
              {
                span: 12,
                list: [
                  {
                    type: 'select',
                    label: '评分项',
                    icon: 'icon-xiala',
                    options: {
                      width: '100%',
                      multiple: false,
                      disabled: false,
                      clearable: false,
                      hidden: false,
                      placeholder: '请选择评分项',
                      dynamicKey: '',
                      dynamic: false,
                      options: [
                        {
                          value: '1',
                          label: '项目一'
                        },
                        {
                          value: '2',
                          label: '项目二'
                        }
                      ],
                      showSearch: false
                    },
                    model: 'rateItem',
                    key: 'select_1616657499896',
                    help: '',
                    prefix: '',
                    suffix: '',
                    rules: [
                      {
                        required: false,
                        message: '必填项'
                      }
                    ]
                  }
                ]
              }
            ],
            options: {
              gutter: 0
            },
            key: 'grid_1616657479501'
          },
          {
            type: 'rate',
            label: '评分',
            options: {
              defaultValue: 0,
              max: 5,
              disabled: false,
              hidden: false,
              allowHalf: true
            },
            model: 'rate',
            key: 'rate_1616657410488',
            help: '这是评价信息',
            rules: [
              {
                required: false,
                message: '必填项'
              }
            ]
          },
          {
            type: 'textarea',
            label: '说明',
            options: {
              width: '100%',
              minRows: 4,
              maxRows: 6,
              maxLength: null,
              defaultValue: '',
              clearable: false,
              hidden: false,
              disabled: false,
              placeholder: '请输入'
            },
            model: 'remark',
            key: 'textarea_1616657188537',
            help: '',
            rules: [
              {
                required: false,
                message: '必填项'
              }
            ]
          }
        ],
        config: {
          formName: '',
          formDesc: '',
          formBelong: '',
          layout: 'horizontal',
          labelCol: {
            xs: 4,
            sm: 4,
            md: 4,
            lg: 4,
            xl: 4,
            xxl: 4
          },
          wrapperCol: {
            xs: 18,
            sm: 18,
            md: 18,
            lg: 18,
            xl: 18,
            xxl: 18
          },
          hideRequiredMark: false,
          customStyle: ''
        }
      }
    }
  },
  methods: {
    showModal() {
      this.visible = true
    },
    // 获取表单数据
    handleOk(e) {
      this.$refs.kfb.getData().then(async values => {
        this.visible = false
      }).catch(() => {
        console.log('验证未通过，获取失败')
      })
    }
  }
}
</script>

<style></style>
