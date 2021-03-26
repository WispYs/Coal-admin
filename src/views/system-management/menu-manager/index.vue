<template>
  <div class="page-container report-table">
    <el-form ref="menuForm" :model="menuForm" label-width="180px" class="configForm">
      <el-form-item
        label="最大可打开菜单数"
        prop="max"
        :rules="[
          { required: true, message: '数量不能为空'},
          { type: 'number', message: '必须为数字值'}
        ]"
      >
        <el-input v-model.number="menuForm.max" type="max" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('menuForm')">提交</el-button>
        <el-button @click="resetForm('menuForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuForm: {
        max: 5
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.menuForm.max >= 5) {
            window.localStorage.topMax = this.menuForm.max
            this.$store.dispatch('globalSetting/setTopMax', this.menuForm.max)
            this.$message.success('保存成功')
          } else {
            this.$message.warning('最小配置为5')
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.configForm{
  width: 400px;
}
</style>
