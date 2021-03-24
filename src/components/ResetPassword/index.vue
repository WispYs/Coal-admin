<template>
  <el-dialog
    title="重置密码"
    :visible.sync="dialogVisible"
    width="450px"
    class="reset-password-dialog"
    :before-close="closeDialog"
  >
    <el-form class="reset-password-container" :model="passwordData">
      <el-form-item label="新密码" label-width="70px">
        <el-input v-model="passwordData.password1" placeholder="请输入密码" />
      </el-form-item>
      <el-form-item label="确认密码" label-width="70px">
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
    return {
      passwordData: {
        password1: '',
        password2: ''
      }
    }
  },
  methods: {
    // 更新父组件 xxxxxDialogVisible 的值
    closeDialog() {
      this.$emit('close-dialog')
    },

    // 更新数据
    updataForm(data) {
      console.log(data)
      // this.passwordData = Object.assign(this.passwordData, data)
    },

    onSubmit() {
      console.log(this.passwordData)
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
