<template>
  <div style="width:100%height:100%">
    <div class="top-btn-wrapper">
      <span
        v-for="(item, idx) in config"
        :key="idx"
        class="btn-item"
        @click="item.fn"
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
        v-model="defaultMap"
        class="switch"
        size="small"
        placeholder="切换地图"
        @change="handleChange"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    config: {
      type: Array,
      default: () => {}
    },
    options: {
      type: Array,
      default: () => {}
    }
  },
  data() {
    return {
      defaultMap: '0'
    }
  },
  methods: {
    handleChange(selectedVal) {
      this.$emit('handleChange', selectedVal)
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
