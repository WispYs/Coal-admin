<template>
  <el-dialog :title="config.title" :visible.sync="dialogVisible" :width="config.width || '500px'" :before-close="closeDialog">
    <div class="problem_handling">
      <el-input v-model="implementer" placeholder="请输入落实人"></el-input>
      <el-input type="textarea" :rows="3" v-model="implementationDails" placeholder="请输入落实明细(100字以内)"></el-input>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="closeDialog">取消</el-button>
      <el-button type="primary" size="small" @click="onSubmit">{{ config.title }}</el-button>
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
    },
    data() {
      return {
        implementer: '',
        implementationDails:''
      }
    },
    computed: {

    },
    created() {

    },
    methods: {
      onSubmit() {
        // this.$refs.formData.validate((valid) => {
        //   if (valid) {
        //     this.$emit('submit', this.formData)
        //   } else {
        //     console.log('error submit!!')
        //     return false
        //   }
        // })
        this.$emit('submit', this.implementer,this.implementationDails)
      },
      // 更新父组件 xxxxxDialogVisible 的值
      closeDialog() {
        // this.$refs.formData.clearValidate()
        this.$emit('close-dialog');
      }
    }
  }
</script>
<style lang="scss" scoped>
  .problem_handling {
    width: calc(100% - 40px);
    margin: auto;
    .el-input{
      margin-top: 30px;
    }
    .el-textarea{
      margin-top: 30px;
    }
  }
</style>
