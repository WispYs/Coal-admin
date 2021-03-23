<template>
  <el-dialog
    :title="config.title"
    :visible.sync="dialogVisible"
    :width="config.width || '500px'"
    :before-close="closeDialog"
  >
    <el-form ref="formData" class="dialog-container" :model="formData" label-width="110px" size="small" :inline="true">
      <template v-for="(item, index) in config.form">
        <el-form-item
          :key="index"
          :class="item.layout === 'Textarea' || item.layout === 'Upload' ? 'block-form' : ''"
          :label="`${item.label}：`"
        >
          <!-- input -->
          <el-input v-if="item.layout === 'Text'" v-model="formData[item.field]" class="form-item" :placeholder="item.placeholder">
            <template v-if="item.unit" slot="append">{{ item.unit }}</template>
          </el-input>

          <!-- select  -->
          <el-select
            v-if="item.layout === 'Select'"
            v-model="formData[item.field]"
            class="form-item"
            :placeholder="item.placeholder"
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
            class="form-item"
            :value="formData[item.field]"
            :placeholder="item.placeholder"
            :options="item.options"
            :clearable="true"
            :accordion="false"
            @getTreeSelect="value => getTreeSelect(value,item.field)"
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
            <el-button type="text" size="small" @click="uploadFile">上传附件</el-button>
          </div>

        </el-form-item>
      </template>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="closeDialog">取消</el-button>
      <el-button type="primary" size="small" @click="onSubmit">{{ config.title }}</el-button>
    </span>
  </el-dialog>
</template>
<script>
import TreeSelect from '@/components/TreeSelect'

export default {
  components: { TreeSelect },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    // 弹窗配置项
    config: {
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
      formData: {} // 弹窗表单
    }
  },
  created() {
    const { form } = { ...this.config }
    const obj = {}
    form.forEach(item => {
      if (item.options) {
        obj[item.field] = []
      } else {
        obj[item.field] = ''
      }
    })
    this.formData = Object.assign({}, obj)

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
    onSubmit() {
      this.$emit('submit', this.formData)
    },
    // 上传附件
    uploadFile() {
      this.$emit('upload-click', this.formData)
    },
    // 更新父组件 xxxxxDialogVisible 的值
    closeDialog() {
      this.$emit('close-dialog')
    },
    // treeSelect 值改变
    getTreeSelect(value, field) {
      this.formData[field] = value
    }
  }
}
</script>
<style lang="scss">
.block-form {
  .el-form-item__label {
    float: left;
  }
  .el-form-item__content {
    display: block;
    margin-left: 110px;
  }
}
</style>
<style lang="scss" scoped>
.block-form {
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
</style>
