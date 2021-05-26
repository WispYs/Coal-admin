<template>
  <el-dialog
    title="设备台账信息"
    :visible.sync="dialogVisible"
    width="1000px"
    :before-close="closeDialog"
  >
    <div class="lifecycle-container">
      <div class="lifecycle-item">
        <p class="lifecycle-item__title">设备基础信息</p>
        <div class="lifecycle-item__info">
          <el-row class="info-list">
            <el-col :span="8">
              <span class="info-tit">设备类型：</span>
              <span>{{ lifecycleData.machineName }}</span>
            </el-col>
            <el-col :span="8">
              <span class="info-tit">规格型号：</span>
              <span>{{ lifecycleData.modelStd }}</span>
            </el-col>
            <el-col :span="8">
              <span class="info-tit">固定资产编码：</span>
              <span>{{ lifecycleData.assetsCode }}</span>
            </el-col>
          </el-row>
          <el-row class="info-list">

            <el-col :span="8">
              <span class="info-tit">生产厂家：</span>
              <span>{{ lifecycleData.procFactory }}</span>
            </el-col>
            <el-col :span="8">
              <span class="info-tit">出厂日期：</span>
              <span>{{ lifecycleData.outTime | parseTime }}</span>
            </el-col>
            <el-col :span="8">
              <span class="info-tit">计量单位：</span>
              <span>{{ lifecycleData.unit }}</span>
            </el-col>
          </el-row>

        </div>
      </div>
      <div class="lifecycle-item">
        <p class="lifecycle-item__title">设备生命周期</p>
        <div class="lifecycle-item__info">
          <el-tabs v-model="activeName" @tab-click="handleLifecycle">
            <el-tab-pane label="生命周期" name="cycle">
              <div style="padding:0 4px">
                <el-timeline>
                  <el-timeline-item
                    v-for="(item,index) in lifecycleData.dailys"
                    :key="index"
                    placement="top"
                    :timestamp="item.time | parseTime"
                    color="#0bbd87"
                  >
                    <el-card class="info-card">
                      <b style="display:block">{{ item.name }}</b>
                      <p>{{ item.currBy | formatDutyBy }}于 {{ item.time | parseTime('yyyy-MM-dd HH:mm:ss') }} {{ item.name }}了设备</p>
                    </el-card>
                  </el-timeline-item>
                </el-timeline>
              </div>

            </el-tab-pane>
            <template v-for="(it,index) in cycles">
              <el-tab-pane :key="index" :label="it.title" :name="it.name">
                <list-table
                  :list="list"
                  :list-loading="listLoading"
                  :config="it.config"
                />
                <pagination
                  :total="total"
                  :page.sync="listQuery.page"
                  :limit.sync="listQuery.pagerows"
                  @pagination="__fetchData"
                />
              </el-tab-pane>
            </template>
          </el-tabs>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer" />
  </el-dialog>

</template>
<script>
import { getVersalOutList, getVersalRecycleList, getWaitRepairList, getRepairList, getScrapList, getTransferList, getCheckList } from '@/api/mechatronics'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import { parseTime } from '@/utils'
import {
  ReceiveCycleTableConfig,
  RecycleCycleTableConfig,
  WaitRepairCycleTableConfig,
  RepairCycleTableConfig,
  ScrapCycleTableConfig,
  TurnCycleTableConfig,
  CheckCycleTableConfig
} from '@/data/mechatronics'

export default {
  components: { ListTable, Pagination },
  filters: {
    parseTime: (value, format) => {
      return parseTime(value, format)
    },
    formatResult: value => value ? '正常' : '异常',
    formatCycle: value => {
      const cycleMap = {
        '1': '年',
        '2': '月',
        '3': '周',
        '4': '日'
      }
      return cycleMap[value]
    },
    formatDutyBy: value => {
      const dutyByMap = {
        '1': '超级管理员',
        '2': '管理员',
        '3': '操作工',
        '4': '访客'
      }
      return dutyByMap[value]
    }
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      ReceiveCycleTableConfig,
      RecycleCycleTableConfig,
      WaitRepairCycleTableConfig,
      RepairCycleTableConfig,
      ScrapCycleTableConfig,
      TurnCycleTableConfig,
      CheckCycleTableConfig,
      cycles: [
        { name: 'receive', title: '领用', config: ReceiveCycleTableConfig, fn: getVersalOutList },
        { name: 'recycle', title: '回收', config: RecycleCycleTableConfig, fn: getVersalRecycleList },
        { name: 'waitRepair', title: '待修', config: WaitRepairCycleTableConfig, fn: getWaitRepairList },
        { name: 'repair', title: '维修', config: RepairCycleTableConfig, fn: getRepairList },
        { name: 'scrap', title: '报废', config: ScrapCycleTableConfig, fn: getScrapList },
        { name: 'turn', title: '移交', config: TurnCycleTableConfig, fn: getTransferList },
        { name: 'check', title: '查交', config: CheckCycleTableConfig, fn: getCheckList }
      ],
      activeName: 'cycle',
      fetchFn: null, // 获取各个生命周期数据方法
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      listLoading: true,
      lifecycleData: {
        machineName: '',
        dailys: []
      }
    }
  },
  methods: {
    // 获取各周期列表
    __fetchData() {
      this.listLoading = true
      // 传入设备ID
      const query = {
        ...this.listQuery,
        bnsId: this.lifecycleData.id
      }
      this.fetchFn(query).then(response => {
        this.listLoading = false
        this.list = response.data.rows
        this.total = Number(response.data.records)
      })
    },
    // 切换生命周期选项
    handleLifecycle(tab, event) {
      console.log(this.activeName)
      this.fetchFn = this.cycles.filter(it => it.name === this.activeName)[0].fn
      this.__fetchData()
    },
    // 更新父组件 xxxxxDialogVisible 的值
    closeDialog() {
      this.$emit('close-dialog')
    },

    // 更新数据
    updataForm(lifecycleData) {
      console.log(lifecycleData)
      this.activeName = 'cycle'
      if (lifecycleData) {
        this.lifecycleData = Object.assign(this.lifecycleData, lifecycleData)
      } else {
        this.lifecycleData = {
          machineName: '',
          dailys: []
        }
      }
    }

  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/theme.scss';
@import '~@/assets/styles/variables.scss';
.lifecycle-container {
  padding: 20px 30px;
  .lifecycle-item {
    margin-bottom: 20px;
    &__title {
      position: relative;
      margin-bottom: 10px;
      line-height: 20px;
      @include primaryColor($primaryColor);
      &::after {
        content: '';
        width: 3px;
        height: 16px;
        @include primaryBg($primaryColor);
        position: absolute;
        top: 2px;
        left: -8px;
      }
    }
    &__info {
      margin: 0;
      color: #121212;
      font-size: 13px;
      padding-left: 20px;
      .info-list {
        margin-bottom: 4px;
      }
      .info-tit {
        color: #999;
      }
      .info-card {
        font-size: 13px;
        b {
          @include primaryColor($primaryColor);
        }
      }
    }
    ::v-deep {
      .pagination-container {
        padding: 32px 16px 0;
      }
    }
  }
}

</style>
