<template>
  <div class="page-container">
    <div class="filter-bar">
      <filter-bar :config="reformFilterConfig" style="display: inline-block;" @search-click="queryData" />
    </div>
    <!-- 表格 -->
    <list-table
      :id="id"
      :list="list"
      :list-loading="listLoading"
      :config="reformTableConfig"
      height="calc(100% - 157px)"
      @other-click="otherClick"
    />
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.pagerows"
      @pagination="__fetchData"
    />
    <!-- 送审复查 -->
    <form-dialog
      ref="checkDialog"
      :config="initcheckConfig()"
      :dialog-visible="checkDialogVisible"
      @upload-click="(row) => openUploadDialog('checkDialog', row)"
      @close-dialog="closeDialog"
      @submit="createSubmit"
    />
    <!-- 退回隐患 -->
    <form-dialog
      ref="returnDialog"
      :config="initReturnConfig()"
      :dialog-visible="returnDialogVisible"
      @upload-click="(row) => openUploadDialog('returnDialog', row)"
      @close-dialog="closeDialog"
      @submit="createSubmit"
    />
    <!-- 申请延期 -->
    <form-dialog
      ref="applyDialog"
      :config="initapplyConfig()"
      :dialog-visible="applyDialogVisible"
      @close-dialog="closeDialog"
      @submit="createSubmit"
    />
    <!-- 上传附件 -->
    <upload-file
      :dialog-visible="uploadDialogVisible"
      @close-dialog="uploadDialogVisible = false"
      @upload-submit="uploadSubmit"
    />
  </div>
