<template>
  <div
    v-loading.lock="gisLoading"
    element-loading-text="加载中"
    element-loading-spinner="el-icon-loading"
    class="page-container"
  >
    <el-drawer
      v-show="!gisLoading"
      ref="drawer"
      :visible.sync="drawer"
      direction="ltr"
      :modal="false"
      :with-header="false"
      :wrapper-closable="false"
      class="drawer"
      size="100%"
    >
      <tree-select
        ref="treeSelect"
        v-model="treeSelectVal"
        class="tree-select"
        :value="treeSelectVal"
        placeholder="请选择实体类型"
        :options="sysEntityType"
        :clearable="false"
        :accordion="false"
        @tree-select="value => getTreeSelect(value)"
      />

      <el-table
        :data="addrTableData"
        style="width: 100%"
        height="420"
      >
        <el-table-column
          v-for="(colum,idx) in AddrTableConfig.columns"
          :key="idx"
          :prop="colum.value"
          :label="colum.label"
          :width="colum.width || 80"
        />
        <el-table-column
          fixed="right"
          label="操作"
          width="100"
        >
          <template slot-scope="scope">
            <el-button v-if="scope.row.x && scope.row.z" icon="el-icon-location-outline" type="text" size="medium" @click="locationByPos(scope.row)">坐标定位</el-button>
            <el-button v-if="scope.row.x && scope.row.z" icon="el-icon-location-outline" type="text" size="medium" @click="location(scope.row)">相机定位</el-button>
            <el-button v-else icon="el-icon-location-information" type="text" size="medium" @click="bindPoint(scope.row)">绑点</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <div class="page-bottom">
        <pagination
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.pagerows"
          :small="true"
          layout="prev, pager, next"
          @pagination="__fetchData"
        />
      </div> -->
    </el-drawer>
    <TopBar
      v-if="!gisLoading"
      :config="topConfig"
      :options="gisMaps"
    />

    <!-- 操作弹窗 -->
    <form-dialog
      ref="addAddrDialog"
      :config="initOperationConfig()"
      :dialog-visible="addAddrDialogVisible"
      @close-dialog="closeAddrDialog"
      @submit="addAddrSubmit"
    />
    <div id="gis-wrapper" class="gis-wrapper" />
  </div>
</template>

