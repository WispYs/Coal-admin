<template>
  <div class="page-container">
    <filter-bar :config="ActionFilterConfig" @search-click="queryData" />
    <list-table :id="id" :list="list" :list-loading="listLoading" :config="ActionTableConfig" />
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.pagerows"
      @pagination="__fetchData"
    />
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
        department: '顾桥煤矿',
        operationUser: '张三',
        operationModule: '角色管理',
        operationContent: '添加角色',
        operationTime: '2021-3-22 16:40'
      }, {
        department: '调度一所科直',
        operationUser: '赵四',
        operationModule: '角色管理',
        operationContent: '删除1个角色',
        operationTime: '2021-3-22 16:40'
      }, {
        department: '调度一所队直',
        operationUser: '王武',
        operationModule: '角色管理',
        operationContent: '修改角色',
        operationTime: '2021-3-22 16:40'
      }, {
        department: '顾桥煤矿',
        operationUser: '李三',
        operationModule: '角色管理',
        operationContent: '查看角色详情',
        operationTime: '2021-3-22 16:40'
      }],
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      filter: {}, // 筛选项
      listLoading: true,
      ActionFilterConfig,
      ActionTableConfig
    }
  },
  created() {
    this.__fetchData()
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
      this.total = this.list.length
    },
    // 查询数据
    queryData(data_time, filter) {
      this.filter = Object.assign(this.filter, filter)
      console.log(this.filter)
      if (!!this.filter.department || this.filter.user || this.filter.endDate || this.filter.startDate) {
        this.$message({
          message: '恭喜你，搜索成功',
          type: 'success'
        })
      } else {
        this.$message.error('请输入搜索内容')
      }
      // console.log(this.filter);
    }
  }
}
</script>
