<template>
  <div class="page-container">
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
      :filter-method="filterMethods"
      @edit-click="(row) => openDialog('edit', row)"
      @delete-click="deleteClick"
    />
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.size"
      @pagination="__fetchData"
    />
    <!-- 新建弹窗 -->
    <!-- 'create' 对应 createDialogVisible字段 -->
    <form-dialog
      :config="initCreateConfig()"
      :dialog-visible="createDialogVisible"
      @close-dialog="closeDialog('create')"
      @submit="createSubmit"
    />
    <!-- 编辑弹窗 -->
    <!-- 'edit' 对应 editDialogVisible字段 -->
    <form-dialog
      ref="editDialog"
      :config="initEditConfig()"
      :dialog-visible="editDialogVisible"
      @close-dialog="closeDialog('edit')"
      @submit="editSubmit"
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
      editDialogVisible: false
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
        this.listLoading = false
        this.list = response.data.items
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
      if (row) {
        // 如果有数据，更新子组件的 formData
        this.$refs.editDialog.updataForm(row)
      }
    },
    // 关闭弹窗后手动设置弹窗隐藏 xxxxxDialogVisible ：false
    // 否则会因为使用同一组件导致 dialogVisible 错乱
    closeDialog(name) {
      const visible = `${name}DialogVisible`
      this[visible] = false
    },
    // 删除
    deleteClick(id) {
      this.$confirm('确定删除该项目?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        this.$message.success(id)
      })
    },

    // submit data
    createSubmit(submitData) {
      console.log(submitData)
    },
    editSubmit(submitData) {
      console.log(submitData)
    },

    // 字段过滤方法
    filterMethods(name, str) {
      if (name === 'statusFilter') {
        // 项目状态
        const statusMap = {
          1: '已完成',
          2: '进行中',
          3: '未开始',
          4: '已搁置'
        }
        return statusMap[str]
      } else if (name === 'urgencyFilter') {
        // 紧急状态
        return str ? '是' : '否'
      }
      // else if ...
    }

  }
}
</script>