<script>
import TreeSelect from '@/components/TreeSelect'
import Pagination from '@/components/Pagination'
import FormDialog from '@/components/FormDialog'
import TopBar from '@/components/TopBar'
import { gisMixin } from '@/mixin/gis'
import { AddrTableConfig, EntitySetTableConfig } from '@/data/one-picture-settings'
import { getSysEntityTypeTree, saveObject, updateObject, getSysEntityList } from '@/api/one-picture-settings'
import { selectWorkFacetList, selectTunnelList } from '@/api/mining-management'
export default {
  // 属性设置
  name: 'EntitySet',
  components: { Pagination, TopBar, FormDialog, TreeSelect },
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
          name: '面板',
          status: true,
          fn: () => { this.drawer = !this.drawer },
          icon: 'el-icon-s-order'
        },
        // {
        //   name: '添加地点',
        //   fn: () => { this.addAddrDialogVisible = true },
        //   icon: 'el-icon-map-location'
        // },
        {
          name: '添加标记',
          fn: this.addAddr,
          icon: 'el-icon-add-location'
        },
        {
          name: '添加多边形',
          fn: this.addPolygon,
          icon: 'el-icon-edit-outline'
        },
        {
          name: '添加line',
          fn: this.addLine,
          icon: 'el-icon-edit'
        },
        {
          name: '图纸',
          type: 'Select',
          selectVal: '',
          selectFn: this.mapChange,
          options: [
            {
              value: '645396a5-2cf8-496d-b328-f1bcf2c4b3c9',
              label: '一通三防图纸2021年3月A（井下巷道图纸）'
            },
            {
              value: '3621f4e9-66fe-4708-94c1-4c5d08e133b9',
              label: '规划总平面图G(1)_加单位'
            },
            {
              value: '77b4621d-d89d-45d4-a66d-7b5be1c938f8',
              label: 'KKK'
            }
          ]
        },
        {
          name: '点位组',
          type: 'Select',
          selectVal: '',
          selectFn: this.groupChange,
          options: [
            {
              value: '0',
              label: '点位1'
            },
            {
              value: '1',
              label: '点位2'
            },
            {
              value: '2',
              label: '点位3'
            }
          ]
        }
      ],
      selectedMap: '',
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      gisLoading: true,
      drawer: true,
      AddrTableConfig,
      EntitySetTableConfig,
      addrTableData: [
        // {
        //   no: '1',
        //   label: '上海市普陀区金沙江路 1518 弄'
        // }
      ],
      point: null,
      treeSelectVal: '',
      sysEntityType: []
    }
  },
  mounted() {
    this.__updateTreeData()
  },
  methods: {
    // 获取数据
    async __fetchData(val = '') {
      const res = await getSysEntityList(val)
      this.clearAllAnchorpoint()
      res.data.forEach((r, idx) => {
        const { x, y, z } = r
        if (x && y && z) {
          const point = this.setPosPoint({ x, y, z })
          point.viewpointIcon.addEventListener('click', () => {
            this.addAddrDialogVisible = true
            this.$nextTick(() => {
              this.$refs.addAddrDialog.updataForm(r)
            })
          })
        }
        r.no = idx + 1
        r.label = r.entityName
      })
      this.addrTableData = res.data
    },
    // 更新下拉、树数据
    async __updateTreeData() {
      const sysEntityTypeTree = await getSysEntityTypeTree()
      const workFacetList = await selectWorkFacetList()
      const tunnelList = await selectTunnelList()
      this.sysEntityType = sysEntityTypeTree.data
      EntitySetTableConfig.columns.forEach(it => {
        if (it.field === 'sysEntityTypeId') {
          it.options = sysEntityTypeTree.data
        }
        if (it.field === 'gzmName') {
          it.options = workFacetList.data
        }
        if (it.field === 'tunnelName') {
          it.options = tunnelList.data
        }
      })
    },
    // 改变地图
    mapChange(map) {
      // this.models = [map]
      console.log(map)
    },
    // 改变点位组
    groupChange(group) {
      console.log(group)
    },
    // 添加地点
    addAddr() {
      __GIS__dom.addEventListener('click', this.locationFn)
    },
    // 添加多边形
    addPolygon() {

    },
    // 添加锚点
    locationFn(e) {
      this.addAddrDialogVisible = true
      const p = this.setClickPoint(e)
      const obj = {
        shapeType: 'marker',
        id: p.id,
        cameraInfo: JSON.stringify(p.cameraInfo),
        ...p.position
      }
      this.$refs.addAddrDialog.updataForm(obj)
      __GIS__dom.removeEventListener('click', this.locationFn)
    },
    // 添加线
    addLine() {},
    // 初始化Dialog
    initOperationConfig() {
      const operationConfig = Object.assign({
        title: '添加地点',
        width: '1000px',
        labelWidth: '130px',
        form: this.EntitySetTableConfig.columns
      })
      return operationConfig
    },
    // 添加点提交
    addAddrSubmit(submitData) {
      saveObject(submitData, 'sysEntity').then(res => {
        console.log('addAddrSubmit', res)
        this.__fetchData(submitData.sysEntityTypeId)
        this.treeSelectVal = submitData.sysEntityTypeId
        this.addAddrDialogVisible = false
        this.$message.success('新建成功')
        this.$refs.addAddrDialog.resetForm()
      })
    },
    // 更新点提交
    updateAddrSubmit(submitData) {
      updateObject(submitData, 'sysEntity').then(res => {
        this.__fetchData(submitData.sysEntityTypeId)
        this.treeSelectVal = submitData.sysEntityTypeId
      })
    },
    // 定位指定元素
    location(item) {
      console.log('zoomItem', item)
      const { x, y, z, cameraInfo } = item
      this.closeCluster()
      // __GIS__api.Context.zoomToTarget({
      //   x: Number(x),
      //   y: Number(y),
      //   z: Number(z)
      // })
      __GIS__api.Context.setViewPointBasicInfo(JSON.parse(cameraInfo))
    },
    // 通过坐标定位
    locationByPos(item) {
      const { x, y, z, cameraInfo } = item
      this.closeCluster()
      __GIS__api.Context.zoomToTarget({
        x: Number(x),
        y: Number(y),
        z: Number(z)
      })
    },
    // 绑点
    bindPoint(point) {
      this.point = point
      __GIS__dom.addEventListener('click', this.bindFn)
    },
    // 绑定锚点
    bindFn(e) {
      let p = this.setClickPoint(e)
      p = Object.assign(this.point, p.position)
      console.log(p)
      // this.updateAddrSubmit(p)
      this.point = null
      __GIS__dom.removeEventListener('click', this.bindFn)
    },
    // 选择树节点
    getTreeSelect(value, field) {
      console.log('getTreeSelect', value)
      this.__fetchData(value)
    },
    // 关闭锚点信息窗口
    closeAddrDialog() {
      if (this.$refs.addAddrDialog.formData.id) {
        this.clearAnchorPointById(this.$refs.addAddrDialog.formData.id)
      }
      this.addAddrDialogVisible = false
    }

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
      .tree-select {
        margin: 10px;
      }
  }
  .gis-wrapper {
    width: 100%;
    height: 100%;
  }
}

</style>
