<template>
  <div class="page-container">
    <filter-bar :config="FilterConfig" @search-click="queryData" />
    <list-table :id="id" :list="list" :list-loading="listLoading" :config="TableConfig" />
    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pagerows" @pagination="__fetchData" />
  </div>
</template>

<script>
import {
 getLoginLogList,
 getOrganTree
} from '@/api/authority-management'
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import {
  TableConfig,
  FilterConfig
} from '@/data/login-log'

export default {
  components: {
    FilterBar,
    ListTable,
    Pagination
  },
  data() {
    return {
      id: 'table1',
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      filter: {}, // 筛选项
      listLoading: true,
      FilterConfig,
      TableConfig
    }
  },
  created() {
    console.log(this.FilterConfig);
    this.__fetchData()
    this.__OrganTree()
  },
  methods: {
    __OrganTree(){
      getOrganTree().then(response => {
        console.log(response);
        console.log(this.FilterConfig.filters);
        this.FilterConfig.filters.forEach(it => {
          if (it.field === 'sysDeptId') {
            it.options = response.data
          }
        })
        console.log(FilterConfig)
      })
    },
    // 获取数据
    __fetchData(_filter) {
      console.log(_filter);
      this.listLoading = true
      let query={
        entity: _filter,
        page: Number(this.listQuery.page),
        pagerows: Number(this.listQuery.pagerows)
      }
      getLoginLogList(query).then(response => {
        console.log(response);
        this.listLoading = false
        this.list = response.data.rows
        this.total = Number(response.data.records)
      })
    },
    dateConversion(data){
      var d = new Date(data);
      var datetime=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
      return datetime
    },
    // 查询数据
    queryData(value) {
      console.log(value);
      let serch = value
      if(!!serch.startDate){
        serch.startDate = this.dateConversion(serch.startDate)
      }
      if(!!serch.endDate){
        serch.endDate = this.dateConversion(serch.endDate)
      }
      let entity={
        sysDeptId: serch.sysDeptId,
        userName: serch.user,
        startTime: serch.startDate,
        endTime: serch.endDate
      }
      console.log(entity)
      this.__fetchData(entity)
    }
  }
}
</script>
