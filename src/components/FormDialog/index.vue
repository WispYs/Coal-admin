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
          value-format="yyyy-MM-dd HH:mm:ss"
          type="date"
          :placeholder="item.placeholder"
          style="width: 100%;"
        />

        <!-- slider  -->
        <el-slider v-if="item.layout === 'Slider'" v-model="formData[item.field]" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">创建</el-button>
        <el-button @click="closeDialog">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>

export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    dialogVisible: {
      type: Boolean,
      default: false
    },
    config: {
      type: Object,
      default: () => ({})
    }
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
      obj[item.field] = ''
    })
    this.formData = Object.assign({}, obj)

    // eventHub.$on('open-dialog', dialogVisible => {
    //   this.dialogVisible = dialogVisible
    // })
  },
  methods: {
    onSubmit() {
      console.log(this.formData)
    },
    closeDialog() {
      const visible = `${this.name}DialogVisible`
      console.log(visible)
      this.$emit('set-visible', visible)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
