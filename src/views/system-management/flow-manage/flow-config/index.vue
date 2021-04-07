<template>
  <div class="page-container report-table">
    <el-form ref="menuForm" :model="menuForm" label-width="180px" class="configForm">
      <el-form-item
        label="最大可打开菜单数"
        prop="max"
      >
        <el-select v-model="menuForm.value" placeholder="请选择">
          <el-option
            v-for="item in menuForm.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="最大可打开菜单数"
        prop="max"
      >
        <el-select v-model="menuForm.value" placeholder="请选择">
          <el-option
            v-for="item in menuForm.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
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
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
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
