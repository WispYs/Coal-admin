<template>
  <div class="page-container">
    <filter-bar
      :config="DailyServiceFilterConfig"
      @search-click="queryData"
      @reset-click="queryData"
    />
    <list-table
      :id="id"
      :list="list"
      :list-loading="listLoading"
      :config="DailyServiceTableConfig"
      height="calc(100% - 157px)"
      @other-click="otherClick"
    />
    <div v-show="total>0" class="page-bottom">
      <pagination
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.pagerows"
        @pagination="__fetchData"
      />
    </div>
    <!-- 日常维检 -->
    <daily-service
      ref="dailyService"
      :dialog-visible="dailyServiceVisible"
      @close-dialog="dailyServiceVisible = false"
      @submit="dailyServiceSubmit"
    />
    <!-- 维检记录 -->
    <service-record
      ref="serviceRecord"
      :dialog-visible="serviceRecordVisible"
      @close-dialog="serviceRecordVisible = false"
    />

  </div>
</template>

<script>
import { getDailyServiceList } from '@/api/mechatronics'
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import DailyService from './components/DailyService'
import ServiceRecord from './components/ServiceRecord'
import { DailyServiceTableConfig, DailyServiceFilterConfig } from '@/data/mechatronics'
import { parseTime } from '@/utils'

export default {
  components: { FilterBar, ListTable, Pagination, DailyService, ServiceRecord },
  data() {
    return {
      id: 'daily-service',
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      filter: {}, // 筛选项
      listLoading: true,
      DailyServiceFilterConfig,
      DailyServiceTableConfig,
      dailyServiceVisible: false, // 日常维检
      serviceRecordVisible: false // 维检记录

    }
  },

  created() {
    this.__fetchData()
  },
  methods: {
    __fetchData() {
      this.listLoading = true
      const entity = {
        ...this.filter
      }
      const query = Object.assign(this.listQuery, { entity })
      getDailyServiceList(query).then(response => {
        this.listLoading = false
        response.data.rows.forEach(it => {
          it.createTime = parseTime(it.createTime)
          it.oveTime = parseTime(it.oveTime)
          it.dutyBy = it.dutyBy + ''
          it.ccBy = it.ccBy + ''
        })
        this.list = response.data.rows
        this.total = Number(response.data.records)
      })
    },
    // 查询数据
    queryData(filter) {
      this.filter = Object.assign(this.filter, filter)
      this.__fetchData()
    },

    // 日常维检，维检记录按钮
    otherClick(row, index, item) {
      if (item === '日常维检') {
        const info = {
          id: row.id,
          area: row.area,
          deviceName: row.deviceName
        }
        this.$refs.dailyService.updataForm(info)
        this.dailyServiceVisible = true
      } else if (item === '维检记录') {
        this.$refs.serviceRecord.updataForm(row.id)
        this.serviceRecordVisible = true
      }
    },

    // 日常维检提交
    dailyServiceSubmit(submitData) {
      console.log(submitData)
      this.dailyServiceVisible = false
      this.$message.success('提交成功')
      // this.$refs.dailyService.resetForm()
    }

  }
}
</script>
