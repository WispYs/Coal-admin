<template>
  <div class="page-container upload-page has-tree" :class="treeExtend ? 'open-tree' : 'close-tree'">
    <tree-bar :tree-data="treeData" @extend-click="treeExtend = !treeExtend" />
    <div class="tree-form-container">
      <div class="upload-button">
        <el-button type="primary" size="medium" @click="openDailog"><i class="el-icon-plus el-icon--left" />新建文件</el-button>
        <el-button type="primary" size="medium" @click="uploadDialogVisible = true"><i class="el-icon-upload el-icon--left" />上传</el-button>
        <el-button type="danger" size="medium" plain @click="deleteBatches"><i class="el-icon-delete el-icon--left" />批量删除</el-button>
      </div>
      <el-table
        ref="multipleTable"
        :data="list"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column label="项目文件">
          <template slot-scope="scope">
            <div class="upload-item">
              <img src="@/assets/images/file.png" alt="">
              <div class="upload-info">
                <h4>{{ scope.row.title }}</h4>
                <span>{{ scope.row.updateTime }}</span>
                <span>{{ scope.row.uploader }}</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
            <el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
            <el-button type="text" size="small" style="color: red" @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.size"
        @pagination="__fetchData"
      />
      <upload-file
        :dialog-visible="uploadDialogVisible"
        :multiple="false"
        @close-dialog="uploadDialogVisible = false"
        @upload-submit="uploadSubmit"
      />
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" class="dialog-container" :model="addForm" label-width="90px">
        <el-form-item label="上级目录">
          <el-input v-model="addForm.superiorFolder" />
        </el-form-item>
        <el-form-item label="文件夹名称">
          <el-input v-model="addForm.folderName" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="addForm.sort" controls-position="right" :min="1" :max="10" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="addForm.note" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import TreeBar from '@/components/TreeBar'
import Pagination from '@/components/Pagination'
import UploadFile from '@/components/UploadFile'
import { getUploadList } from '@/api/table'

export default {
  components: { Pagination, UploadFile, TreeBar },
  data() {
    return {
      addForm: {
        superiorFolder: '根目录',
        folderName: '',
        sort: '',
        note: ''
      },
      dialogVisible: false,
      list: [],
      listLoading: true,
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      multipleSelection: [],
      uploadDialogVisible: false,
      treeExtend: true,
      treeData: {
        title: '选择专业',
        list: [
          {
            label: '专业',
            children: [
              {
                label: '安检'
              },
              {
                label: '采煤'
              },
              {
                label: '掘进（中央区）'
              },
              {
                label: '掘进（南区）'
              },
              {
                label: '机电运输'
              },
              {
                label: '一通三防'
              },
              {
                label: '地面设施'
              },
              {
                label: '维护'
              },
              {
                label: '地质灾害防治'
              }
            ]
          }
        ]
      }
    }
  },
  mounted() {
    this.__fetchData()
  },
  methods: {
    openDailog() {
      this.dialogVisible = true
    },
    __fetchData() {
      this.listLoading = true
      getUploadList().then(response => {
        this.listLoading = false
        this.list = response.data.items
        this.total = response.data.total
      })
    },
    // 改变所选项
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    handleClick(row) {
      console.log(row)
    },

    // 上传文件控件成功回调
    uploadSubmit(fileList) {
      console.log(fileList)
      this.uploadDialogVisible = false
    },

    del(id) {
      this.$confirm('确定删除该项目文件?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(id)
        this.$message.success('删除成功')
      })
    },
    // 批量删除
    deleteBatches() {
      const selectId = []
      this.multipleSelection.forEach(it => selectId.push(it.id))
      if (selectId.length === 0) {
        this.$message.warning('请选择所删除的文件')
        return false
      }
      this.$confirm('确定删除所选中文件?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(selectId)
        this.$message.success('删除成功')
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .upload-page {
    .upload-button {
      padding: 10px 0;
      border-bottom: 1px solid #ededed;
    }
    .upload-item {
      img {
        display: inline-block;
        width: 32px;
        height: 32px;
        margin-right: 15px;
      }
      .upload-info {
        display: inline-block;
        h4 {
          font-weight: normal;
          line-height: 20px;
          font-size: 14px;
          margin: 0;
        }
        span {
          font-size: 13px;
          color: #999;
          margin-right: 20px;
        }
      }
    }
  }
</style>
