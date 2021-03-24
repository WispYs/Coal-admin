<template>
  <div style="width:100%height:100%">
    <div class="top-btn-wrapper">
      <span
        @click="item.fn"
        class="btn-item"
        v-for="(item, idx) in config"
        :key="idx"
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
          <i :class="item.icon"></i>
        </el-tooltip>
      </span>
      <el-select
        class="switch"
        size="small"
        v-model="value"
        placeholder="切换地图"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    config: Array
  },
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "煤综合图1"
        },
        {
          value: "选项2",
          label: "煤综合图2"
        },
        {
          value: "选项3",
          label: "煤综合图3"
        }
      ],
      value: ""
    };
  }
};
</script>

<style lang="scss" scoped>
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
  background: #5cadff;
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
      background-color: #5cadff;
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
