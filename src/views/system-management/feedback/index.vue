<template>
  <div class="page-container">
    <div class="buttons">
      <div class="buttons_item">
        <el-button type="primary" size="medium" @click="createFeedback"><i class="el-icon-plus el-icon--left" />新建
        </el-button>
        <el-button type="primary" size="medium" plain :disabled="updateDisabled" @click="editSchool('edit')"><i class="el-icon-edit el-icon--left" />编高校
        </el-button>
        <el-button type="danger" size="medium" plain :disabled="deleteDisabled" @click="deleteFeedback"><i class="el-icon-delete el-icon--left" />删除
        </el-button>
        <el-button type="primary" size="medium" plain :disabled="doDisabled" @click="handleFeedback"><i class="el-icon-edit-outline el-icon--left" />处理</el-button>
      </div>
      <div class="search">
        <el-input v-model="feedbackSearch" size="medium" placeholder="问题名称所属专业创建人终身" />
        <el-button type="primary" size="medium" @click="startSearch">搜索</el-button>
      </div>
    </div>
    <list-table :id="id" :list="list" :list-loading="listLoading" :config="FeedbackConfig" @selectionChange="selectionChange" />

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="__fetchData" />

    <!-- 新建弹窗 -->
    <form-dialog
      ref="editDialog"
      :config="initCreateConfig()"
      :select-update-data="selectUpdateData"
      :dialog-visible="createDialogVisible"
      @close-dialog="createDialogVisible = false"
      @submit="createSubmit"
      @upload-click="uploadClick"
    />

    <!-- 上传附件弹窗-->
    <upload-file
      :dialog-visible="uploadDialogVisible"
      :multiple="false"
      @close-dialog="uploadDialogVisible = false"
      @upload-submit="uploadSubmit"
    />
    <!-- 问题处理弹窗 -->
    <problem-handling-dialog
      ref="handlingDialog"
      :config="initHanglingConfig()"
      :dialog-visible="handlingDialogVisible"
      @close-dialog="handlingDialogVisible = false"
      @submit="problemSubmit"
    />
  </div>
</template>

<script>
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FormDialog from '@/components/FormDialog'
import UploadFile from '@/components/UploadFile'
import ProblemHandlingDialog from './components/ProblemHandlingDialog/index.vue'
// '@/feedback/components/ProblemHandlingDialog/index.vue'
import {
  FeedbackConfig,
  CreateFeedbackConfig
} from '@/data/login-log'

