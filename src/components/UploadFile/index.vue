<template>
  <el-dialog
    title="上传文件"
    :visible.sync="dialogVisible"
    width="500px"
    class="upload-dialog"
    :before-close="closeDialog"
  >
    <el-upload
      class="upload-content"
      drag
      multiple
      :accept="acceptList"
      :action="action"
      :show-file-list="true"
      list-type="text"
      :before-upload="beforeUpload"
      :on-preview="handlePreview"
      :on-success="handleSuccess"
      :on-remove="handleRemove"
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div slot="tip" class="el-upload__tip">只能上传 {{ accept | filterAccept }} 文件，且不超过5M</div>
    </el-upload>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button v-if="!uploadStatus && preloadNum > 0" :loading="true" type="primary" @click="submitUpload">上传中</el-button>
      <el-button v-else type="primary" @click="submitUpload">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  filters: {
    filterAccept: n => n.join('/')
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    accept: {
      type: Array,
      default: () => ['xls', 'xlsx', 'doc', 'docx', 'png', 'jpg', 'jpeg']
    }
  },
  data() {
    return {
      // action: 'https://jsonplaceholder.typicode.com/posts/'
      action: 'https://httpbin.org/post',
      uploadStatus: false, // 上传状态
      uploadFileList: [], // 上传成功的列表
      preloadNum: 0 // 预加载文件数量
    }
  },
  computed: {
    acceptList() {
      let acceptList = ''
      if (this.accept && this.accept.length > 0) {
        const tmpArr = []
        this.accept.forEach(it => {
          tmpArr.push(`.${it}`)
        })
        acceptList = tmpArr.join(',')
      }
      return acceptList
    }
  },
  methods: {
    // 上传文件之前的钩子，返回 false 则停止上传
    beforeUpload(file) {
      const fileFormat = file.name.substring(file.name.lastIndexOf('.') + 1)
      const regExp = `(${this.accept.join('|')})`
      const acceptFile = new RegExp(regExp, 'i').test(fileFormat)
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!acceptFile) {
        this.$message.error('上传文件格式不正确!')
        return false
      }
      if (!isLt5M) {
        this.$message.error('上传文件大小不能超过5M!')
        return false
      }
      this.uploadStatus = false
      this.preloadNum++
    },
    // 点击文件列表中已上传的文件时的钩子
    handlePreview(file) {
      console.log(file)
    },
    // 文件上传成功时的钩子
    handleSuccess(response, file) {
      const fileObj = {
        uid: file.uid,
        name: file.name,
        url: response.files.file,
        uploadSuccess: true // 上传成功
      }
      this.uploadFileList.push(fileObj)
      // 当预加载数量 = 成功上传文件数量时，改变上传状态
      if (this.uploadFileList.length === this.preloadNum) {
        this.uploadStatus = true
      } else {
        this.uploadStatus = false
      }
    },
    // 文件列表移除文件时的钩子
    handleRemove(file) {
      this.uploadFileList.forEach((it, index) => {
        if (it.uid === file.uid) {
          this.uploadFileList.splice(index, 1)
          this.preloadNum--
        }
      })
    },
    // 提交上传图片
    submitUpload() {
      const uploadFile = this.uploadFileList
      if (uploadFile.length === 0) {
        this.$message.error('请先上传文件')
        return false
      }
      this.$emit('upload-submit', uploadFile)
      this.uploadFileList = []
      this.preloadNum = 0
      this.uploadStatus = false
    },

    // 更新父组件 xxxxxDialogVisible 的值
    closeDialog() {
      this.$emit('close-dialog')
    }

  }
}
</script>
<style lang="scss">
 .upload-dialog {

  .el-dialog {
    height: 400px;
    .el-dialog__body {
      .upload-content {
        padding: 20px 70px;
      }
     }
   }
 }

</style>
