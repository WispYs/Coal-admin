<template>
  <el-dialog
    title="工作面进度"
    :visible.sync="dialogVisible"
    width="500px"
    class="progress-dialog"
    :before-close="closeDialog"
  >
    progress
  </el-dialog>

  </div>
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
