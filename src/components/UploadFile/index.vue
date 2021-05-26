<template>
  <el-dialog
    title="上传文件"
    :visible.sync="dialogVisible"
    width="500px"
    class="upload-dialog"
    :before-close="closeDialog"
    :append-to-body="true"
  >
    <el-upload
      ref="upload"
      class="upload-content"
      drag
      :data="uploadData"
      :headers="headers"
      :multiple="multiple"
      :action="action"
      :show-file-list="true"
      :file-list="fileList"
      list-type="text"
      :before-upload="beforeUpload"
      :on-preview="handlePreview"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-remove="handleRemove"
      :auto-upload="false"
      :on-change="handleChange"
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <!-- <div slot="tip" class="el-upload__tip">只能上传 {{ accept | filterAccept }} 文件，且不超过5M</div> -->
      <div slot="tip" class="el-upload__tip">只能预览 {{ accept | filterAccept }} 文件，且不超过50M</div>
      <!-- 如果有模板名称和下载地址，显示下载模板 -->
      <div v-if="templateName && templateUrl" slot="tip">
        <!-- <a :href="templateUrl" :download="templateName" class="upload-template">下载{{ templateName }}模板</a> -->
        <span class="upload-template" @click="downFile">下载{{ templateName }}模板</span>
      </div>
    </el-upload>
    <span slot="footer" class="dialog-footer">
      <el-button size="medium" @click="closeDialog">取 消</el-button>
      <el-button v-if="!uploadStatus && preloadNum > 0" :loading="true" type="primary" size="medium" @click="submitUpload">上传中</el-button>
      <el-button v-else type="primary" size="medium" @click="submitUpload">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { BaseUrl } from '@/api/url'
import store from '@/store'
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
    },
    multiple: {
      type: Boolean,
      default: true
    },
    // 自定义上传文件参数
    data: {
      type: Object,
      default: () => {}
    },
    action: {
      type: String,
      default: `${BaseUrl}/file/sysFileInfo/save`
    }
  },
  data() {
    return {
      // action: 'https://jsonplaceholder.typicode.com/posts/'
      // action: 'https://httpbin.org/post',
      // action: 'http://192.168.1.139:18000/sysFileInfo/save',
      uploadStatus: false, // 上传状态
      uploadFileList: [], // 上传成功的列表
      preloadNum: 0, // 预加载文件数量
      headers: {},
      templateName: '', // 模板名称
      templateUrl: '', // 模板地址
      fileList: [],
      menuPath: '', //  路由中文路径
      // 默认上传文件参数
      uploadData: {
        menuId: this.$route.name,
        menuPath: this.menuPath

      }
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
  watch: {
    dialogVisible(val) {
      if (val) {
        this.fileList = []
        this.preloadNum = 0
      }
    },
    data: {
      handler(val) {
        // 合并自定义上传参数
        if (val) {
          this.uploadData = Object.assign(this.uploadData, val)
        }
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    if (store.getters.token) this.headers['Authorization'] = store.getters.token
    const matched = this.$route.matched.filter(item => item.meta && item.meta.title)
    matched.forEach(it => {
      this.menuPath += `/${it.meta.title}`
    })
  },
  mounted() {
    // 获取下载模板基本信息
    this.$emit('get-template')
  },
  methods: {
    handleChange(file, fileList) {
      if (fileList.length === 0) return
      this.fileList = fileList
    },
    // 上传文件之前的钩子，返回 false 则停止上传
    beforeUpload(file) {
      this.uploadData.menuPath = this.menuPath
      const fileFormat = file.name.substring(file.name.lastIndexOf('.') + 1)
      const regExp = `(${this.accept.join('|')})`
      const acceptFile = new RegExp(regExp, 'i').test(fileFormat)
      const isLt50M = file.size / 1024 / 1024 < 50
      // if (!acceptFile) {
      //   this.$message.error('上传文件格式不正确!')
      //   return false
      // }
      if (!isLt50M) {
        this.$message.error('上传文件大小不能超过50M!')
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
        path: response.data && response.data.uploadPath,
        uploadSuccess: true, // 上传成功
        eventId: response.data && response.data.eventId,
        url: response.data && response.data.url
      }
      this.uploadFileList.push(fileObj)
      // 当预加载数量 = 成功上传文件数量时，改变上传状态
      if (this.uploadFileList.length === this.preloadNum) {
        this.uploadStatus = true
        const uploadFile = this.uploadFileList
        this.$emit('upload-submit', uploadFile)
        this.uploadFileList = []
        this.preloadNum = 0
      } else {
        this.uploadStatus = false
      }
    },
    // 文件上传失败时的钩子
    handleError(err, file, fileList) {
      console.log(JSON.parse(err.message))
      const error = err.message || '上传失败'
      this.$message.error(error)
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
      this.preloadNum
      if (this.fileList.length === 0) {
        this.$message.warning('请先上传文件')
        return false
      }
      this.$refs.upload.submit()
    },

    // 更新父组件 xxxxxDialogVisible 的值
    closeDialog() {
      this.uploadFileList = []
      this.$emit('close-dialog')
    },

    // 更新下载模板信息
    updateTemplate(data) {
      this.templateName = data.name
      this.templateUrl = data.url
    },
    downFile(){
      this.$emit('down-file')
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/theme.scss';
@import '~@/assets/styles/variables.scss';
.upload-dialog {
  .upload-template {
    font-size: 12px;
    margin-top: 7px;
    cursor: pointer;
    @include primaryColor($primaryColor);
  }
  ::v-deep {
    .el-dialog {
      height: 400px;
      .el-dialog__header {
        border-bottom: 1px solid #ededed;
        background: #f8f8f8;
      }
      .el-dialog__body {
        padding: 0;
        height: calc(100% - 124px);
        overflow: auto;
        .upload-content {
          padding: 30px 70px;
        }
      }
      .el-dialog__footer {
        border-top: 1px solid #ededed;
      }
    }
  }

 }

</style>
