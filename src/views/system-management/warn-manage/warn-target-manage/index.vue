<template>
  <div class="page-container">
    <filter-bar :config="warnTargetManageFilterConfig" @search-click="queryData" @create-click="openDialog('create')" />
    <list-table
      :id="id"
      :list="list"
      :list-loading="listLoading"
      :config="warnTargetManageconfig"
      @edit-click="(row) => openDialog('edit', row)"
      @text-click="opentextDialog"
      @delete-click="deleteClick"
    />
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.pagerows"
      @pagination="__fetchData"
    />
    <form-dialog
      ref="createDialog"
      :config="initCreateConfig()"
      :dialog-visible="createDialogVisible"
      @close-dialog="createDialogVisible = false"
      @submit="createSubmit"
    />
    <!-- 编辑弹窗 -->
    <form-dialog
      ref="editDialog"
      :config="initEditConfig()"
      :dialog-visible="editDialogVisible"
      @close-dialog="editDialogVisible = false"
      @submit="editSubmit"
    />
  </div>
</template>

<script>
import {
  getGzyqManger,
  saveGzyqManger,
  getGzyqMangerById,
  updateGzyqManger,
  delGyqMangerById
} from '@/api/authority-management'
import {
  getsysDictListById
} from '@/api/hidden-danger'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FilterBar from '@/components/FilterBar'
import FormDialog from '@/components/FormDialog'
import UploadFile from '@/components/UploadFile'
import {
  warnTargetManageconfig,
  warnTargetManageFilterConfig
} from '@/data/authority-management'

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
      id: '',
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      filter: {}, // 筛选项
      listLoading: true,
      warnTargetManageconfig,
      warnTargetManageFilterConfig,
      createDialogVisible: false,
      editDialogVisible: false,
      list: []
    }
  },

  created() {
    this.__fetchData()
    this.__fetchSelectList()
  },
  methods: {
    __fetchSelectList() {
      const query = [{
        // 状态
        parentId: 111219
      }, {
        // 值类型
        parentId: 111222
      }]
      for (const q in query) {
        getsysDictListById(query[q].parentId).then(response => {
          const selectList = []
          for (const m in response.data) {
            selectList.push({
              label: response.data[m].dictName,
              value: response.data[m].sysDictId
            })
          }
          console.log(selectList)
          this.warnTargetManageconfig.columns.forEach(it => {
            if (query[q].parentId == 111219) {
              if (it.field === 'gzyqStatus') {
                it.options = selectList
              }
            } else if (query[q].parentId == 111222) {
              if (it.field === 'valueType') {
                it.options = selectList
              }
            }
          })
        })
      }
    },
    __fetchData() {
      this.listLoading = true
      const query = {
        page: this.listQuery.page,
        pagerows: this.listQuery.pagerows,
        keyword: this.filter.keyword,
        keywordField: ['filedName']
      }
      getGzyqManger(query).then(response => {
        if (response.data.rows.length > 0) {
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
    // 查询数据
    queryData(filter) {
      this.filter = Object.assign(this.filter, filter)
      this.__fetchData()
    },
    // 初始化新建窗口配置
    initCreateConfig() {
      const createConfig = Object.assign({
        title: '新建',
        width: '1000px',
        form: this.warnTargetManageconfig.columns
      })
      return createConfig
    },
    // 初始化编辑窗口配置
    initEditConfig() {
      const editConfig = Object.assign({
        title: '编辑',
        width: '1000px',
        form: this.warnTargetManageconfig.columns
      })
      return editConfig
    },
    // 打开弹窗
    openDialog(name, row) {
      const visible = `${name}DialogVisible`
      this[visible] = true
      if (row) {
        getGzyqMangerById(row.gzyqMangerId).then(response => {
          const info = Object.assign(response.data, {
            gzyqStatus: String(response.data.gzyqStatus)
          })
          this.$refs.editDialog.updataForm(info)
        })
      }
    },
    // 删除
    deleteClick(row) {
      this.$confirm('确定删除该规则?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delGyqMangerById(row.gzyqMangerId).then(response => {
          this.$message.success('删除成功')
          this.__fetchData()
        })
      })
    },
    // submit data
    createSubmit(submitData) {
      const query = Object.assign(submitData)
      saveGzyqManger(query).then(response => {
        this.createDialogVisible = false
        this.$message.success('新建成功')
        this.$refs.createDialog.resetForm()
        this.__fetchData()
      }).catch(err => {
        this.$refs.createDialog.resetSubmitBtn()
      })
    },
    editSubmit(submitData) {
      const query = Object.assign(submitData)
      updateGzyqManger(query).then(response => {
        this.editDialogVisible = false
        this.$message.success('编辑成功')
        this.$refs.editDialog.resetForm()
        this.__fetchData()
      })
    },
    // 打开模板内容弹窗
    opentextDialog(value) {
      this.htmlValue = value
      this.textDialogVisible = true
    },
    // 上传文件控件成功回调
    uploadSubmit(fileList) {
      this.uploadDialogVisible = false
    }
  }
}
</script>
<style lang="scss" scoped>
</style>

</style>
