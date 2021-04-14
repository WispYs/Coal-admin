<template>
  <el-dialog
    :title="config.title"
    :visible.sync="dialogVisible"
    :width="config.width || '500px'"
    :before-close="closeDialog"
  >
    <el-form ref="formData" class="dialog-container" :model="formData" :rules="formRules" label-width="120px" size="medium" :inline="true">
      <template v-for="(item, index) in config.form">
        <el-form-item
          v-if="!item.disabled"
          :key="index"
          :class="item.layout === 'Textarea' || item.layout === 'Upload' || item.layout === 'TextEditor' ? 'full-line' : ''"
          :label="`${item.label}：`"
          :prop="item.field"
        >
          <!-- input -->
          <el-input v-if="item.layout === 'Text'" v-model="formData[item.field]" style="200px;" class="form-item" :placeholder="item.placeholder">
            <template v-if="item.unit" slot="append">{{ item.unit }}</template>
          </el-input>

          <!-- select  -->
          <el-select
            v-if="item.layout === 'Select'"
            v-model="formData[item.field]"
            class="form-item"
            :placeholder="item.placeholder"
            @change="(row) => selectChange(item,row)"
          >
            <el-option
              v-for="it in item.options"
              :key="it.value"
              :label="it.label"
              :value="it.value"
            />
          </el-select>

          <!-- tree-select  -->
          <tree-select
            v-if="item.layout === 'TreeSelect'"
            ref="treeSelect"
            class="form-item"
            :value="formData[item.field]"
            :placeholder="item.placeholder"
            :options="item.options"
            :clearable="true"
            :accordion="false"
            @tree-select="value => getTreeSelect(value,item.field)"
          />

          <!-- date-picker  -->
          <el-date-picker
            v-if="item.layout === 'DateTime'"
            v-model="formData[item.field]"
            class="form-item"
            :value-format="formData[item.dateFormat] || 'yyyy-MM-dd'"
            type="date"
            :placeholder="item.placeholder"
          />

          <!-- slider  -->
          <el-slider v-if="item.layout === 'Slider'" v-model="formData[item.field]" class="form-item" />

          <!-- switch -->
          <el-switch v-if="item.layout === 'Switch'" v-model="formData[item.field]" class="form-item" />

          <!-- radio -->
          <el-radio-group v-if="item.layout === 'Radio'" v-model="formData[item.field]" class="form-item">
            <el-radio v-for="it in item.options" :key="it.value" :label="it.value">{{ it.label }}</el-radio>
          </el-radio-group>

          <!-- checkbox -->
          <el-checkbox-group v-if="item.layout === 'Checkbox'" v-model="formData[item.field]" class="form-item">
            <el-checkbox v-for="it in item.options" :key="it.value" :label="it.label" :name="it.value" />
          </el-checkbox-group>

          <!-- textarea -->
          <el-input
            v-if="item.layout === 'Textarea'"
            v-model="formData[item.field]"
            type="textarea"
            :placeholder="item.placeholder"
            style="width: 100%"
          />

          <!-- upload -->
          <div v-if="item.layout === 'Upload'">
            <p class="file-title">{{ formData[item.field] }}</p>
            <el-button type="primary" size="medium" @click="uploadFile">上传附件</el-button>
          </div>

          <!-- text editor：tinymce -->
          <tinymce
            v-if="item.layout === 'TextEditor'"
            v-model="formData[item.field]"
            :height="300"
            :toolbar="item.textEditorToolbar || defaultToolbar"
            @submit-text-editor="value => submitTextEditor(value,item.field)"
          />
          <span v-if="item.message" class="naozhewan">{{ item.message }}</span>
        </el-form-item>
      </template>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="medium" @click="closeDialog">取消</el-button>
      <el-button :loading="submitLoading" type="primary" size="medium" @click="onSubmit">{{ config.title }}</el-button>
    </span>
  </el-dialog>
</template>
<script>
import TreeSelect from '@/components/TreeSelect'
import Tinymce from '@/components/Tinymce'
import { getType } from '@/utils'

