<template>
  <div class="page-container">
    <filter-bar
      :config="ProcessExampleFilterConfig"
      @search-click="queryData"
      @create-click="openDialog('create')"
      @reset-click="queryData"
    />
    <list-table
      :id="id"
      :list="list"
      :list-loading="listLoading"
      :config="ProcessExampleTableConfig"
      height="calc(100% - 157px)"
      @other-click="otherClick"
    />
    <div v-show="total>0" class="page-bottom">
      <pagination
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.pagerows"
        @pagination="__fetchData"
      />
    </div>

    <!-- 委派 -->
    <form-dialog
      ref="appointDialog"
      :config="initAppointConfig()"
      :dialog-visible="appointDialogVisible"
      @close-dialog="appointDialogVisible = false"
      @submit="appointSubmit"
    />

    <!-- 跳转 -->
    <form-dialog
      ref="jumpNodeDialog"
      :config="initJumpNodeConfig()"
      :dialog-visible="jumpNodeDialogVisible"
      @close-dialog="jumpNodeDialogVisible = false"
      @submit="jumpNodeSubmit"
    />

  </div>
</template>

<script>
import { getProcessExampleList, suspendProcess, appointProcess, jumpProcessNode, getProcessNodeList } from '@/api/flow-management'
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FormDialog from '@/components/FormDialog'
import { ProcessExampleTableConfig, ProcessExampleFilterConfig, AppointTableConfig, JumpNodeTableConfig } from '@/data/flow-management'

export default {
  components: { FilterBar, ListTable, Pagination, FormDialog },
  data() {
    return {
      id: 'to-do-process',
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      taskId: '', // 任务id
      processInstanceId: '', // 流程实例id
      filter: {}, // 筛选项
      listLoading: true,
      ProcessExampleFilterConfig,
      ProcessExampleTableConfig,
      AppointTableConfig,
      JumpNodeTableConfig,
      appointDialogVisible: false,
      jumpNodeDialogVisible: false,
      processImgDialogVisible: false

    }
  },

  created() {
    this.__fetchData()
  },
  methods: {
    __fetchData() {
      this.listLoading = true
      const filter = {
        ...this.filter,
        keywordField: ['processDefinitionName']
      }
      const query = Object.assign(this.listQuery, filter)
      getProcessExampleList(query).then(response => {
        this.listLoading = false
        this.list = response.data.rows
        this.total = Number(response.data.records)
      }).catch((err) => {
        console.log(err)
      })
    },
    // 查询数据
    queryData(filter) {
      this.filter = Object.assign(this.filter, filter)
      this.$set(this.listQuery, 'page', 1)
      this.__fetchData()
    },
    // 初始化委派窗口配置
    initAppointConfig() {
      const appointConfig = Object.assign({
        title: '委派',
        width: '800px',
        form: this.AppointTableConfig.columns
      })
      return appointConfig
    },
    // 初始化跳转节点窗口配置
    initJumpNodeConfig() {
      const jumpNodeConfig = Object.assign({
        title: '跳转节点',
        width: '800px',
        form: this.JumpNodeTableConfig.columns
      })
      return jumpNodeConfig
    },
    // 打开挂起/激活、委派、跳转弹窗
    async otherClick(row, index, item) {
      this.taskId = row.taskId
      this.processInstanceId = row.id
      if (item === '挂起/激活') {
        this.activateProcess(row)
      } else if (item === '委派') {
        this.appointDialogVisible = true
      } else if (item === '跳转') {
        getProcessNodeList(row.processDefinitionId).then(response => {
          const nodeData = []
          if (response.data && response.data.length > 0) {
            response.data.forEach(it => {
              // 筛选掉当前所在任务节点
              if (row.taskName !== it.name) {
                nodeData.push({
                  value: it.id,
                  label: it.name
                })
              }
            })
          }
          JumpNodeTableConfig.columns.forEach(it => {
            if (it.field === 'targetTaskDefinitionKey') {
              it.options = nodeData
            }
          })
        })
        this.jumpNodeDialogVisible = true
      }
    },
    // 挂起/激活
    activateProcess(row) {
      this.$confirm(`是否${row.isSuspended ? '激活' : '挂起'}当前流程?`, `${row.isSuspended ? '激活' : '挂起'}`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        suspendProcess(row.id).then(response => {
          this.$message.success('操作成功')
          this.__fetchData()
        })
      })
    },

    // 委托提交
    appointSubmit(submitData) {
      const query = Object.assign(submitData, {
        taskIds: this.taskId
      })
      appointProcess(query).then(response => {
        this.appointDialogVisible = false
        this.$message.success('提交成功')
        this.$refs.appointDialog.resetForm()
        this.__fetchData()
      }).catch(err => {
        console.log(err)
        this.$refs.appointDialog.resetSubmitBtn()
      })
    },
    // 跳转节点提交
    jumpNodeSubmit(submitData) {
      const query = Object.assign(submitData, {
        processInstanceId: this.processInstanceId
      })
      jumpProcessNode(query).then(response => {
        this.jumpNodeDialogVisible = false
        this.$message.success('提交成功')
        this.$refs.jumpNodeDialog.resetForm()
        this.__fetchData()
      }).catch(err => {
        console.log(err)
        this.$refs.jumpNodeDialog.resetSubmitBtn()
      })
    }

  }
}
</script>
