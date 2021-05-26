<template>
  <div>
    <el-dialog
      :title="progressData.title"
      :visible.sync="dialogVisible"
      width="900px"
      class="progress-dialog"
      :before-close="closeDialog"
    >
      <div v-if="dialogVisible" class="progress-container">
        <div class="progress-item">
          <p class="progress-item__title">{{ progressData.tunnelName }}推进度</p>
          <p class="progress-item__info">已完成{{ progressData.tunnelProcess }}米 / 工作面总长度{{ progressData.designerLength }}米</p>
          <el-progress :text-inside="true" :stroke-width="26" :percentage="progressData.pPercent" />
        </div>
        <div class="progress-item">
          <p class="progress-item__title">{{ progressData.tunnelName }}生命周期</p>
          <el-timeline v-if="progressData.list.length > 0">
            <el-timeline-item
              v-for="(item,index) in progressData.list"
              :key="index"
              placement="top"
              :timestamp="item.undergoDate"
              :color="item.complete ? '' : '#0bbd87'"
            >
              <el-card>
                <span class="event_title"><b>事件：</b>{{ item.incident }}</span>
                <span><b>说明：</b>{{ item.illustrate }}</span>
                <i class="el-icon-right arrow_item" @click="seeFile" />
              </el-card>
            </el-timeline-item>
          </el-timeline>
          <el-timeline v-else>
            <el-card>
              暂无
            </el-card>
          </el-timeline>
        </div>
      </div>
    </el-dialog>
    <face-file
      ref="fileDialog"
      :dialog-visible="fileDialogVisible"
      @close-dialog="fileDialogVisible = false"
    />
  </div>
</template>
<script>
import FaceFile from '../face-file/operationFile.vue'
export default {
  components: { FaceFile },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      progressData: {
        title: '巷道进度',
        name: ''
      },
      fileDialogVisible: false
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
        title: `${data.tunnelName}进度`,
        pPercent: this.computePercent(data.tunnelProcess, data.designerLength)
      })
    },

    // 计算百分比
    computePercent(a, b) {
      console.log(a, b)
      let value
      if (a == 0 | b == 0) {
        value = 0
      } else {
        value = Number((a / b * 100).toFixed(2))
      }
      return value
    },
    seeFile() {
      this.fileDialogVisible = true
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
    .el-card{
      .event_title{
        margin-right: 20px;
      }
      .arrow_item{
        font-size: 30px;
        float: right;
        margin:-4px 30px 0 0;
        color: #ccc;
      }
    }
  }
}

</style>
