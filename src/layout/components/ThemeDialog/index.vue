<template>
  <el-dialog
    class="theme-dialog"
    title="更换皮肤"
    width="500px"
    :visible.sync="dialogVisible"
    :before-close="closeDialog"
  >
    <div class="theme-dialog__container">
      <div
        v-for="(item,index) in colors"
        :key="index"
        :class="themeColor === item ? 'theme-color active' : 'theme-color'"
        @click="selectThemeColor(item)"
      >
        <span :class="`theme-color--${item}`" />
      </div>
    </div>
    <div class="theme-dialog__footer">
      <el-button @click="closeDialog">取消</el-button>
      <el-button type="primary" @click="submitForm">确认</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { getThemeColor } from '@/utils/theme-color'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      themeColor: getThemeColor() ? getThemeColor().split('-')[1] : 'blue',
      colors: ['blue', 'green']
    }
  },
  methods: {
    selectThemeColor(color) {
      this.themeColor = color
    },
    submitForm() {
      this.$emit('switch-theme', this.themeColor)
    },
    closeDialog() {
      this.themeColor = getThemeColor() ? getThemeColor().split('-')[1] : 'blue'
      this.$emit('close-dialog')
    }
  }
}
</script>
<style lang="scss">
  .theme-dialog {
    .el-dialog {
      height: auto !important;
      &__header {
        border-bottom: none !important;
      }
    }
    &__container {
      padding: 10px 40px;
      .theme-color {
        display: inline-block;
        margin: 0 10px;
        line-height: 20px;
        overflow: hidden;
        &.active {
          span {
            border: 3px solid #000;
          }
        }
        span {
          float: left;
          width: 60px;
          height: 25px;
          border-radius: 4px;
          cursor: pointer;

        }
        &--blue {
          background: #409EFF;
        }
        &--green {
          background: #67C23A;
        }
        &--orange {
          background: #E6A23C;
        }
        &--red {
          background: #F56C6C;
        }
        &--gray {
          background: #909399;
        }
      }
    }
    &__footer {
      padding: 10px 20px 20px;
      text-align: right;
    }
  }
</style>
