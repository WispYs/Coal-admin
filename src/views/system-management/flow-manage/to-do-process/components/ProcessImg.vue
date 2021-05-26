<template>
  <el-dialog
    title="查看流程图"
    :visible.sync="dialogVisible"
    width="800px"
    class="process-img-dialog"
    :before-close="closeDialog"
  >
    <iframe :src="imgUrl" frameborder="0" width="100%" height="100%" />
  </el-dialog>

</template>
<script>
export default {
  props: {
    imgUrl: {
      type: String,
      default: () => ''
    },
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {

    }
  },
  watch: {
    imgUrl: {
      handler(val) {
        console.log(val)
      }
    }
  },
  methods: {
    // 更新父组件 xxxxxDialogVisible 的值
    closeDialog() {
      this.$emit('close-dialog')
    }

  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';

.process-img-dialog {
  ::v-deep {
    .el-dialog {
      height: 500px;
      &__body {
        height: calc(100% - 50px);
        overflow: hidden;
      }
    }
  }
  padding: 20px 40px;
  padding-bottom: 40px;

}

</style>