</template>
<script>
import {
  getHiddenRegisterDetailList,
  getsysDictListById,
  saveHiddenMeasure
} from '@/api/hidden-danger'
import {
  getAqglHiddenTissueTree
} from '@/api/organization'
import {
  getOrganTree
} from '@/api/authority-management'
import ListTable from '@/components/ListTable'
import {
  reformTableConfig,
  reformFilterConfig,
  submitForCensorshipCheck,
  returnRectification,
  applyDelay
} from '@/data/hidden-danger'
import Pagination from '@/components/Pagination'
import FilterBar from '@/components/FilterBar'
import FormDialog from '@/components/FormDialog'
import UploadFile from '@/components/UploadFile'
export default {
  components: {
    ListTable,
    Pagination,
    FilterBar,
    FormDialog,
    UploadFile
  },
  data() {
    return {
      id: 'reform',
      listLoading: true,
      filter: {},
      reformTableConfig,
      reformFilterConfig,
      submitForCensorshipCheck, // 送审复查
      returnRectification, // 退回整改
      applyDelay, // 申请延期
      list: [],
      listQuery: {
        page: 1,
        pagerows: 10
      },
      total: 1,
      selectCheckbox: {},
      checkDialogVisible: false,
      returnDialogVisible: false,
      applyDialogVisible: false,
      uploadRow: null,
      uploadDialogVisible: false,
      formConfig: [], // 存放不同整改类型的form表单的字段
      rectificationType: 0, // 1:送审复查 2:返回隐患 3：延期送审
      openForm: {
        visible: '',
        refs: ''
      }
    }
  },
  created() {
    this.__fetchHiddenUnit()
    this.__fetchSelectList()
    this.__fetchUnit()
    this.__fetchData()
  },
  methods: {
    __fetchUnit() {
      getOrganTree().then(response => {
        // 更新新增、编辑config数据
        this.reformTableConfig.columns.forEach(it => {
          if (it.field === 'examineUnit') {
            it.options = response.data
          } else if (it.field === 'reviewUnitId') {
            it.options = response.data
          }
        })
      })
    },
    __fetchHiddenUnit() {
      const query = {
        aqglHiddenTissueId: ''
      }
      getAqglHiddenTissueTree(query).then(response => {
        this.reformTableConfig.columns.forEach(it => {
          if (it.field === 'hiddenDeptId') {
            it.options = response.data
          }
        })
      })
    },
    __fetchSelectList() {
      const query = [{
        parentId: 10088
      }, {
        parentId: 10092
      }, {
        parentId: 10042
      }, {
        parentId: 10097
      }, {
        parentId: 10106
      }, {
        // 隐患状态
        parentId: 10115
      }]
      for (const q in query) {
        getsysDictListById(query[q].parentId).then(response => {
          const selectList = []
          for (const m in response.data) {
            selectList.push({
              value: response.data[m].sysDictId,
              label: response.data[m].dictName
            })
          }
          this.reformTableConfig.columns.forEach(it => {
            if (query[q].parentId == 10088) {
              if (it.field === 'examineShiftId') {
                it.options = selectList
                console.log(it)
              }
            } else if (query[q].parentId == 10092) {
              if (it.field === 'examineTypeId') {
                it.options = selectList
              }
            } else if (query[q].parentId == 10042) {
              if (it.field === 'examinePathId') {
                it.options = selectList
              }
            } else if (query[q].parentId == 10097) {
              if (it.field === 'hiddenTypeId') {
                it.options = selectList
              }
            } else if (query[q].parentId == 10106) {
              if (it.field === 'hiddenGrade') {
                it.options = selectList
              }
            } else if (query[q].parentId == 10115) {
              if (it.field === 'hiddenStatus') {
                it.options = selectList
              }
            }
          })
        })
      }
    },
    __fetchData() {
      this.listLoading = false
      const query = {
        hiddenStatus: ['10116', '10118'],
        pageEntity: {
          page: this.listQuery.page,
          pagerows: this.listQuery.pagerows,
          keyword: this.filter.name,
          keywordField: ['hiddenContent', 'rectifyPlan']
        }
      }
      getHiddenRegisterDetailList(query).then(response => {
        if (response.data.rows.length > 0) {
          console.log(response)
          this.listLoading = false
          this.list = response.data.rows
          this.total = Number(response.data.records)
        } else {
          if (this.listQuery.page > 0) {
            this.listQuery.page = this.listQuery.page - 1
            this.__fetchData()
          } else {
            this.listLoading = false
            this.list = []
            this.total = 0
          }
        }
      }).catch(err => {
        this.listLoading = false
      })
    },
    queryData(filter) {
      this.filter = Object.assign(this.filter, filter)
      this.__fetchData()
    },
    check() {
      this.rectificationType = 1
      this.openForm.visible = 'checkDialogVisible'
      this.openForm.refs = 'checkDialog'
      this.checkDialogVisible = true
    },
    returnHidden() {
      this.rectificationType = 2
      this.openForm.visible = 'returnDialogVisible'
      this.openForm.refs = 'returnDialog'
      this.returnDialogVisible = true
    },
    applicationExtension() {
      if (this.selectCheckbox.hiddenStatus == '10118') {
        this.$message.info('该数据已经申请过延期')
        return
      }
      const info = {}
      this.applyDelay.columns.forEach(it => {
        if (it.field == 'postponeApplyTime') {
          info[it.field] = new Date().toLocaleDateString().replace(/\//g, '-')
        } else {
          info[it.field] = ''
        }
      })
      this.$refs.applyDialog.updataForm(info)
      this.rectificationType = 3
      this.openForm.visible = 'applyDialogVisible'
      this.openForm.refs = 'applyDialog'
      this.applyDialogVisible = true
    },
    // 初始化新建窗口配置
    initcheckConfig() {
      const createConfig = Object.assign({
        title: '新建',
        width: '1000px',
        form: this.submitForCensorshipCheck.columns
      })
      return createConfig
    },
    initReturnConfig() {
      const createConfig = Object.assign({
        title: '新建',
        width: '1000px',
        form: this.returnRectification.columns
      })
      return createConfig
    },
    initapplyConfig() {
      const createConfig = Object.assign({
        title: '新建',
        width: '1000px',
        form: this.applyDelay.columns
      })
      return createConfig
    },
    // 新增
    createSubmit(submitData) {
      const query = Object.assign(submitData, {
        aqglHiddenRegisterId: this.selectCheckbox.aqglHiddenRegisterId,
        abarbeitungType: this.rectificationType
      })
      saveHiddenMeasure(query).then(response => {
        this.$message.success('创建成功')
        this.__fetchData()
        this.[`${this.openForm.visible}`] = false
        this.$refs.[`${this.openForm.refs}`].resetForm()
      }).catch(err => {
        this.$refs.[`${this.openForm.refs}`].resetSubmitBtn()
      })
    },
    closeDialog() {
      this.[`${this.openForm.visible}`] = false
      this.rectificationType = 0
    },
    // 打开上传文件组件
    openUploadDialog(ref, row) {
      // 记录当前打开弹窗ref
      this.dialogRef = ref
      this.uploadDialogVisible = true
      this.uploadRow = row
    },
    // 上传文件控件成功回调
    uploadSubmit(fileList) {
      this.$refs[this.dialogRef].updateFile(fileList)
      this.uploadDialogVisible = false
    },
    otherClick(data, index, name) {
      this.selectCheckbox = data
      if (name == '送审复查') {
        this.check()
      } else if (name == '退回隐患') {
        this.returnHidden()
      } else if (name == '申请延期') {
        this.applicationExtension()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
