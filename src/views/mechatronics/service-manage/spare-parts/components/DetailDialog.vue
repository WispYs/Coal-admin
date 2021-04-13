<template>
  <el-dialog
    title="操作明细"
    :visible.sync="dialogVisible"
    width="800px"
    :before-close="closeDialog"
  >
    <div class="spare-detail-container">
      <el-tabs v-model="detailActive">
        <el-tab-pane label="领用信息" name="receive">
          <div class="detail-item">
            <div class="detail-item__info">
              <el-timeline>
                <el-timeline-item
                  v-for="(item,index) in detailData.receives"
                  :key="index"
                  placement="top"
                  :timestamp="item.dateTime"
                  :color="item.complete ? '#0bbd87' : ''"
                >
                  <el-card class="info-card">
                    <b style="display:block">领用</b>
                    <p>{{ item.log }}</p>
                  </el-card>
                </el-timeline-item>
              </el-timeline>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="入库信息" name="store">
          <div class="detail-item">
            <div class="detail-item__info">
              <el-timeline>
                <el-timeline-item
                  v-for="(item,index) in detailData.store"
                  :key="index"
                  placement="top"
                  :timestamp="item.dateTime"
                  :color="item.complete ? '#0bbd87' : ''"
                >
                  <el-card class="info-card">
                    <b style="display:block">入库</b>
                    <p>{{ item.log }}</p>
                  </el-card>
                </el-timeline-item>
              </el-timeline>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>

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
      detailActive: 'receive',
      detailData: {
        area: '中央区主井提升机房',
        name: '主电机碳刷',
        fault: '主电机设备出现异常',
        condition: '请您及时对主电机进行检查',
        time: '2021-03-12 14:41:45',
        receives: [
          {
            dateTime: '2021-02-01',
            complete: 1,
            log: '超级管理员于2021年02月12日0:00领用了交流器'
          },
          {
            dateTime: '2021-01-21',
            complete: 1,
            log: '超级管理员于2021年02月12日0:00领用了交流器'
          }
        ],
        store: [
          {
            dateTime: '2021-02-01',
            complete: 1,
            log: '超级管理员于2021年02月12日0:00入库了压风机'
          },
          {
            dateTime: '2021-01-21',
            complete: 1,
            log: '超级管理员于2021年02月12日0:00入库了压风机'
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
      this.detailData = Object.assign(this.detailData, data)
    }

  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/theme.scss';
@import '~@/assets/styles/variables.scss';
.spare-detail-container {
  padding: 20px 30px;
  .detail-item {
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