const defaultToolbar = ['fontsizeselect fontselect forecolor backcolor  bold italic underline strikethrough removeformat undo redo']

export default {
  components: { TreeSelect, Tinymce },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    // 弹窗配置项
    config: {
      type: Object,
      default: () => ({})
    },
    selectUpdateData: {
      type: Object,
      default: () => ({})
    }
    // 弹窗表单
    // formData: {
    //   type: Object,
    //   default: () => ({})
    // }
  },
  data() {
    return {
      submitLoading: false, // 提交按钮loading状态
      formData: {}, // 弹窗表单
      formRules: {},
      defaultToolbar // 富文本编辑器默认工具栏配置

    }
  },
  computed: {

  },

  created() {
    this.formData = this.selectUpdateData
    const { form } = { ...this.config }
    const obj = {}
    const rules = {}
    form.forEach(item => {
      // 初始化表单数据类型
      // 方案一：获取options中的实例数据，判断数据类型
      // 方案二：直接在config表中添加type字段标记数据类型
      // 暂时采用方案一，尽量不在配置表中加字段，后续有问题修改
      if (item.options) {
        // 获取options中的实例数据
        const exampleValue = item.options[0].value
        const type = getType(exampleValue)
        const typeMap = {
          'string': '',
          'array': [],
          'number': 1,
          'boolean': false,
          'null': null,
          'undefined': undefined
        }
        obj[item.field] = typeMap[type]
      } else {
        obj[item.field] = ''
      }

      if (item.require) {
        if (item.field === 'password') {
          rules[item.field] = [
            { required: item.require, message: item.placeholder, trigger: 'blur' },
            { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
          ]
        } else {
          rules[item.field] = [
            { required: item.require, message: item.placeholder, trigger: 'blur' }
          ]
        }
      }
    })
    this.formData = Object.assign({}, obj)
    this.formRules = Object.assign({}, rules)

    // eventHub.$on('open-dialog', dialogVisible => {
    //   this.dialogVisible = dialogVisible
    // })
  },
  methods: {
    // 更新组件内 form 数据
    updataForm(form) {
      this.formData = Object.assign(this.formData, form)
      console.log(this.formData)  
    },

    // 当提交失败的时候重置按钮状态
    resetSubmitBtn() {
      this.submitLoading = false
    },

    // 清空组件 form 数据
    resetForm() {
      this.resetSubmitBtn()
      this.$nextTick(() => {
        this.$refs.formData.resetFields()
      })

      const treeSelectComponents = this.$refs.treeSelect
      if (treeSelectComponents) {
        treeSelectComponents.forEach(it => {
          it.clearHandle()
        })
      }
    },

    onSubmit() {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          this.submitLoading = true
          this.$emit('submit', this.formData)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 上传附件
    uploadFile() {
      this.$emit('upload-click', this.formData)
    },
    // 更新父组件 xxxxxDialogVisible 的值
    closeDialog() {
      this.resetForm()
      this.$emit('close-dialog')
    },
    // treeSelect 值改变
    getTreeSelect(value, field) {
      console.log(value)
      this.formData[field] = Number(value) || 0
      console.log(this.formData)
    },
    selectChange(item, row) {
      const $this = this
      if (item.field == 'targetType' && item.label == '目标类型') {
        this.$emit('selectChange', item, row)
      }
    },
    // 提交富文本编辑器
    submitTextEditor(value, field) {
      console.log(value)
      this.formData[field] = value
      console.log(this.formData)
    }
  }
}
</script>
<style lang="scss">
.full-line {
  .el-form-item__label {
    float: left;
  }
  .el-form-item__content {
    display: block;
    margin-left: 120px;
  }
}
</style>
<style lang="scss" scoped>
.full-line {
  display: block;
}
.file-title {
  margin: 0;
  font-size: 13px;
  line-height: 32px;
}
.form-item {
  width: 200px;
}
.naozhewan {
  color: #999;
  font-size: 12px;
  margin-left: 10px;
  display: inline-block;
  width: 80px;
  white-space: nowrap;
}
</style>
