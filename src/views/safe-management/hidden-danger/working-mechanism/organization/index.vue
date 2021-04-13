<template>
  <div class="page-container">
    <div class="tree-form-container">
      <filter-bar
        :config="MechanismFilterConfig"
        @search-click="queryData"
        @create-click="openDialog('create')"
      />
      <list-table
        :id="id"
        :list="list"
        :list-loading="listLoading"
        :config="MechanismTableConfig"
        @edit-click="(row) => openDialog('edit', row)"
        @delete-click="deleteClick"
        @submit-data="editSubmit"
      />
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.pagerows"
        @pagination="__fetchData"
      />
      <!-- 新建弹窗 -->
      <form-dialog
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
  </div>
</template>
<script>
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FormDialog from '@/components/FormDialog'
import { MechanismFilterConfig,MechanismTableConfig } from '@/data/hidden-danger'
export default {
  components: { FilterBar,ListTable,Pagination,FormDialog },
  data() {
    return {
      id:'organization',
      keywords: '',
      list:[],
      listLoading: true,
      MechanismTableConfig,
      MechanismFilterConfig,
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      createDialogVisible: false,
      editDialogVisible: false,
      riskFilterList: [],
      list: [
        {
          unit: '顾桥煤矿',
          num: '001',
          organizationType: 1,
          sort: 1,
          parentId: 1
        }
      ],
    }
  },
  created() {
    this.__fetchData()
  },
  methods: {
    __fetchData(){
      this.listLoading = false
      // const query = Object.assign(this.listQuery, this.filter)
      // getList(query).then(response => {
      //   this.listLoading = false
      //   this.list = response.data.items
      //   this.total = response.data.total
      // })
    },
    search() {
      console.log(this.keywords)
    },
    queryData(){},
    // 打开弹窗
    openDialog(name, row) {
      const visible = `${name}DialogVisible`
      this[visible] = true
      this.riskFilterList = this.MechanismTableConfig.columns.filter((ele, index, arr) => {
        return !!ele.field.indexOf("num")
      })
      if (row) {
        // 如果有数据，更新子组件的 formData
        this.$refs.editDialog.updataForm(row)
      }
    },
    // 初始化新建窗口配置
    initCreateConfig() {
      const createConfig = Object.assign({
        title: '新建',
        width: '800px',
        form: this.riskFilterList
      })
      return createConfig
    },
    // 初始化编辑窗口配置
    initEditConfig() {
      const editConfig = Object.assign({
        title: '编辑',
        width: '800px',
        form: this.riskFilterList
      })
      return editConfig
    },
    // 删除
    deleteClick(id) {
      this.$confirm('确定删除该组织结构?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message.success('删除成功')
      })
    },
    // 表格单元格样式
    cellStyle() {
      return 'font-size: 13px'
    },
    createSubmit(){},
    editSubmit(submitData) {
      console.log(submitData)
      this.editDialogVisible = false
      this.$message.success('编辑成功')
    }
  }
}
</script>
<style lang="scss" scoped>
  .filter-bar {
    margin-bottom: 10px;
    &__item {
      display: inline-block;
      margin: 0 40px 15px 0;
      font-size: 14px;
      label {
        font-weight: normal;
        font-size: 14px;
        margin-right: 4px;
      }
    }
  }
</style>
