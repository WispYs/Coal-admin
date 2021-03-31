<template>
  <el-dialog
    title="重置密码"
    :visible.sync="dialogVisible"
    width="450px"
    class="reset-password-dialog"
    :before-close="closeDialog"
  >
    <el-form ref="resetPassword" class="reset-password-container" :model="passwordData" :rules="rules">
      <el-form-item label="新密码" label-width="80px" prop="password1">
        <el-input v-model="passwordData.password1" placeholder="请输入密码" />
      </el-form-item>
      <el-form-item label="确认密码" label-width="80px" prop="password2">
        <el-input v-model="passwordData.password2" placeholder="请再次确认密码" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="closeDialog">取消</el-button>
      <el-button type="primary" size="small" @click="onSubmit">确认</el-button>
    </span>
  </el-dialog>

</template>
<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.passwordData.password1) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      passwordData: {
        password1: '',
        password2: ''
      },
      rules: {
        password1: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ],
        password2: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 更新父组件 xxxxxDialogVisible 的值
    closeDialog() {
      this.$refs.resetPassword.resetFields()
      this.$emit('close-dialog')
    },

    // 更新数据
    updataForm(data) {
      console.log(data)
      // this.passwordData = Object.assign(this.passwordData, data)
    },

    onSubmit() {
      this.$refs.resetPassword.validate((valid) => {
        if (valid) {
          console.log(this.passwordData)
          this.$message.success('修改成功')
          this.$refs.resetPassword.resetFields()
          this.$emit('close-dialog')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }

  }
}
</script>
<style lang="scss">
.reset-password-dialog {
  .el-dialog {
    height: auto!important;
  }
}

</style>
<style lang="scss" scoped>
.reset-password-container {
  padding: 30px 60px;
}

</style>
