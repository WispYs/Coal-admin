<template>
  <el-dialog
    title="三违详细信息"
    :visible.sync="dialogVisible"
    width="900px"
    :before-close="closeDialog"
  >
    <div class="service-progress-container">
      <div class="progress-item">
        <div class="progress-item__info">
          <el-row class="info-list">
            <el-col :span="8">
              <span class="info-tit">检查部门：</span>
              <span>{{ registerInfo.examineDept }}</span>
            </el-col>
            <el-col :span="8">
              <span class="info-tit">检查人员：</span>
              <span>{{ registerInfo.breakUserName }}</span>
            </el-col>
            <el-col :span="8">
              <span class="info-tit">检查班次：</span>
              <span>{{ registerInfo.examineShift }}</span>
            </el-col>
            <el-col :span="8">
              <span class="info-tit">违章日期：</span>
              <span>{{ registerInfo.examineTime }}</span>
            </el-col>
            <el-col :span="8">
              <span class="info-tit">违章地点：</span>
              <span>{{ registerInfo.examinePath }}</span>
            </el-col>
            <el-col :span="8">
              <span class="info-tit">责任单位：</span>
              <span>{{ registerInfo.unit }}</span>
            </el-col>
            <el-col :span="8">
              <span class="info-tit">违章人员：</span>
              <span>{{ registerInfo.breakUserName }}</span>
            </el-col>
            <el-col :span="8">
              <span class="info-tit">带班班长：</span>
              <span>{{ registerInfo.squadLeader }}</span>
            </el-col>
            <el-col :span="8">
              <span class="info-tit">带班区长：</span>
              <span>{{ registerInfo.wardenLeader }}</span>
            </el-col>
            <el-col :span="24">
              <span class="info-tit">违章违纪事实：</span>
              <span>{{ registerInfo.disciplinary }}</span>
            </el-col>
            <el-col :span="24">
              <span class="info-tit">严重级别：</span>
              <span>{{ registerInfo.grade }}</span>
            </el-col>
            <el-col :span="8">
              <span class="info-tit">处理结果：</span>
              <span>{{ registerInfo.disposeResult }}</span>
            </el-col>
            <el-col :span="8">
              <span class="info-tit">处罚扣分：</span>
              <span>{{ registerInfo.disposeDeduct }}</span>
            </el-col>
            <el-col :span="24">
              <span class="info-tit">备注：</span>
              <span>{{ registerInfo.remark }}</span>
            </el-col>
            <el-col :span="24">
              <span class="info-tit">附件：</span>
              <span>{{ registerInfo.eventId }}</span>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
    </span>
  </el-dialog>

</template>
<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    registerInfo:{
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      
    }
  },
  methods: {
    // 更新父组件 xxxxxDialogVisible 的值
    closeDialog() {
      this.$emit('close-dialog')
    }
  }
}
</script>
<style lang="scss" scoped>
  .service-progress-container{
    width: calc(100% - 100px);
    margin: 30px auto;
    .info-list{
      .el-col{
        padding: 10px 0
      }
    }
  }
// @import '~@/assets/styles/theme.scss';
// @import '~@/assets/styles/variables.scss';
// .service-progress-container {
//   padding: 20px 30px;
//   .progress-item {
//     margin-bottom: 20px;
//     &__title {
//       position: relative;
//       margin-bottom: 10px;
//       line-height: 20px;
//       @include primaryColor($primaryColor);
//       &::after {
//         content: '';
//         width: 3px;
//         height: 16px;
//         @include primaryBg($primaryColor);
//         position: absolute;
//         top: 2px;
//         left: -8px;
//       }
//     }
//     &__info {
//       margin: 0;
//       color: #121212;
//       font-size: 13px;
//       padding-left: 20px;
//       .info-list {
//         margin-bottom: 4px;
//       }
//       .info-tit {
//         color: #999;
//       }
//       .info-card {
//         font-size: 13px;
//         b {
//           @include primaryColor($primaryColor);
//         }
//       }
//     }
//   }
// }

</style>
