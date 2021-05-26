<template>
  <el-dialog
    title="文本内容"
    :visible.sync="dialogVisible"
    width="1000px"
    class="operation-file-dialog"
    :before-close="closeDialog"
  >
    <div class="text-dialog-container" v-html="htmlValue" />
  </el-dialog>

</template>
<script>
export default {
  props: {
    htmlValue: {
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

.text-dialog-container {
  min-height: 100px;
  padding: 20px 40px;
  padding-bottom: 40px;

}

</style>
