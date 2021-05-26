<template>
  <el-dialog
    :title="progressData.title"
    :visible.sync="dialogVisible"
    width="1000px"
    class="progress-dialog"
    :before-close="closeDialog"
  >
    <div class="progress-container">
      <div class="progress-item">
        <p class="progress-item__title">{{ progressData.gzmName }}产量进度</p>
        <p class="progress-item__info">已采{{ progressData.outputProcess }}万吨 / 资源存储量{{ progressData.resourceReserve }}万吨</p>
        <el-progress :text-inside="true" :stroke-width="26" :percentage="progressData.yPercent" />
      </div>
      <div class="progress-item">
        <p class="progress-item__title">{{ progressData.gzmName }}推进度</p>
        <p class="progress-item__info">已完成{{ progressData.pushProcess }}米 / 工作面总长度{{ progressData.gzmLength }}米</p>
        <el-progress :text-inside="true" :stroke-width="26" :percentage="progressData.pPercent" />
      </div>
      <div class="progress-item">
        <p class="progress-item__title">{{ progressData.gzmName }}生命周期</p>
        <el-timeline>
          <el-timeline-item
            v-for="(item,index) in progressData.list"
            :key="index"
            placement="top"
            :timestamp="item.undergoDate"
            :color="item.complete ? '' : '#0bbd87'"
          >
            <el-card>
              <span style="margin-right: 20px;"><b>事件：</b>{{ item.incident }}</span>
              <span><b>说明：</b>{{ item.illustrate }}</span>
            </el-card>
          </el-timeline-item>
        </el-timeline>
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
        title: `${data.gzmName}进度`,
        yPercent: this.computePercent(data.outputProcess, data.resourceReserve),
        pPercent: this.computePercent(data.pushProcess, data.gzmLength)
      })
    },

    // 计算百分比
    computePercent(a, b) {
      let value
      if(a == 0 | b == 0){
        value = 0
      }else{
        value = Number((a / b * 100).toFixed(2))
      }
      return value
    }
  }
}
</script>
<style lang="scss" scoped>
.progress-container {
  padding: 30px 60px;
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
