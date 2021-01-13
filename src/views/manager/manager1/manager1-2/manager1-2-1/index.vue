<template>
  <div class="app-container">
    <filter-bar />
    <list-table :list="list" :list-loading="listLoading" :config="ProductConfig" />
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.size"
      @pagination="fetchData"
    />
  </div>
</template>

<script>
import { getList } from '@/api/table'
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import ProductConfig from '@/data/product-config'

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
      listLoading: true,
      ProductConfig
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
        this.total = response.data.total
      })
    }
  }
}
</script>
