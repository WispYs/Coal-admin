<template>
  <div style="width:100%height:100%">
    <div class="top-btn-wrapper">
      <span
        v-for="(item, idx) in config"
        :key="idx"
      >
        <span
          v-if="item.type === undefined"
          class="btn-item"
          @click="handleClick(item)"
        >
          <el-tooltip
            class="item"
            effect="dark"
            :content="
              item.status != undefined
                ? item.status
                  ? `关闭${item.name}`
                  : `打开${item.name}`
                : item.name
            "
            placement="bottom"
          >
            <i :class="item.icon" />
          </el-tooltip>
        </span>
        <el-select
          v-if="item.type === 'Select'"
          v-model="item.selectVal"
          class="switch"
          size="small"
          :placeholder="`切换${item.name}`"
          @change="item.selectFn"
        >
          <el-option
            v-for="op in item.options"
            :key="op.value"
            :label="op.label"
            :value="op.value"
          />
        </el-select>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    config: {
      type: Array,
      default: () => {}
    }
  },
  data() {
    return {
    }
  },
  methods: {
    // 重设顶部操作工具状态
    resetItem(arr = [], key) {
      let flag = false
      arr.forEach(item => {
        if (item.name === key) {
          flag = item.status = !item.status
        } else if (key !== '全屏') {
          if (item.status !== undefined && item.name !== '全屏') {
            item.status = false
          }
        }
      })
      return flag
    },
    handleClick(item) {
      if (item.status !== undefined) {
        const flag = this.resetItem(this.config, item.name)
        item.fn(flag)
      } else {
        item.fn()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';
@import '~@/assets/styles/theme.scss';
// input::-webkit-input-placeholder {
//   color: #fff;
// }
// input::-moz-input-placeholder {
//   color: #fff;
// }
// input::-ms-input-placeholder {
//   color: #fff;
// }
.top-btn-wrapper {
  position: absolute;
  z-index: 10;
  height: 32px;
  margin-left: 160px;
  @include primaryBg($primaryColor);
  // background: #5cadff;
  display: flex;
  align-items: center;
  top: 10px;
  right: 0;
  justify-content: flex-end;
  .btn-item {
    display: inline-block;
    width: 40px;
    text-align: center;
    color: #fff;
    cursor: pointer;
  }
  .switch {
    width: 120px;
    ::v-deep .el-input__inner {
      @include primaryBg($primaryColor);
      // background-color: #5cadff;
      border: none;
      color: #fff;
    }
    ::v-deep input::-webkit-input-placeholder {
      color: #fff !important;
    }
    ::v-deep i {
      color: #fff !important;
    }
  }
}
</style>
