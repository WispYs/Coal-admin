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
import { getServicePlanList, getDailyServiceInfo, createDailyService } from '@/api/mechatronics'
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
    // 初始化所属场所下拉框数据
    this.__updateEquipPlace()
    // 获取检修周期列表
    this.__updateServiceCycle()
  },
  methods: {
    // 初始化所属场所下拉框数据
    __updateEquipPlace() {
      this.$store.dispatch('mecha/getEquipPlaceList').then((data) => {
        const placeData = []
        data.forEach(it => {
          placeData.push({
            label: it.typeName,
            value: it.id + ''
          })
        })
        DailyServiceTableConfig.columns.forEach(it => {
          if (it.field === 'deviceTypeId') {
            it.options = placeData
          }
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    // 获取检修周期列表
    __updateServiceCycle() {
      // 数据字典 - 检修周期
      const parentId = 111339
      this.$store.dispatch('mecha/getDataDictionary', parentId).then((data) => {
        data.forEach(it => {
          it.value = it.dictValue
          it.label = it.dictName
        })
        DailyServiceTableConfig.columns.forEach(it => {
          if (it.field === 'cycle') {
            it.options = data
          }
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    __fetchData() {
      this.listLoading = true
      const filter = {
        ...this.filter,
        keywordField: ['belongPlace', 'deviceName']
      }
      const query = Object.assign(this.listQuery, filter)
      getServicePlanList(query).then(response => {
        this.listLoading = false
        response.data.rows.forEach(it => {
          it.createTime = parseTime(it.createTime)
          it.oveTime = parseTime(it.oveTime)
        })
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

    // 日常维检，维检记录按钮
    otherClick(row, index, item) {
      if (item === '日常维检') {
        const info = {
          overhaulPlanId: row.id,
          deviceTypeId: row.deviceTypeId,
          belongPlace: row.belongPlace,
          deviceName: row.deviceName
        }
        this.$refs.dailyService.updataForm(info)
        this.dailyServiceVisible = true
      } else if (item === '维检记录') {
        getDailyServiceInfo(row.id).then(response => {
          const info = Object.assign(response.data, {
            cycle: response.data.cycle + ''
          })
          this.$refs.serviceRecord.updataForm(info)
          this.serviceRecordVisible = true
        }).catch(err => {
          console.log(err)
        })
      }
    },

    // 日常维检提交
    dailyServiceSubmit(submitData) {
      createDailyService(submitData).then(response => {
        this.dailyServiceVisible = false
        this.$message.success('提交成功')
        this.$refs.dailyService.resetForm()
        this.__fetchData()
      }).catch(err => {
        console.log(err)
        this.$refs.dailyService.resetSubmitBtn()
      })
    }

  }
}
</script>
