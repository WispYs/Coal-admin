<template>
  <el-dialog
    :title="progressData.title"
    :visible.sync="dialogVisible"
    width="600px"
    class="progress-dialog"
    :before-close="closeDialog"
  >
    <div class="progress-container">
      <div class="progress-item">
        <p class="progress-item__title">{{ progressData.name }}产量进度</p>
        <p class="progress-item__info">已采{{ progressData.yields }}万吨 / 资源存储量{{ progressData.yTotal }}万吨</p>
        <el-progress :text-inside="true" :stroke-width="26" :percentage="progressData.yPercent" />
      </div>
      <div class="progress-item">
        <p class="progress-item__title">{{ progressData.name }}推进度</p>
        <p class="progress-item__info">已完成{{ progressData.push }}米 / 工作面总长度{{ progressData.pTotal }}米</p>
        <el-progress :text-inside="true" :stroke-width="26" :percentage="progressData.pPercent" />
      </div>
      <div class="progress-item">
        <p class="progress-item__title">{{ progressData.name }}生命周期</p>
        <div class="block">
          <el-timeline>
            <el-timeline-item
              v-for="(item,index) in progressData.lifecycle"
              :key="index"
              placement="top"
              :timestamp="item.dateTime"
              :color="item.complete ? '#0bbd87' : ''"
            >
              <el-card>
                <span style="margin-right: 20px;"><b>事件：</b>{{ item.event }}</span>
                <span><b>说明：</b>{{ item.describe }}</span>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>

    </div>
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
        title: '工作面进度',
        name: ''
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
      this.progressData = Object.assign(this.progressData, data, {
        title: `${data.name}进度`,
        yPercent: this.computePercent(data.yields, data.yTotal),
        pPercent: this.computePercent(data.push, data.pTotal)
      })
    },

    // 计算百分比
    computePercent(a, b) {
      console.log(a, b)
      return Number((a / b * 100).toFixed(2))
    }
  }
}
</script>
<style lang="scss" scoped>
.progress-container {
  padding: 20px 60px;
  .progress-item {
    margin-bottom: 20px;
    &__title {
      margin: 10px 0;
      font-weight: bold;
    }
    &__info {
      margin: 0;
      text-align: right;
      font-size: 12px;
      font-weight: bold;
    }
  }
}

</style>
