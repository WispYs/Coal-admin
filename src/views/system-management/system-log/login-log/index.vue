<template>
  <div class="page-container">
    <filter-bar :config="FilterConfig" @search-click="queryData" />
    <list-table :id="id" :list="list" :list-loading="listLoading" :config="TableConfig" />
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pagerows" @pagination="__fetchData" />
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
      list: [{
        uesr: '费宇翔',
        department: '顾桥煤矿',
        loginaNme: 'feiyuxiag',
        ipSource: '192.168.1.1',
        loginStart: '2021-3-22 16:40',
        loginEnd: '2021-3-22 17:40',
        loginMode: 'pc端'
      }, {
        uesr: '徐成华',
        department: '顾桥煤矿',
        loginaNme: 'xuchenghua',
        ipSource: '192.168.1.1',
        loginStart: '2021-3-22 16:40',
        loginEnd: '2021-3-22 17:40',
        loginMode: '移动端'
      }, {
        uesr: '超级管理员',
        department: '顾桥煤矿',
        loginaNme: 'cahoji',
        ipSource: '192.168.1.1',
        loginStart: '2021-3-22 16:40',
        loginEnd: '2021-3-22 17:40',
        loginMode: '移动端'
      }, {
        uesr: '刘泽如',
        department: '顾桥煤矿',
        loginaNme: 'liuzeru',
        ipSource: '192.168.1.1',
        loginStart: '2021-3-22 16:40',
        loginEnd: '2021-3-22 17:40',
        loginMode: 'pc端'
      }],
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
    queryData(date_time, filter) {
      // var d = new Date(filter.startDate);
      // var datetime=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
      console.log(filter)
      this.filter = Object.assign(this.filter, filter)
      console.log(this.filter)
      if (!!this.filter.department || !!this.filter.user || !!this.filter.startDate || !!this.filter.endDate) {
        this.$message({
          message: '恭喜你，搜索成功',
          type: 'success'
        })
      } else {
        this.$message.error('请输入搜索内容')
      }
    }
  }
}
</script>
