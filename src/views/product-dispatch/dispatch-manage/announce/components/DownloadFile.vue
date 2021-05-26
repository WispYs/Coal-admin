<template>
  <el-dialog
    title="附件"
    :visible.sync="dialogVisible"
    width="1000px"
    class="download-file-dialog"
    :before-close="closeDialog"
  >
    <div class="download-file-container">
      <div class="upload-button">
        <el-button type="primary" size="medium" @click="uploadFile"><i class="el-icon-upload el-icon--right" />上传附件</el-button>
        <el-button type="danger" size="medium" plain @click="deleteBatches"><i class="el-icon-delete el-icon--right" />批量删除</el-button>
      </div>
      <el-table
        ref="multipleTable"
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
        <el-table-column align="center" label="文件名称" prop="name" />
        <el-table-column align="center" label="文件后缀" width="120" prop="suffix" />
        <el-table-column fixed="right" label="操作" width="150" align="center">
          <i class="el-icon-monitor file-button" />
          <i class="el-icon-download file-button" />
        </el-table-column>
      </el-table>

    </div>
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
      fileList: [
        {
          name: '1311(1)轨顺掘进工作规程',
          suffix: '.doc'
        }
      ],
      multipleSelection: []
    }
  },
  methods: {
    // 更新父组件 xxxxxDialogVisible 的值
    closeDialog() {
      this.$emit('close-dialog')
    },

    // 更新数据
    updataForm(data) {
      this.fileData = Object.assign(this.fileData, data, {
        title: `${data.name}进度`,
        yPercent: this.computePercent(data.yields, data.yTotal),
        pPercent: this.computePercent(data.push, data.pTotal)
      })
    },

    // 上传附件
    uploadFile() {
      this.$emit('upload-click')
    },
    // 改变所选项
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    // 批量删除
    deleteBatches() {

      // const selectId = []
      // console.log(this.multipleSelection)
      // this.multipleSelection.forEach(it => selectId.push(it.id))
      // if (selectId.length === 0) {
      //   this.$message.warning('请选择所删除的文件')
      //   return false
      // }
      // this.$confirm('确定删除所选中文件?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      //   console.log(selectId)
      //   this.$message.success('删除成功')
      // })
    },

    // 计算百分比
    computePercent(a, b) {
      console.log(a, b)
      return Number((a / b * 100).toFixed(2))
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';

.download-file-container {
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
      color: $primaryColor;
    }
  }
}

</style>
