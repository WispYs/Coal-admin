<template>
  <el-dialog
    title="操作明细"
    :visible.sync="dialogVisible"
    width="1000px"
    :before-close="closeDialog"
  >
    <div class="spare-detail-container">
      <el-tabs v-model="detailActive">
        <el-tab-pane label="领用信息" name="receive">
          <div v-loading="detailLoading" class="detail-item">
            <div class="detail-item__info">
              <el-timeline>
                <el-timeline-item
                  v-for="(item,index) in detailData"
                  :key="index"
                  placement="top"
                  :timestamp="item.pickTime | parseTime"
                  color="#0bbd87"
                >
                  <el-card class="info-card">
                    <b style="display:block">领用</b>
                    <p>{{ item.pickBy | formatDutyBy }}领用了{{ item.pickNum }}个</p>
                  </el-card>
                </el-timeline-item>
              </el-timeline>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="入库信息" name="store">
          <div v-loading="detailLoading" class="detail-item">
            <div class="detail-item__info">
              <el-timeline>
                <el-timeline-item
                  v-for="(item,index) in detailData"
                  :key="index"
                  placement="top"
                  :timestamp="item.storageTime | parseTime"
                  color="#0bbd87"
                >
                  <el-card class="info-card">
                    <b style="display:block">入库</b>
                    <p>{{ item.storageBy | formatDutyBy }}领用了{{ item.storageNum }}个</p>
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
import { getSpareReceiveList, getSpareStoreList } from '@/api/mechatronics'
import { parseTime } from '@/utils'

export default {
  filters: {
    parseTime,
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
      id: '',
      detailLoading: false,
      detailActive: 'receive',
      detailData: {}
    }
  },
  watch: {
    detailActive(val) {
      if (val === 'receive') {
        this.__fetchSpareReceiveList()
      } else if (val === 'store') {
        this.__fetchSpareStoreList()
      }
    }

  },
  mounted() {
    this.__fetchSpareReceiveList()
  },
  methods: {
    // 获取领用明细列表
    __fetchSpareReceiveList() {
      this.detailLoading = true
      getSpareReceiveList({ sparePartsId: this.id }).then(response => {
        this.detailLoading = false
        this.detailData = response.data.rows
      })
    },
    // 获取入库明细列表
    __fetchSpareStoreList() {
      getSpareStoreList({ sparePartsId: this.id }).then(response => {
        this.detailData = response.data.rows
      })
    },
    // 更新父组件 xxxxxDialogVisible 的值
    closeDialog() {
      this.detailData = {}
      this.detailActive = 'receive'
      this.$emit('close-dialog')
    },

    // 更新数据
    updataForm(id) {
      this.id = id
      this.__fetchSpareReceiveList()
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
