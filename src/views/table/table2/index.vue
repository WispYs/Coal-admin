<template>
  <div class="page-container">
    <filter-bar
      :config="FilterConfig"
      @search-click="queryData"
      @reset-click="queryData"
      @export-click="handelExport"
    />
    <list-table
      :id="id"
      :list="list"
      :list-loading="listLoading"
      :config="TableConfig"
      :filter-method="filterMethods"
    />
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.size"
      @pagination="__fetchData"
    />
  </div>
</template>

<script>
import { getList } from '@/api/table'
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import { TableConfig, FilterConfig } from '@/data/table2'
import exportExcel from '@/utils/export-excel'

export default {
  components: { FilterBar, ListTable, Pagination },
  data() {
    return {
      id: 'table2',
      list: null,
      total: 0,
      listQuery: {
        page: 1,
        size: 10
      },
      filter: {}, // 筛选项
      listLoading: true,
      FilterConfig,
      TableConfig
    }
  },
  created() {
    this.__fetchData()
  },
  methods: {
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

    // 定义导出Excel表格事件
    handelExport() {
      // 第一个参数为 table 的 id
      // 第二个参数为导出文件的 name
      exportExcel(this.id, 'excel-table2')
    },

    // 字段过滤方法
    filterMethods(name, str) {
      if (name === 'openStatusFilter') {
        // 设备开启状态
        return str ? '是' : '否'
      }
      // else if ...
    }
  }
}
</script>
