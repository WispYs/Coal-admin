<template>
  <div class="page-container upload-page has-tree" :class="treeExtend ? 'open-tree' : 'close-tree'">
    <tree-bar :tree-data="treeData" @extend-click="treeExtend = !treeExtend" />
    <div class="tree-form-container">
      <div class="upload-button">
        <el-button type="primary" size="medium" @click="openDailog"><i class="el-icon-plus el-icon--left" />新建文件</el-button>
        <el-button type="success" size="medium" plain @click="uploadDialogVisible = true"><i class="el-icon-upload el-icon--left" />发布</el-button>
        <el-button type="danger" size="medium" plain :disabled="deleteDisabled" @click="deleteBatches"><i class="el-icon-delete el-icon--left" />批量删除</el-button>
        <el-button size="medium" plain @click="refresh"><i class="el-icon-refresh el-icon--left" />刷新</el-button>
      </div>
      <el-table ref="multipleTable" :data="list" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="根目录">
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
            <el-button type="text" size="small" @click="previewClick(scope.row)">预览</el-button>
            <el-button type="text" size="small" @click="downloadClick(scope.row)">下载</el-button>
            <el-button type="text" size="small" @click="updateClick(scope.row.id)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="__fetchData" />
      <upload-file :dialog-visible="uploadDialogVisible" :multiple="false" @close-dialog="uploadDialogVisible = false"
        @upload-submit="uploadSubmit" />
    </div>
  </div>
</template>
<script>
  import TreeBar from '@/components/TreeBar'
  import Pagination from '@/components/Pagination'
  import UploadFile from '@/components/UploadFile'
  import {
    getUploadList
  } from '@/api/table'

  export default {
    components: {
      Pagination,
      UploadFile,
      TreeBar
    },
    data() {
      return {
        addForm: {
          superiorFolder: '根目录',
          folderName: '',
          sort: '',
          note: ''
        },
        dialogVisible: false,
        list: null,
        listLoading: true,
        total: 0,
        listQuery: {
          page: 1,
          size: 10
        },
        multipleSelection: [],
        uploadDialogVisible: false,
        treeExtend: true,
        deleteDisabled: true,
        treeData: {
          title: '文件夹',
          list: [{
            label: '根目录',
            children: [{
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
          }]
        }
      }
    },
    mounted() {
      this.__fetchData()
    },
    methods: {
      openDailog() {
        this.$message({
          message: '谢谢您，点击新建文件',
          type: 'success'
        });
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
        if (this.multipleSelection.length > 0) {
          this.deleteDisabled = false;
        } else {
          this.deleteDisabled = true;
        }
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

      updateClick(id) {
        this.$confirm('确定编辑该项目文件?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(id)
          this.$message.success('编辑成功')
        })
      },
      previewClick() {
        this.$message({
          message: '谢谢您，点击预览',
          type: 'success'
        });
      },
      downloadClick(){
        this.$message({
          message: '谢谢您，点击下载',
          type: 'success'
        });
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
      },
      refresh() {
        this.$message({
          message: '谢谢您，点击刷新',
          type: 'success'
        });
        this.__fetchData();
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
