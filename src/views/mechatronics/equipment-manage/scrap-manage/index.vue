<template>
  <div class="page-container has-tree" :class="treeExtend ? 'open-tree' : 'close-tree'">
    <tree-bar
      ref="treeBar"
      :tree-data="treeData"
      :default-props="treeProp"
      @handleNodeClick="handleNodeClick"
    />

    <div class="tree-form-container">
      <span class="tree-extend-btn" @click="treeExtend = !treeExtend">
        <i :class="treeExtend ? 'el-icon-d-arrow-left': 'el-icon-d-arrow-right'" />
      </span>
      <filter-bar
        :config="ScrapManageFilterConfig"
        @search-click="queryData"
        @reset-click="queryData"
      />
      <!-- 表格 -->
      <list-table
        :id="id"
        :list="list"
        :list-loading="listLoading"
        :config="ScrapManageTableConfig"
        height="calc(100% - 157px)"
        @other-click="otherClick"
        @submit-data="scrapSubmit"
      />

      <div v-show="total>0" class="page-bottom">
        <pagination
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.pagerows"
          @pagination="__fetchData"
        />
      </div>

      <!-- 报废弹窗 -->
      <form-dialog
        ref="scrapDialog"
        :config="initScrapConfig()"
        :dialog-visible="scrapDialogVisible"
        @close-dialog="scrapDialogVisible = false"
        @submit="scrapSubmit"
      />
    </div>
  </div>
</template>

<script>
import { getUsingList, createScrap, delEquipmentService } from '@/api/mechatronics'
import TreeBar from '@/components/TreeBar'
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FormDialog from '@/components/FormDialog'
import { ScrapManageTableConfig, ScrapManageFilterConfig, ScrapTableConfig } from '@/data/mechatronics'
import { parseTime } from '@/utils'

export default {
  components: {
    TreeBar,
    FilterBar,
    ListTable,
    Pagination,
    FormDialog
  },
  data() {
    return {
      id: 'equipment-service',
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      filter: {}, // 筛选项
      listLoading: true,
      ScrapManageFilterConfig,
      ScrapManageTableConfig,
      ScrapTableConfig,
      scrapDialogVisible: false,
      treeExtend: true,
      treeData: {
        title: '选择设备类型',
        tId: 'id',
        list: []
      },
      treeProp: {
        children: 'children',
        label: 'typeName'
      },
      machineTypeId: '' //  设备类型id
    }
  },

  created() {
    this.__fetchData()
    this.__updateCategoryTree()
  },
  methods: {
    // 获取设备类型树结构列表
    __updateCategoryTree() {
      this.$store.dispatch('mecha/getCategoryList').then((data) => {
        this.treeData.list = [{
          id: '',
          typeName: '全部',
          children: data
        }]
        // 设置树结构默认选中项
        this.$refs.treeBar.setCurrentKey('')
      }).catch((err) => {
        console.log(err)
      })
    },
    __fetchData() {
      this.listLoading = true
      const filter = {
        ...this.filter,
        keywordField: ['machineName'],
        machineTypeId: this.machineTypeId
      }
      const query = Object.assign(this.listQuery, filter)
      getUsingList(query).then(response => {
        this.listLoading = false
        this.list = response.data.rows
        this.total = Number(response.data.records)
      })
    },
    // 查询数据
    queryData(filter) {
      this.filter = Object.assign(this.filter, filter)
      this.$set(this.listQuery, 'page', 1)
      this.__fetchData()
    },

    // 初始化报废窗口配置
    initScrapConfig() {
      const scrapConfig = Object.assign({
        title: '报废',
        width: '1000px',
        form: this.ScrapTableConfig.columns
      })
      return scrapConfig
    },

    // 报废按钮
    otherClick(row, index, item) {
      const info = {
        bnsId: row.id,
        machineName: row.machineName,
        modelStd: row.modelStd,
        assetsCode: row.assetsCode
      }
      this.$refs.scrapDialog.updataForm(info)
      this.scrapDialogVisible = true
    },

    // 报废
    scrapSubmit(submitData) {
      const query = Object.assign(submitData)
      createScrap(query).then(response => {
        this.scrapDialogVisible = false
        this.$message.success('报废成功')
        this.$refs.scrapDialog.resetForm()
        this.__fetchData()
      })
    },

    // 点击树形菜单时触发
    handleNodeClick(data) {
      this.machineTypeId = data.id
      this.queryData()
    }
  }
}
</script>
