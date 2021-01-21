<template>
  <el-dialog
    :title="config.title"
    :visible.sync="dialogVisible"
    :width="config.width || '500px'"
    :before-close="closeDialog"
  >
    <el-form ref="formData" class="dialog-container" :model="formData" label-width="100px">
      <el-form-item v-for="(item, index) in config.form" :key="index" :label="`${item.label}：`">
        <!-- input -->
        <el-input v-if="item.layout === 'Text'" v-model="formData[item.field]">
          <template v-if="item.unit" slot="append">{{ item.unit }}</template>
        </el-input>

        <!-- select  -->
        <el-select
          v-if="item.layout === 'Select'"
          v-model="formData[item.field]"
          :placeholder="item.placeholder"
          style="width: 100%;"
        >
          <el-option
            v-for="it in item.options"
            :key="it.value"
            :label="it.label"
            :value="it.value"
          />
        </el-select>

        <!-- date-picker  -->
        <el-date-picker
          v-if="item.layout === 'DateTime'"
          v-model="formData[item.field]"
          :value-format="formData[item.dateFormat] || 'yyyy-MM-dd'"
          type="date"
          :placeholder="item.placeholder"
          style="width: 100%;"
        />

        <!-- slider  -->
        <el-slider v-if="item.layout === 'Slider'" v-model="formData[item.field]" />

        <!-- switch -->
        <el-switch v-if="item.layout === 'Switch'" v-model="formData[item.field]" />

        <!-- radio -->
        <el-radio-group v-if="item.layout === 'Radio'" v-model="formData[item.field]">
          <el-radio v-for="it in item.options" :key="it" :label="it" />
        </el-radio-group>

        <!-- checkbox -->
        <el-checkbox-group v-if="item.layout === 'Checkbox'" v-model="formData[item.field]">
          <el-checkbox v-for="it in item.options" :key="it" :label="it" :name="it" />
        </el-checkbox-group>

        <!-- textarea -->
        <el-input v-if="item.layout === 'Textarea'" v-model="formData[item.field]" type="textarea" />

      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取消</el-button>
      <el-button type="primary" @click="onSubmit">{{ config.title }}</el-button>
    </span>
  </el-dialog>
</template>
<script>

export default {
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
    // 更新父组件 xxxxxDialogVisible 的值
    closeDialog() {
      this.$emit('close-dialog')
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
