<template>
  <div class="page-container">
    <filter-bar
      :config="TodoProcessFilterConfig"
      @search-click="queryData"
      @create-click="openDialog('create')"
      @reset-click="queryData"
    />
    <list-table
      :id="id"
      :list="list"
      :list-loading="listLoading"
      :config="TodoProcessTableConfig"
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

    <!-- 办理任务 -->
    <form-dialog
      ref="handleTaskDialog"
      :task-id="taskId"
      :business-id="businessId"
      :config="initHandleTaskConfig()"
      :dialog-visible="handleTaskDialogVisible"
      @close-dialog="handleTaskDialogVisible = false"
      @submit="handleTaskSubmit"
    />

    <!-- 查看流程图 -->
    <process-img
      ref="processImgDialog"
      :img-url="processImgUrl"
      :dialog-visible="processImgDialogVisible"
      @close-dialog="processImgDialogVisible = false"
    />

  </div>
</template>

<script>
import { getTodoProcessList, updateTask, getHandleType } from '@/api/flow-management'
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FormDialog from './components/FormDialog'
import ProcessImg from './components/ProcessImg'
import { TodoProcessTableConfig, TodoProcessFilterConfig, HandleTaskConfig } from '@/data/flow-management'
import { FlowImg } from '@/api/url'

export default {
  components: { FilterBar, ListTable, Pagination, FormDialog, ProcessImg },
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
      businessId: '', // 业务id
      processImgUrl: '', // 流程图地址
      filter: {}, // 筛选项
      listLoading: true,
      TodoProcessFilterConfig,
      TodoProcessTableConfig,
      HandleTaskConfig,
      handleTaskDialogVisible: false,
      processImgDialogVisible: false

    }
  },

  created() {
    this.__fetchData()
  },
  methods: {
    // 查询任务处理方式（连线信息）
    __updateHandleType(id) {
      return new Promise((resolve, reject) => {
        getHandleType({ taskId: id }).then(response => {
          const { data } = response
          const outcomes = data.outcomes
          this.businessId = data.businessId
          if (outcomes && outcomes.length > 0) {
            HandleTaskConfig.columns.forEach(item => {
              if (item.field === 'outcomes') {
                const typeArr = []
                outcomes.forEach(it => {
                  typeArr.push({
                    value: it[1],
                    label: it[1],
                    key: it[0]
                  })
                })
                item.options = typeArr
                item.immutable = false
              }
            })
          } else {
            HandleTaskConfig.columns.forEach((item, index) => {
              if (item.field === 'outcomes') {
                item.immutable = true
              }
            })
          }
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    __fetchData() {
      this.listLoading = true
      const filter = {
        ...this.filter,
        keywordField: ['name']
      }
      const query = Object.assign(this.listQuery, filter)
      getTodoProcessList(query).then(response => {
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
    // 初始化办理任务窗口配置
    initHandleTaskConfig() {
      const handleTaskConfig = Object.assign({
        title: '办理任务',
        width: '1000px',
        form: this.HandleTaskConfig.columns
      })
      return handleTaskConfig
    },
    // 打开办理任务、查看流程图弹窗
    async otherClick(row, index, item) {
      if (item === '办理任务') {
        this.taskId = row.id
        console.log(this.taskId)
        await this.__updateHandleType(row.id)
        this.$refs.handleTaskDialog.__fetchData()
        this.handleTaskDialogVisible = true
      } else if (item === '查看流程图') {
        this.processImgUrl = `${FlowImg}/workflow/toViewProcessByTaskId?taskId=${row.id}`
        this.processImgDialogVisible = true
      }
    },
    // 提交批注信息
    handleTaskSubmit(submitData) {
      console.log(submitData)
      const query = Object.assign(submitData)
      updateTask(query).then(response => {
        this.handleTaskDialogVisible = false
        this.$message.success('提交成功')
        this.$refs.handleTaskDialog.resetForm()
        this.__fetchData()
      }).catch(err => {
        console.log(err)
        this.$refs.handleTaskDialog.resetSubmitBtn()
      })
    }

  }
}
</script>
