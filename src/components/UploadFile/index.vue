<template>
  <el-dialog
    title="上传文件"
    :visible.sync="dialogVisible"
    width="500px"
    class="upload-dialog"
  >
    <el-upload
      class="upload-content"
      drag
      action="https://jsonplaceholder.typicode.com/posts/"
      multiple
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
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
    }
  },
  methods: {

  }
}
</script>
<style lang="scss">
 .upload-dialog {

  .el-dialog {
    height: 400px;
    .el-dialog__body {
      display: flex;
      justify-content: center;
      align-items: center;
      .upload-content {
        text-align: center;
      }
     }
   }
 }

</style>
