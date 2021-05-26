<template>
  <el-dialog
    title="设备检修记录"
    :visible.sync="dialogVisible"
    width="600px"
    :before-close="closeDialog"
  >
    <div class="service-record-container">
      <div class="record-item">
        <p class="record-item__title">设备维检基础信息</p>
        <div class="record-item__info">
          <el-row class="info-list">
            <el-col :span="12">
              <span class="info-tit">所属场所：</span>
              <span>{{ recordData.belongPlace }}</span>
            </el-col>
            <el-col :span="12">
              <span class="info-tit">设备名称：</span>
              <span>{{ recordData.deviceName }}</span>
            </el-col>
          </el-row>
          <el-row class="info-list">
            <el-col :span="12">
              <span class="info-tit">责任人员：</span>
              <span>{{ recordData.dutyBy | formatDutyBy }}</span>
            </el-col>
            <el-col :span="12">
              <span class="info-tit">检修周期：</span>
              <span>{{ formatCycle(recordData.cycle) }}</span>
            </el-col>
          </el-row>
          <el-row class="info-list">
            <el-col :span="24">
              <span class="info-tit">维检内容：</span>
              <span>{{ recordData.maintContent }}</span>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="record-item">
        <p class="record-item__title">设备检修记录明细</p>
        <div class="record-item__info">
          <el-timeline>
            <el-timeline-item
              v-for="(item,index) in recordData.dailys"
              :key="index"
              placement="top"
              :timestamp="item.oveTime | parseTime"
              color="#0bbd87"
            >
              <el-card class="info-card">
                <b style="display:block">维检结果：{{ item.oveResult | formatResult }}</b>
                <p>{{ item.createdBy | formatDutyBy }}于 {{ item.oveTime | parseTimeHMS }} 进行了维检，检修结果为{{ item.oveResult | formatResult }}</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </div>

      </div>

    </div>
    <span slot="footer" class="dialog-footer" />
  </el-dialog>

</template>
<script>
import { parseTime } from '@/utils'

export default {
  filters: {
    parseTime,
    parseTimeHMS: value => {
      return parseTime(value, 'yyyy-MM-dd HH:mm:ss')
    },
    formatResult: value => value ? '正常' : '异常',
    // formatCycle: value => {
    //   const cycleMap = {
    //     '1': '年',
    //     '2': '月',
    //     '3': '周',
    //     '4': '日'
    //   }
    //   return cycleMap[value]
    // },
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
      cycleMap: {},
      recordData: {
        belongPlace: '',
        dailys: []
      }
    }
  },
  created() {
    this.__updateCycleMap()
  },
  methods: {
    // 获取检修周期列表
    __updateCycleMap() {
      // 数据字典 - 检修周期
      const parentId = 111339
      this.$store.dispatch('mecha/getDataDictionary', parentId).then((data) => {
        data.forEach(it => {
          this.cycleMap[it.dictValue] = it.dictName
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    // 格式化检修周期
    formatCycle(val) {
      return this.cycleMap[val]
    },
    // 更新父组件 xxxxxDialogVisible 的值
    closeDialog() {
      this.$emit('close-dialog')
    },

    // 更新数据
    updataForm(recordData) {
      console.log(recordData)
      if (recordData) {
        this.recordData = Object.assign(this.recordData, recordData)
      } else {
        this.recordData = {
          belongPlace: '',
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
.service-record-container {
  padding: 20px 30px;
  .record-item {
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
  }
}

</style>
