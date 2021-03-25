<template>
  <div class="page-container">
    <filter-bar :config="ActionFilterConfig" @search-click="queryData" />
    <list-table :id="id" :list="list" :list-loading="listLoading" :config="ActionTableConfig" />
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.size"
      @pagination="__fetchData" />
  </div>
</template>

<script>
  // import {
  //   getList
  // } from '@/api/table'
  import FilterBar from '@/components/FilterBar'
  import ListTable from '@/components/ListTable'
  import Pagination from '@/components/Pagination'
  import {
    ActionTableConfig,
    ActionFilterConfig
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
        list: [{
          department: '费宇翔',
          operationUser: '顾桥煤矿',
          operationModule: 'feiyuxiag',
          operationContent: '192.168.1.1',
          operationTime: '2021-3-22 16:40'
        }, {
          department: '费宇翔',
          operationUser: '顾桥煤矿',
          operationModule: 'feiyuxiag',
          operationContent: '192.168.1.1',
          operationTime: '2021-3-22 16:40'
        }, {
          department: '费宇翔',
          operationUser: '顾桥煤矿',
          operationModule: 'feiyuxiag',
          operationContent: '192.168.1.1',
          operationTime: '2021-3-22 16:40'
        }, {
          department: '费宇翔',
          operationUser: '顾桥煤矿',
          operationModule: 'feiyuxiag',
          operationContent: '192.168.1.1',
          operationTime: '2021-3-22 16:40'
        }],
        total: 0,
        listQuery: {
          page: 1,
          size: 10
        },
        filter: {}, // 筛选项
        listLoading: true,
        ActionFilterConfig,
        ActionTableConfig
      }
    },
    created() {
      this.__fetchData();
    },
    methods: {
      // 获取数据
      __fetchData() {
        this.listLoading = true
        // const query = Object.assign(this.listQuery, this.filter)
        // console.log(query);
        // getList(query).then(response => {
        //   this.listLoading = false
        //   this.list = response.data.items
        //   console.log(this.list);
        //   this.total = response.data.total
        // })
        this.listLoading = false
        this.total = this.list.length;
      },
      // 查询数据
      queryData(filter) {
        this.filter = Object.assign(this.filter, filter)
        // console.log(this.filter);
      }
    }
  }
</script>
