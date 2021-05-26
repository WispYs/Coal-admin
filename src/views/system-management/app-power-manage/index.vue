<template>
  <div class="page-container">
    <!-- <app-power-filter-bar
      :update-disabled="updateDisabled"
      :delete-disabled="deleteDisabled"
      @openDialog="openDialog"
      @deleteClick="deleteClick"
      @synchroClick="synchroClick"
      @queryData="queryData"
    /> -->
    <filter-bar
      :config="AppPowerFilterConfig"
      @search-click="queryData"
      @create-click="openDialog('create')"
    />
    <list-table
      :id="id"
      :list="list"
      :list-loading="listLoading"
      :config="AppPowerConfig"
      @selectionChange="selectionChange"
      @addIco="(row) => openDialog('create', row)"
      @edit-click="(row) => openDialog('edit', row)"
      @delete-click="deleteClick"
    />

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pagerows" @pagination="__fetchData" />

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
</template>

<script>
import { AppPowerConfig, AppPowerFilterConfig } from '@/data/authority-management'
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import FormDialog from '@/components/FormDialog/index.vue'
import Pagination from '@/components/Pagination'
export default {
  components: {
    ListTable,
    FormDialog,
    Pagination,
    FilterBar
  },
  data() {
    return {
      id: '',
      listLoading: false,
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      AppPowerConfig,
      AppPowerFilterConfig,
      list: [{
        moduleName: '系统管理',
        moduleUrl: '/system-mange',
        remark: '关于系统的控制'
      }, {
        moduleName: '视频监控',
        moduleUrl: '/video-mange',
        remark: '关于视频的监控'
      }, {
        moduleName: '大数据分析',
        moduleUrl: '/hadoop-mange',
        remark: '关于大数据分析'
      }],
      updateDisabled: true,
      deleteDisabled: true,
      createDialogVisible: false,
      editDialogVisible: false,
      selectData: []
    }
  },
  created() {
    this.__fetchData()
  },
  methods: {
    __fetchData() {
      this.total = this.list.length
    },
    selectionChange(_data) {
      this.selectData = _data
      if (this.selectData.length > 0) {
        this.deleteDisabled = false
        if (this.selectData.length == 1) {
          this.updateDisabled = false
        } else {
          this.updateDisabled = true
        }
      } else {
        this.deleteDisabled = true
        this.updateDisabled = true
      }
    },
    // 打开弹窗
    openDialog(name, row) {
      const visible = `${name}DialogVisible`
      this[visible] = true
      console.log(row)
      if (row) {
        // 如果有数据，更新子组件的 formData
        this.$refs.editDialog.updataForm(row)
      } else if (this.selectData.length == 1) {
        this.$refs.editDialog.updataForm(this.selectData[0])
      }
    },
    // 初始化新建窗口配置
    initCreateConfig() {
      const createConfig = Object.assign({
        title: '创建',
        width: '1000px',
        form: this.AppPowerConfig.columns
      })
      return createConfig
    },
    // 初始化编辑窗口配置
    initEditConfig() {
      const editConfig = Object.assign({
        title: '编辑',
        width: '1000px',
        form: this.AppPowerConfig.columns
      })
      return editConfig
    },
    deleteClick() {
      this.$message.success('删除成功')
    },
    synchroClick() {
      this.$message.success('同步成功')
    },
    queryData(search) {
      if (search) {
        this.$message.success('查询成功')
      } else {
        this.$message.info('请输入搜索内容')
      }
    },
    createSubmit() {
      this.createDialogVisible = false
      this.$message.success('新建成功')
    },
    editSubmit() {
      this.editDialogVisible = false
      this.$message.success('编辑成功')
    }
  }
}
</script>

<style lang="scss" scoped>
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
        width: 200px;
      }

      .el-button {
        display: inline-block;
        margin-left: 20px;
      }
    }
  }
</style>
