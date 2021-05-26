<template>
  <el-dialog
    title="附件"
    :visible.sync="dialogVisible"
    width="1000px"
    class="preview-file-dialog"
    :before-close="closeDialog"
  >
    <div class="preview-file-container">
      <div class="upload-button">
        <el-button type="primary" size="medium" @click="uploadFile"><i class="el-icon-upload el-icon--right" />上传附件</el-button>
        <el-button type="danger" size="medium" plain @click="deleteBatches"><i class="el-icon-delete el-icon--right" />批量删除</el-button>
      </div>
      <el-table
        ref="previewFileTable"
        :data="fileList"
        border
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column align="center" label="序号" width="95" fixed>
          <template slot-scope="scope">
            {{ scope.$index+1 }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="文件名称" prop="fileName" />
        <el-table-column align="center" label="文件后缀" width="120" prop="suffix" />
        <el-table-column fixed="right" label="操作" width="150" align="center">
          <template slot-scope="scope">
            <i class="el-icon-monitor file-button" @click="preview(scope.row)" />
            <i class="el-icon-download file-button" @click="download(scope.row)" />
          </template>

        </el-table-column>
      </el-table>

    </div>
  </el-dialog>

</template>
<script>
import { previewDocument, downloadDocument } from '@/api/document-management'

export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      row: {}, // 当前行数据，用于更新提交
      fileList: [], // 上传文件
      multipleSelection: []
    }
  },
  methods: {
    closeDialog() {
      this.$emit('close-dialog')
    },

    // 根据value值(eventId)回显附件信息
    updataForm(value, row) {
      // 保存当前行数据，用于更新提交
      this.row = row
      if (value) {
        const eventId = value.split(',')
        // 调用公共方法 - 根据附件字段Id获取图片url
        this.$store.dispatch('upload/getFileUrl', eventId).then((data) => {
          this.fileList = data
        }).catch((err) => {
          console.log(err)
        })
      } else {
        this.fileList = []
      }
    },
    // 上传附件
    uploadFile() {
      this.$emit('upload-click')
    },
    // 更新上传附件
    async updateFile(fileList) {
      const eventId = []
      fileList.forEach(f => {
        eventId.push(f.eventId)
      })
      const submitData = Object.assign(this.row, {
        eventId: this.row.eventId ? `${this.row.eventId},${eventId.join(',')}` : eventId.join(',')
      })
      // 上传附件提交
      await this.$emit('update-file', submitData)
      // 更新附件查看列表
      this.updataForm(submitData.eventId, submitData)
    },
    // 预览
    preview(file) {
      previewDocument(file.sysFileInfoId)
    },
    // 下载
    download(file) {
      const fileData = {
        fileName: file.fileName,
        uploadPath: file.uploadPath
      }
      downloadDocument(fileData)
    },
    // 改变所选项
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 批量删除
    deleteBatches() {
      // 选中删除的图片eventId
      const selectId = []
      this.multipleSelection.forEach(it => selectId.push(it.eventId))
      if (selectId.length === 0) {
        this.$message.warning('请选择所删除的文件')
        return false
      }
      this.$confirm('确定删除所选中文件?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        // 当前图片eventId数组
        let eventIdArr = this.row.eventId.split(',')
        eventIdArr = eventIdArr.filter(it => selectId.indexOf(it) === -1)

        const submitData = Object.assign(this.row, {
          eventId: eventIdArr.join(',')
        })
        // 上传附件提交
        await this.$emit('update-file', submitData)
        // 更新附件查看列表
        this.updataForm(submitData.eventId, submitData)
      })
    }

  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/theme.scss';
@import '~@/assets/styles/variables.scss';

.preview-file-container {
  padding: 20px;
  padding-bottom: 40px;
  .upload-button {
    padding: 10px 0;
    border-bottom: 1px solid #ededed;
  }
  .file-button {
    margin: 0 8px;
    cursor: pointer;
    &:hover {
      @include primaryColor($primaryColor);
    }
  }
}

</style>