export default {
  components: {
    ListTable,
    Pagination,
    FormDialog,
    UploadFile,
    ProblemHandlingDialog
  },
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      feedbackSearch: '',
      formLabelWidth: '80px',
      id: 'table1',
      updateDisabled: true,
      deleteDisabled: true,
      doDisabled: true,
      selectData: [],
      selectUpdateData: {},
      list: [{
        questionName: '页面是否存在问题',
        major: '机电一体化',
        creater: '张三',
        createTime: '2021-3-22 16:40',
        isHandled: '否',
        premier: '李四',
        detailed: '',
        feedbackAttachment: '无附件'
      }, {
        questionName: '按钮大小是否合适',
        major: '煤矿专业',
        creater: '王武',
        createTime: '2021-3-22 16:40',
        isHandled: '否',
        premier: '李四',
        detailed: '',
        feedbackAttachment: '无附件'
      }, {
        questionName: '字体大小是否统一',
        major: '计算机应用',
        creater: '赵思',
        createTime: '2021-3-22 16:40',
        isHandled: '否',
        premier: '李四',
        detailed: '',
        feedbackAttachment: '无附件'
      }, {
        questionName: '布局是否需要调整',
        major: '物联网',
        creater: '张思',
        createTime: '2021-3-22 16:40',
        isHandled: '否',
        premier: '李四',
        detailed: '',
        feedbackAttachment: '无附件'
      }],
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      filter: {}, // 筛选项
      listLoading: true,
      // createVisible: false,
      FeedbackConfig,
      CreateFeedbackConfig,
      createDialogVisible: false,
      uploadDialogVisible: false,
      handlingDialogVisible: false
    }
  },
  created() {
    this.__fetchData()
  },
  methods: {
    // 获取数据
    __fetchData() {
      this.listLoading = true
      // const query = Object.assign(this.listQuery, this.filter)
      // console.log(query);
      // getList(query).then(response => {
      //   this.listLoading = false
      //   this.list = response.data.items
      //   console.log(this.list);
      //   this.total = response.data.total
      // })
      this.listLoading = false
      this.total = this.list.length
    },
    // 查询数据
    queryData(filter) {
      this.filter = Object.assign(this.filter, filter)
      // console.log(this.filter);
    },
    createFeedback() {
      this.createDialogVisible = true
    },
    editSchool() {
      // const visible = `${name}DialogVisible`
      // this[visible] = true
      // this.uploadDialogVisible= true;
      if (this.selectData.length == 1) {
        // 如果有数据，更新子组件的 formData
        console.log(this.selectData)
        this.$refs.editDialog.updataForm(this.selectData[0])
      }
      this.createDialogVisible = true
    },
    deleteFeedback() {
      this.$message({
        message: '恭喜你，删除成功',
        type: 'success'
      })
    },
    handleFeedback() {
      this.handlingDialogVisible = true
    },
    // 初始化新建窗口配置
    initCreateConfig() {
      const createConfig = Object.assign({
        title: '创建',
        width: '700px',
        form: this.CreateFeedbackConfig.columns
      })
      return createConfig
    },
    initHanglingConfig() {
      const createConfig = Object.assign({
        title: '问题处理',
        width: '700px',
        height: '400px'
      })
      return createConfig
    },
    // submit data
    createSubmit(submitData) {
      console.log(submitData)
      this.createDialogVisible = false
      this.$message.success('新建成功')
    },
    // 搜索
    startSearch() {
      if (this.feedbackSearch) {
        this.$message({
          message: '恭喜你，搜索成功',
          type: 'success'
        })
        this.__fetchData()
      }
    },
    selectionChange(row) {
      console.log(row)
      this.selectData = row
      if (row.length > 0) {
        this.deleteDisabled = false
        if (row.length == 1) {
          this.updateDisabled = false
          this.doDisabled = false
          this.selectUpdateData = row[0]
        } else {
          this.updateDisabled = true
          this.doDisabled = true
        }
      } else {
        this.updateDisabled = true
        this.doDisabled = true
      }
    },
    uploadClick(_data) {
      console.log(_data)
      this.uploadDialogVisible = true
    },
    problemSubmit(implementer, implementationDails) {
      console.log(implementer, implementationDails)
      if (!implementer) {
        this.$message.error('请输入落实人')
      } else if (!implementationDails) {
        this.$message.error('请输入落实明细')
      } else {
        this.$message({
          message: '恭喜你，问题处理成功',
          type: 'success'
        })
        this.handlingDialogVisible = false
      }
    },
    uploadSubmit() {

    }
  }
}
</script>
<style lang="scss" scoped>
  .page-container {
    .buttons {
      margin-bottom: 16px;

      .buttons_item {
        display: inline-block;
      }

      .search {
        display: inline-block;
        float: right;

        .el-input {
          display: inline-block;
          width: 240px;
        }

        .el-button {
          display: inline-block;
          margin-left: 20px;
        }
      }
    }

    .el-dialog__wrapper {
      .el-dialog__body {
        width: calc(100% - 60px) !important;
        margin: 20px auto 0 !important;

        .el-input {
          width: 300px;
        }

        .el-select {
          width: 300px;
        }

      }
    }

    .el-dialog__wrapper {
      .el-dialog__body {
        width: calc(100% - 60px) !important;
        margin: 20px auto 0 !important;
      }
    }
  }
</style>
