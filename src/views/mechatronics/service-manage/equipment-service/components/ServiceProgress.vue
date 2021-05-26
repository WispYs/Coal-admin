<template>
  <el-dialog
    title="进展记录"
    :visible.sync="dialogVisible"
    width="600px"
    :before-close="closeDialog"
  >
    <div class="service-progress-container">
      <div class="progress-item">
        <p class="progress-item__title">设备故障基础信息</p>
        <div class="progress-item__info">
          <el-row class="info-list">
            <el-col :span="12">
              <span class="info-tit">所属场所：</span>
              <span>{{ progressData.belongPlace }}</span>
            </el-col>
            <el-col :span="12">
              <span class="info-tit">设备名称：</span>
              <span>{{ progressData.deviceName }}</span>
            </el-col>
          </el-row>
          <el-row class="info-list">
            <el-col :span="12">
              <span class="info-tit">故障主题：</span>
              <span>{{ progressData.faultTheme }}</span>
            </el-col>
            <el-col :span="12">
              <span class="info-tit">故障情况：</span>
              <span>{{ progressData.situation }}</span>
            </el-col>
          </el-row>
          <el-row class="info-list">
            <el-col :span="24">
              <span class="info-tit">故障发生时间：</span>
              <span>{{ progressData.occurTime }}</span>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="progress-item">
        <p class="progress-item__title">设备维修流程明细</p>
        <div class="progress-item__info">
          <el-timeline>
            <el-timeline-item
              v-for="(item,index) in progressData.daily"
              :key="index"
              placement="top"
              :timestamp="item.dateTime"
              :color="item.complete ? '#0bbd87' : ''"
            >
              <el-card class="info-card">
                <b style="display:block">处理结果：{{ item.result }}</b>
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
      progressData: {

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
      this.progressData = Object.assign(this.progressData, data)
    }

  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/theme.scss';
@import '~@/assets/styles/variables.scss';
.service-progress-container {
  padding: 20px 30px;
  .progress-item {
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
