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
              <span>{{ recordData.area }}</span>
            </el-col>
            <el-col :span="12">
              <span class="info-tit">设备名称：</span>
              <span>{{ recordData.name }}</span>
            </el-col>
          </el-row>
          <el-row class="info-list">
            <el-col :span="12">
              <span class="info-tit">责任人员：</span>
              <span>{{ recordData.person }}</span>
            </el-col>
            <el-col :span="12">
              <span class="info-tit">检修周期：</span>
              <span>{{ recordData.period }}</span>
            </el-col>
          </el-row>
          <el-row class="info-list">
            <el-col :span="24">
              <span class="info-tit">维检内容：</span>
              <span>{{ recordData.maintain }}</span>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="record-item">
        <p class="record-item__title">设备检修记录明细</p>
        <div class="record-item__info">
          <el-timeline>
            <el-timeline-item
              v-for="(item,index) in recordData.records"
              :key="index"
              placement="top"
              :timestamp="item.dateTime"
              :color="item.complete ? '#0bbd87' : ''"
            >
              <el-card class="info-card">
                <b style="display:block">维检结果：{{ item.result }}</b>
                <p>{{ item.log }}</p>
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
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      recordData: {
        area: '中央区主井提升机房',
        name: '主电机碳刷',
        person: '管理员',
        period: '月',
        maintain: '请您及时人员对副井主电机碳刷完好情况进行检查',
        records: [
          {
            dateTime: '2021-02-01',
            complete: 1,
            result: '正常',
            log: '超级管理员于2021年02月12日0:00进行了检修，结果为正常'
          },
          {
            dateTime: '2021-01-21',
            complete: 1,
            result: '正常',
            log: '超级管理员于2021年02月12日0:00进行了检修，结果为正常'
          },
          {
            dateTime: '2021-01-21',
            complete: 1,
            result: '正常',
            log: '超级管理员于2021年02月12日0:00进行了检修，结果为正常'
          }
        ]
      }
    }
  },
  methods: {
    // 更新父组件 xxxxxDialogVisible 的值
    closeDialog() {
      this.$emit('close-dialog')
    },

    // 更新数据
    updataForm(data) {
      this.recordData = Object.assign(this.recordData, data)
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
