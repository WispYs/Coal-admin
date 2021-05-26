<template>
  <div class="page-container">

    <filter-bar
      :config="FlowFilterConfig"
      @create-click="openDialog('create')"
    />
    <list-table
      :id="id"
      :list="list"
      :list-loading="listLoading"
      :config="flowTableConfig"
      height="calc(100% - 157px)"
      @edit-click="(row) => openDialog('edit', row)"
      @delete-click="deleteClick"
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

  </div>
</template>

<script>
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FormDialog from '@/components/FormDialog'
import FilterBar from '@/components/FilterBar'
import { flowTableConfig, FlowFilterConfig } from '@/data/flow-management'
import {
  getFlowTableData,
  findProcess,
  findTable,
  saveFlow,
  delProcess,
  updataProcess,
  deleteBatches
} from '@/api/flow-management'
export default {
  components: { ListTable, Pagination, FormDialog, FilterBar },
  data() {
    return {
      editDialogVisible: false,
      createDialogVisible: false,
      flowTableConfig,
      FlowFilterConfig,
      id: 'flow-manage',
      bussiness: 'actFlowDeploy',
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      listLoading: true,
      multipleSelection: [], // 多选项
      deleteDisabled: true, // 批量删除置灰
      tableData: [],
      processData: []
    }
  },
  created() {
    this.initOptions()
    this.__fetchData()
  },
  methods: {
    __fetchData() {
      this.listLoading = true
      const query = Object.assign(this.listQuery)
      getFlowTableData(query).then(res => {
        this.listLoading = false
        this.list = res.data.rows
        this.total = Number(res.data.records)
        if (this.listQuery.page > 1 && !this.list.length) {
          this.listQuery.page--
          this.__fetchData()
        }
      })
      // getFlowTableData(query).then(response => {
      //   console.log(response)
      //   this.listLoading = false
      //   this.list = response.data.rows
      //   this.total = Number(response.data.records)
      // })
    },
    initOptions() {
      findProcess().then(res => {
        this.processData = res.data
        for (const k in res.data) {
          this.processData[k]['value'] = res.data[k]['id']
          this.processData[k]['label'] = res.data[k]['name']
        }
        flowTableConfig.columns.forEach(it => {
          if (it.field === 'definitionId') {
            it.options = this.processData
          }
        })
      })
      findTable().then(res => {
        this.tableData = res.data
        for (const k in res.data) {
          this.tableData[k]['value'] = res.data[k]['tableName']
          this.tableData[k]['label'] = res.data[k]['description']
        }
        flowTableConfig.columns.forEach(it => {
          if (it.field === 'tableName') {
            it.options = this.tableData
          }
        })
        console.log('flowTableConfig', flowTableConfig.columns)
      })
    },
    // 初始化新建窗口配置
    initCreateConfig() {
      const createConfig = Object.assign({
        title: '新建',
        width: '1000px',
        form: this.flowTableConfig.columns
      })
      return createConfig
    },
    // 初始化编辑窗口配置
    initEditConfig() {
      const editConfig = Object.assign({
        title: '编辑',
        width: '1000px',
        form: this.flowTableConfig.columns
      })
      return editConfig
    },
    // 删除
    deleteClick(row) {
      this.$confirm('确定删除该站点?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delProcess(row.actFlowDeployId).then(res => {
          this.$message.success('删除成功')
          this.__fetchData()
        })
      })
    },
    // 编辑
    editSubmit(submitData) {
      const data = {
        actFlowDeployId: submitData.actFlowDeployId,
        definitionId: submitData.definitionId,
        definitionKey: submitData.definitionKey,
        definitionName: submitData.definitionName,
        parentId: submitData.parentId,
        tableName: submitData.tableName
      }

      updataProcess(data).then(response => {
        this.editDialogVisible = false
        this.$message.success('编辑成功')
        this.$refs.editDialog.resetForm()
        this.__fetchData()
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
      const selectId = []
      this.multipleSelection.forEach(it => selectId.push(it[`${this.bussiness}Id`]))
      console.log(selectId)
      if (selectId.length === 0) {
        this.$message.warning('请选择所删除的文件')
        return false
      }
      this.$confirm('确定删除所选中文件?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteBatches(selectId, this.bussiness).then(res => {
          this.__fetchData()
          this.$message.success('删除成功')
        })
      })
    },
    // 新建
    createSubmit(submitData) {
      const process = this.processData.filter(p => p.value === submitData.definitionId)[0]
      const table = this.tableData.filter(t => t.tableName === submitData.tableName)[0]
      const entity = {
        definitionId: process.id,
        definitionKey: process.key,
        definitionName: process.name,
        tableId: table.tableId,
        tableName: table.tableName
      }

      saveFlow(entity).then(res => {
        this.createDialogVisible = false
        this.$message.success('新建成功')
        this.$refs.createDialog.resetForm()
        this.__fetchData()
      }).catch(err => {
        console.log(err)
        this.$refs.createDialog.resetSubmitBtn()
      })
    },

    // 打开弹窗
    openDialog(name, row) {
      console.log(name, row)
      const visible = `${name}DialogVisible`
      this[visible] = true

      // if (process.result === 1) {
      //   console.log(process.data)
      // }
      // getOrganTree().then(response => {
      //   console.log(response.data)
      //   // 更新新增、编辑config数据
      //   flowTableConfig.columns.forEach(it => {
      //     if (it.field === 'sysDeptId') {
      //       it.options = response.data
      //     }
      //   })
      // })
      // // 如果有数据，更新子组件的 formData
      if (row) {
        this.$refs.editDialog.updataForm(row)
        // updataProcess(data).then(response => {
        //   const info = Object.assign(response.data, {
        //     sysDeptId: Number(response.data.sysDeptId) || 0
        //   })
        // })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.configForm{
  width: 100%;
}
</style>
