<template>
  <div class="page-container">
    <filter-bar
      :config="EmergencyFilterConfig"
      @search-click="queryData"
      @create-click="openDialog('create')"
      @reset-click="queryData"
      @refresh-click="queryData"
    />
    <list-table
      :id="id"
      :list="list"
      :list-loading="listLoading"
      :config="EmergencyTableConfig"
      height="calc(100% - 157px)"
      @edit-click="(row) => openDialog('edit', row)"
      @delete-click="deleteClick"
      @preview-click="previewClick"
      @edit-process="editProcessClick"
      @submit-data="editSubmit"
      @selection-change="selectionChange"
    />

    <div v-show="total>0" class="page-bottom">
      <el-button
        class="page-bottom__delete"
        type="warning"
        size="small"
        plain
        :disabled="deleteDisabled"
        @click="deleteBatches"
      >
        <i class="el-icon-delete el-icon--left" />批量删除
      </el-button>
      <pagination
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.pagerows"
        @pagination="__fetchData"
      />
    </div>

    <!-- 新建弹窗 -->
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
    <router-view />
  </div>
</template>

<script>
import FilterBar from '@/components/FilterBar'
import ListTable from './components/ListTable'
import Pagination from '@/components/Pagination'
import FormDialog from '@/components/FormDialog'
import { EmergencyTableConfig, EmergencyFilterConfig } from '@/data/emergency-rescue-guide'
import {
  delObject,
  saveObject,
  getObjectById,
  getObjectByPage,
  updateObject,
  getDictData,
  deleteBatches
} from '@/api/emergency-rescue'
export default {
  components: { FilterBar, ListTable, Pagination, FormDialog },
  data() {
    return {
      id: 'application-manage',
      bussiness: 'yjjyFlowManage',
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      filter: {}, // 筛选项
      listLoading: true,
      EmergencyFilterConfig,
      EmergencyTableConfig,
      createDialogVisible: false,
      editDialogVisible: false,
      multipleSelection: [], // 多选项
      deleteDisabled: true // 批量删除置灰

    }
  },
  created() {
    this.__fetchData()
    this.__initOptions()
  },
  methods: {
    __initOptions() {
      // 模板管理
      getDictData(111123).then(res => {
        this.accidentType = res.data
        for (const k in res.data) {
          this.accidentType[k]['value'] = res.data[k]['dictName']
          this.accidentType[k]['label'] = res.data[k]['dictName']
        }
        EmergencyTableConfig.columns.forEach(it => {
          if (it.field === 'templateType') {
            it.options = res.data
          }
        })
      })
    },
    __fetchData() {
      this.listLoading = true
      const filter = {
        ...this.filter,
        keywordField: ['templateName']
      }
      const query = Object.assign(this.listQuery, filter)
      getObjectByPage(query, this.bussiness).then(response => {
        this.listLoading = false
        this.list = response.data.rows
        this.total = Number(response.data.records)
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
        form: this.EmergencyTableConfig.columns
      })
      return createConfig
    },
    // 初始化编辑窗口配置
    initEditConfig() {
      const editConfig = Object.assign({
        title: '编辑',
        width: '1000px',
        form: this.EmergencyTableConfig.columns
      })
      return editConfig
    },
    // 打开弹窗
    openDialog(name, row) {
      console.log(name, row)
      const visible = `${name}DialogVisible`
      this[visible] = true
      // getOrganTree().then(response => {
      //   console.log(response.data)
      //   // 更新新增、编辑config数据
      //   EmergencyTableConfig.columns.forEach(it => {
      //     if (it.field === 'sysDeptId') {
      //       it.options = response.data
      //     }
      //   })
      // })
      // 如果有数据，更新子组件的 formData
      if (row) {
        getObjectById(row[`${this.bussiness}Id`], this.bussiness).then(response => {
          const info = Object.assign(response.data, {
            sysDeptId: Number(response.data.sysDeptId) || 0
          })
          this.$refs.editDialog.updataForm(info)
        })
      }
    },
    // 查看
    previewClick(row) {
      this.$router.push({
        path: '/emergency-rescue/emergency1/emergency1-2/preview-process'
      })
    },
    // 删除
    deleteClick(row) {
      this.$confirm('确定删除该站点?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delObject(row[`${this.bussiness}Id`], this.bussiness).then(response => {
          console.log(response)
          this.$message.success('删除成功')
          this.__fetchData()
        })
      })
    },
    // 新建
    createSubmit(submitData) {
      console.log(submitData)
      const query = Object.assign(submitData, {
        orderNum: Number(submitData.orderNum) || 0,
        sysDeptId: Number(submitData.sysDeptId) || 0
      })
      saveObject(query, this.bussiness).then(response => {
        console.log(response)
        this.createDialogVisible = false
        this.$message.success('新建成功')
        this.$refs.createDialog.resetForm()
        this.__fetchData()
      }).catch(err => {
        console.log(err)
        this.$refs.createDialog.resetSubmitBtn()
      })
    },
    // 编辑
    editSubmit(submitData) {
      console.log(submitData)
      const query = Object.assign(submitData, {
        orderNum: Number(submitData.orderNum) || 0
      })
      updateObject(query, this.bussiness).then(response => {
        console.log(response)
        this.editDialogVisible = false
        this.$message.success('编辑成功')
        this.$refs.editDialog.resetForm()
        this.__fetchData()
      })
    },
    // 编辑流程
    editProcessClick() {
      this.$router.push({
        path: '/emergency-rescue/emergency1/emergency1-2/edit-process'
      })
    },

    // 改变所选项
    selectionChange(val) {
      this.multipleSelection = val
      if (this.multipleSelection.length > 0) {
        this.deleteDisabled = false
      } else {
        this.deleteDisabled = true
      }
      console.log(this.multipleSelection)
    },

    // 批量删除
    deleteBatches() {
      const arr = []
      this.multipleSelection.forEach(m => arr.push(m[`${this.bussiness}Id`]))
      if (arr.length === 0) {
        this.$message.warning('请选择所删除的文件')
        return false
      }
      this.$confirm('确定删除所选中文件?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteBatches(arr, this.bussiness).then(res => {
          this.$message.success('删除成功')
          this.__fetchData()
        })
      })
    }

  }
}
</script>

<style>

</style>
