<template>
  <div class="app-container">
    <filter-bar />
    <list-table :list="list" :list-loading="listLoading" />
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.size"
      @pagination="__fetchData"
    />
    <create-dialog />
    <editor-dialog />
  </div>
</template>

<script>
import { getList } from '@/api/table'
import FilterBar from './components/FilterBar'
import ListTable from './components/ListTable'
import Pagination from '@/components/Pagination'
import CreateDialog from './components/CreateDialog'
import EditorDialog from './components/EditorDialog'

export default {
  components: { FilterBar, ListTable, Pagination, CreateDialog, EditorDialog },
  data() {
    return {
      list: null,
      total: 0,
      listQuery: {
        page: 1,
        size: 10
      },
      listLoading: true
    }
  },
  created() {
    this.__fetchData()
  },
  methods: {
    __fetchData() {
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
