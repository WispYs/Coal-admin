<template>
  <div class="app-container">
    <filter-bar :config="FilterConfig" @search-click="queryData" @reset-click="queryData" />
    <list-table :list="list" :list-loading="listLoading" :config="TableConfig" :filter-method="openStatusFilter" />
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

export default {
  components: { FilterBar, ListTable, Pagination },
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
    // 开启状态过滤器
    openStatusFilter(status) {
      return status ? '开启' : '关闭'
    }
  }
}
</script>
