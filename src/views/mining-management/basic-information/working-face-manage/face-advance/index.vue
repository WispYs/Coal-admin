<template>
  <el-dialog
    :title="formData.face + '工作面进度'"
    :visible.sync="dialogVisible"
    width="1000px"
    class="operation-file-dialog"
    :before-close="closeDialog"
  >
    <div class="face-content">
      <div class="face-schedule">
        <h3>{{ formData.face }}工作面产量进度</h3>
        <p>已采{{ formData.coalMining }}万吨/资源存储量{{ formData.resourceStorage }}万吨</p>
        <el-progress :text-inside="true" :stroke-width="26" :percentage="formData.yieldSchedule" />
      </div>
      <div class="face-schedule">
        <h3>{{ formData.face }}工作面推进度</h3>
        <p>已完成{{ formData.advance }}米/工作面总长度{{ formData.totalLength }}米</p>
        <el-progress :text-inside="true" :stroke-width="26" :percentage="formData.pushing" />
      </div>
      <div class="face-schedule">
        <h3 class="lifeCycle">{{ formData.face }}工作面生命周期</h3>
        <el-timeline v-for="(item,index) in formData.lifeCycle" v-if="formData.lifeCycle.length > 0">
          <el-timeline-item :timestamp="item.undergoDate" :color="formData.color" placement="top">
            <el-card style="position: relative;">
              <div style="margin-bottom: 10px;">
                <span>事件:</span><span> {{ item.incident }}</span>
              </div>
              <div>
                <span>说明:</span><span> {{ item.illustrate }}</span>
              </div>
              <i class="el-icon-right" style="font-size: 36px;position: absolute;top:50%;margin-top: -18px;color: #ccc;right: 5%;" @click="seeFile" />
            </el-card>
          </el-timeline-item>
        </el-timeline>
        <el-timeline v-if="formData.lifeCycle.length == 0">
          <el-card style="position: relative;">
            暂无
          </el-card>
        </el-timeline>
      </div>
    </div>
  </el-dialog>

</template>
<script>
export default {
  components: {},
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    formData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      color: '#009688'
    }
  },
  created() {},
  methods: {
    // 更新父组件 xxxxxDialogVisible 的值
    closeDialog() {
      this.$emit('close-dialog')
    },
    seeFile() {
      this.$message.info('敬请期待')
    }
  }
}
</script>
<style lang="scss" scoped>
  .face-content{
    width: calc(100% - 200px);
    margin:20px auto;
    .face-schedule{
      margin-bottom: 20px;
      p{
        float: right;
      }
      .lifeCycle{
        margin-bottom: 20px;
      }
    }
  }
</style>
