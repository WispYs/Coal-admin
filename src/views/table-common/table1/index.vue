<template>
  <div class="app-container">
    <filter-bar
      :config="FilterConfig"
      @search-click="queryData"
      @reset-click="queryData"
      @create-click="openDialog('create')"
    />
    <list-table
      :list="list"
      :list-loading="listLoading"
      :config="TableConfig"
      :filter-method="statusFilter"
      @edit-click="(row) => openDialog('edit', row)"
    />
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.size"
      @pagination="__fetchData"
    />
    <!-- 新建弹窗 -->
    <!-- 'create' 取自 createDialogVisible -->
    <form-dialog
      :config="initCreateConfig()"
      :dialog-visible="createDialogVisible"
      @close-dialog="closeDialog('create')"
    />
    <!-- 编辑弹窗 -->
    <!-- 'edit' 取自 editDialogVisible -->
    <form-dialog
      :config="initEditConfig()"
      :dialog-visible="editDialogVisible"
      :form-data="editFormData"
      @close-dialog="closeDialog('edit')"
    />
  </div>
</template>

<script>
import { getList } from '@/api/table'
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FormDialog from '@/components/FormDialog'
import { TableConfig, FilterConfig } from '@/data/table1'

export default {
  components: { FilterBar, ListTable, Pagination, FormDialog },
  data() {
    return {
      list: null,
      total: 0,
      listQuery: {
        page: 1,
        size: 10
      },
      filter: {}, // 筛选项
      listLoading: true,
      FilterConfig,
      TableConfig,
      createDialogVisible: false,
      editDialogVisible: false,
      editFormData: null
    }
  },
  created() {
    this.__fetchData()
  },
  methods: {
    // 获取数据
    __fetchData() {
      this.listLoading = true
      const query = Object.assign(this.listQuery, this.filter)
      getList(query).then(response => {
        this.list = response.data.items
        this.listLoading = false
        this.total = response.data.total
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
        width: '500px',
        form: this.TableConfig.columns
      })
      return createConfig
    },
    // 初始化编辑窗口配置
    initEditConfig() {
      const editConfig = Object.assign({
        title: '编辑',
        width: '500px',
        form: this.TableConfig.columns
      })
      return editConfig
    },
    // 打开弹窗
    openDialog(name, row) {
      const visible = `${name}DialogVisible`
      this[visible] = true
      console.log(row)
      if (row) {
        this.editFormData = row
      }
    },
    // 关闭弹窗后手动设置弹窗隐藏 xxxxxDialogVisible ：false
    // 否则会因为使用同一组件导致 dialogVisible 错乱
    closeDialog(name) {
      const visible = `${name}DialogVisible`
      this[visible] = false
    },

    // 项目状态过滤器
    statusFilter(status) {
      const statusMap = {
        1: '已完成',
        2: '进行中',
        3: '未开始',
        4: '已搁置'
      }
      return statusMap[status]
    }

  }
}
</script>
