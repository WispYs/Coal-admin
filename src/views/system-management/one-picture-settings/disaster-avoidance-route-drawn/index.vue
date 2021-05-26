<template>
  <div
    v-loading.lock="gisLoading"
    element-loading-text="加载中"
    element-loading-spinner="el-icon-loading"
    class="page-container"
  >
    <TopBar
      v-if="!gisLoading"
      :config="topConfig"
      :options="gisMaps"
      @handleChange="mapChange"
    />

    <div id="gis-wrapper" class="gis-wrapper" />
  </div>
</template>

<script>
import TopBar from '@/components/TopBar'
import { gisMixin } from '@/mixin/gis'
export default {
  // 避灾路线绘制
  name: 'DisasterAvoidanceRouteDrawn',
  components: { TopBar },
  mixins: [gisMixin],
  data() {
    return {
      addAddrDialogVisible: false,
      gisMaps: [
        {
          value: '0',
          label: '煤综合图1'
        },
        {
          value: '1',
          label: '煤综合图2'
        },
        {
          value: '2',
          label: '煤综合图3'
        }
      ],
      topConfig: [
        {
          name: '添加避灾路线',
          fn: this.addRoute,
          icon: 'el-icon-wind-power'
        },
        {
          name: '隐藏所有',
          fn: this.hideAll,
          icon: 'el-icon-magic-stick'
        },
        {
          name: '显示所有',
          fn: this.showAll,
          icon: 'el-icon-view'
        },
        {
          name: '图纸',
          type: 'Select',
          selectVal: '',
          selectFn: this.mapChange,
          options: [
            {
              value: '0',
              label: '煤综合图1'
            },
            {
              value: '1',
              label: '煤综合图2'
            },
            {
              value: '2',
              label: '煤综合图3'
            }
          ]
        }
      ],
      selectedMap: '',
      gisLoading: true
    }
  },
  methods: {
    __fetchData() {

    },
    // 改变地图
    mapChange() {

    },
    // 添加避灾路线
    addRoute() {
    },
    // 隐藏所有
    hideAll() {
    },
    // 显示所有
    showAll() {},
    // 初始化Dialog
    initOperationConfig() {
      const operationConfig = Object.assign({
        title: '添加地点',
        width: '500px',
        labelWidth: '130px',
        form: this.AddAddrDialogConfig.columns
      })
      return operationConfig
    },
    addAddrSubmit() {}
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  padding: 0 !important;
  .drawer {
      width: 260px;
      height: 546px;
      position: absolute;
      top: 12px;
      left: 12px;
      overflow: auto;
      border: 1px solid #ccc;
      ::v-deep.el-drawer__header {
        margin-bottom: 10px;
        border-bottom: 1px solid #000;
        padding: 10px 0;
        text-align: center;
      }
  }
  .gis-wrapper {
    width: 100%;
    height: 100%;
  }
}

</style>
