<template>
  <div
    v-loading.lock="gisLoading"
    element-loading-text="加载中"
    element-loading-spinner="el-icon-loading"
    class="gis-container"
  >
    <TopBar
      v-if="!gisLoading"
      :config="topConfig"
      :options="gisMaps"
      @handleChange="mapChange"
    />

    <div v-if="!gisLoading" class="side-wrapper">
      <div class="left-side-wrapper">
        <el-button class="side-item" type="primary" @click="openDrawer('jsDrawer', $event)">检索</el-button>
        <el-button class="side-item" type="primary" @click="openDrawer('zhDrawer', $event)">综合</el-button>
        <el-button class="side-item" type="primary">地测</el-button>
        <el-button class="side-item" type="primary">生产</el-button>
        <el-button class="side-item" type="primary">通防</el-button>
        <el-button class="side-item" type="primary">机电</el-button>
        <el-button class="side-item" type="primary">安全</el-button>
        <el-button class="side-item" type="primary">应急</el-button>
        <el-button class="side-item" type="primary">监测</el-button>
        <el-drawer
          ref="jsDrawer"
          title="检索"
          :visible.sync="jsDrawer"
          direction="ltr"
          :modal="false"
          :show-close="false"
          :wrapper-closable="false"
          class="drawer"
          size="100%"
        >
          <div class="drawer-wrapper">
            <el-input v-model="searchValue" placeholder="请输入内容" size="small" class="input-with-select">
              <el-select slot="prepend" v-model="searchSelected" size="small" placeholder="全部">
                <el-option label="井巷项目" value="1" />
                <el-option label="订单号" value="2" />
                <el-option label="矿金深度" value="3" />
              </el-select>
              <template slot="append">
                <el-button size="small" icon="el-icon-search" />
              </template>
            </el-input>
            <div class="js-tools-wrapper">
              <span class="js-tools">
                <img class="js-tools-img" src="//www.baidu.com/img/flexible/logo/pc/result@2.png" alt="">
                预警报警
              </span>
              <span class="js-tools">
                <img class="js-tools-img" src="//www.baidu.com/img/flexible/logo/pc/result@2.png" alt="">
                工作面
              </span>
              <span class="js-tools">
                <img class="js-tools-img" src="//www.baidu.com/img/flexible/logo/pc/result@2.png" alt="">
                安全监测
              </span>
              <span class="js-tools">
                <img class="js-tools-img" src="//www.baidu.com/img/flexible/logo/pc/result@2.png" alt="">
                人员定位
              </span>
            </div>
            <el-divider />

            <div class="js-quick-tools-wrapper">
              <span>
                <img class="js-tools-img" src="//www.baidu.com/img/flexible/logo/pc/result@2.png" alt="">
                钻孔
              </span>
              <span>
                <img class="js-tools-img" src="//www.baidu.com/img/flexible/logo/pc/result@2.png" alt="">
                自动化
              </span>
              <span>
                <img class="js-tools-img" src="//www.baidu.com/img/flexible/logo/pc/result@2.png" alt="">
                突水点
              </span>
              <span>
                <img class="js-tools-img" src="//www.baidu.com/img/flexible/logo/pc/result@2.png" alt="">
                设备
              </span>
            </div>
          </div>
        </el-drawer>

        <el-drawer
          ref="zhDrawer"
          title="综合一张图"
          :visible.sync="zhDrawer"
          direction="ltr"
          :modal="false"
          :show-close="false"
          :wrapper-closable="false"
          class="drawer"
          size="100%"
        >
          <div>
            <h3 style="text-align: center;">矿井安全生产中</h3>
            <div style="text-align: right;margin:10px 0;">
              <el-button type="primary" size="mini" round>二三维联动</el-button>
            </div>
            <p>当前矿井在采工作面4个，在掘工作面36个</p>
          </div>
          <el-tabs v-model="activeName">
            <el-tab-pane label="工作面" name="first">
              <el-input v-model="aqzkSearch" size="small" placeholder="请输入内容">
                <el-select slot="prepend" v-model="gzmSelected" size="small" placeholder="类型">
                  <el-option
                    v-for="item in gzmOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
                <el-button slot="append" icon="el-icon-search" />
              </el-input>
            </el-tab-pane>
            <el-tab-pane label="安全状况" name="second">
              <div style="margin-top: 15px;">
                <el-input v-model="aqzkSearch" size="small" placeholder="请输入内容">
                  <el-button slot="append" icon="el-icon-search" />
                </el-input>
              </div>
              <el-divider />
              <div class="list-item-wrapper">
                <div v-for="(it, idx) in dataList" :key="idx" class="list-item">
                  <img class="js-tools-img" src="//www.baidu.com/img/flexible/logo/pc/result@2.png" alt="">
                  1126(工作面)
                  <div class="work-wrapper">
                    <el-tag effect="dark" size="mini" type="info">重大隐患0</el-tag>&nbsp;
                    <el-tag effect="dark" size="mini" type="info">红线三违0</el-tag>&nbsp;
                    <el-tag effect="dark" size="mini" type="info">重大风险0</el-tag>
                    <el-button
                      size="mini"
                      type="primary"
                      icon="el-icon-location-outline"
                      round
                      @click="zoomElement(it)"
                    >定位</el-button>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="自动化" name="third">自动化</el-tab-pane>
            <el-tab-pane label="设备管理" name="fourth">设备管理</el-tab-pane>
            <el-tab-pane label="安全监测" name="five">安全监测</el-tab-pane>
            <el-tab-pane label="人员定位" name="six">人员定位</el-tab-pane>
            <el-tab-pane label="工业视频" name="seven">工业视频</el-tab-pane>
          </el-tabs>
        </el-drawer>
      </div>
      <div class="right-side-wrapper">
        <el-checkbox-group v-model="selecedtPaper" class="paper-wrapper">
          <el-checkbox-button
            v-for="paper in papers"
            :key="paper"
            :label="paper"
          >{{ paper }}</el-checkbox-button>
        </el-checkbox-group>
      </div>
    </div>

    <div id="gis-wrapper" class="gis-wrapper" />

    <el-dialog title="添加锚点信息" :visible.sync="locationVisible" width="30%">
      <span>
        <el-form class="location-form" label-width="80px">
          <el-form-item label="类型">
            <el-select v-model="type" placeholder="请选择类型">
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="设备">
            <el-select v-model="device" placeholder="请选择设备">
              <el-option
                v-for="item in deviceOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="locationVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveLocation">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog :title="dlgTitle" :visible.sync="outerVisible">
      <div style="padding: 15px; line-height: 22px;font-size: 15px;" v-html="dlgData" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false">关 闭</el-button>
      </div>
    </el-dialog>

    <el-popover
      ref="vedioPopover"
      v-model="videoVisible"
      title="视频"
      width="200"
      trigger="manual"
      content="这是视频区域"
    />
  </div>
</template>
<script>
import TopBar from '@/components/TopBar'
import { getViewPoint, getPointInfo, getAllViews } from '@/api/gis'
import { PointIcon } from '@/config/gis-config'
import { gisMixin } from '@/mixin/gis'
export default {
  components: { TopBar },
  mixins: [gisMixin],
  data() {
    return {
      papers: [
        '综合一张图',
        '地测一张图',
        '生产一张图',
        '通防一张图',
        '机电一张图',
        '安全一张图',
        '应急一张图',
        '监测一张图'
      ],
      selecedtPaper: [
        '综合一张图',
        '地测一张图',
        '生产一张图',
        '通防一张图',
        '机电一张图',
        '安全一张图',
        '应急一张图',
        '监测一张图'
      ],
      locationVisible: false, // 添加锚点选择框
      aqzkSearch: '',
      gzmSelected: '',
      gzmOptions: [
        {
          value: '选项1',
          label: '黄金糕'
        }
      ],
      type: '',
      // 添加锚点信息框 类型选项
      typeOptions: [
        {
          value: '选项1',
          label: '设备'
        }
      ],
      device: '',
      // 添加锚点信息框 设备选项
      deviceOptions: [
        {
          value: '选项1',
          label: '设备一'
        }
      ],
      activeName: 'second',
      searchSelected: '',
      searchValue: '', // 检索
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
          name: '添加锚点',
          fn: this.location,
          icon: 'el-icon-add-location'
        },
        // {
        //   name: '新建工作面',
        //   fn: this.addPolygon,
        //   icon: 'el-icon-edit'
        // },
        {
          name: '测距',
          status: false,
          fn: this.measureLong,
          icon: 'el-icon-edit'
        },
        {
          name: '测面积',
          status: false,
          fn: this.measureArea,
          icon: 'el-icon-edit-outline'
        },
        {
          name: '清除',
          fn: this.measureClear,
          icon: 'el-icon-refresh-left'
        },
        {
          name: '全屏',
          status: false,
          fn: this.fullScreen,
          icon: 'el-icon-full-screen'
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
      jsDrawer: false,
      zhDrawer: false,
      outerVisible: false,
      dlgTitle: '详情',
      pos: 0,
      dlgData: '',
      name: [
        '激光甲烷',
        '钻孔',
        '工作面',
        ' 无极绳绞车',
        '掘进机',
        '回风巷粉尘',
        '中央区主井提升机房',
        ''
      ],
      maps: ['综合', '地测', '生产', '通防', '机电', '安全', '应急', '监测'],
      dataList: [], // 锚点数据
      viewPointData: [], // 视点数据
      gisLoading: true,
      videoVisible: false, // 视频显示区域
      pointMock: [
        {
          x: 1502.2999774239113,
          y: 0,
          z: -1138.5787307895425
        },
        {
          x: 1514.0699233819114,
          y: 0,
          z: -1105.071159520949
        }, {
          x: 1553.1964768403564,
          y: 0,
          z: -1088.9438697438889
        }
      ]
    }
  },
  mounted() {
    window._this = this
    this.dataList = []
    console.log(this.$route.meta.title)
    for (var i = 0; i < this.maps.length; i++) {
      if (this.$route.meta.title.indexOf(this.maps[i]) > -1) {
        this.pos = i
      }
    }
  },
  methods: {
    gisMounted() {
      this.__fetchViewPoint()
    },
    // gis更新事件
    gisUpdate(ev) {
      // this.addScale()
      if (this.videoVisible) this.videoVisible = false
    },
    // 获取所有锚点信息
    async __fetchViewPoint() {
      // const points = await getViewPoint()
      // this.viewPointData = points.data.records
      // this.setPosPoint(this.viewPointData)
      // this.openCluster()
      const res = await getViewPoint()
      this.clearAllAnchorpoint()
      this.viewPointData = res.data.records
      res.data.records.forEach((r, idx) => {
        const { x, y, z } = r
        if (x && y && z) {
          const point = this.setPosPoint({ x, y, z })
          // point.viewpointIcon.addEventListener('click', () => {
          //   this.addAddrDialogVisible = true
          //   this.$nextTick(() => {
          //     this.$refs.addAddrDialog.updataForm(r)
          //   })
          // })
        }
      })
      // this.setPoint(this.viewPointData)
      console.log('dataList', this.dataList)
    },

    // 点击锚点获取详情
    __fetchPointInfo(id) {
      getPointInfo(id).then(response => {
        // const viewPointInfo = response.data
        const { name, id, type, addr, num, currDate } = { ...response.data }
        this.dlgTitle = `${name}详情`
        this.dlgData = `设备编号：${id}<br/>` +
                      `传感器类型：${type}<br/>` +
                      `安装地点：${addr}<br/>` +
                      `实时值：${num}<br/>` +
                      `单位：%CH4<br/>` +
                      `状态：正常<br/>` +
                      `监测时间：${currDate}`
      })
    },
    // 地图改变
    mapChange(selectedVal) {
      console.log('selectedVal', selectedVal)
    },
    // 获取所有视图
    getAllViews() {
      getAllViews(bim_config.model).then(res => {
        console.log(res)
      })
    },
    // 打开侧边栏
    openDrawer(ref, ev) {
      const drawers = ['jsDrawer', 'zhDrawer']
      for (let i = 0; i < drawers.length; i++) {
        if (drawers[i] === ref) {
          this[ref] = !this[ref]
        } else {
          this[drawers[i]] = false
        }
      }
      // const el = this.$refs[ref].$el
      // const target = ev.currentTarget.getBoundingClientRect()
      // el.style.left = `${target.left + 74}px`;
      // el.style.top = `${target.top}px`;
      // el.style.left = '80px'
      // el.style.top = '16.075px'
      // el.style.position = 'absolute'
    },
    // 添加工作面
    addPolygon() {
      const canvas = __GIS__dom
      // 初始化
      __GIS__api.Extension.Markup.initMarkup()
      // 开启编辑模式
      __GIS__api.Extension.Markup.beginEditMode(canvas.offsetWidth, canvas.offsetHeight)
      // 绘制自由路径线
      __GIS__api.Extension.Markup.activePathAndSetParam()
      // 获取当前图形数据
      const data = __GIS__api.Extension.Markup.serialize()

      const activecamera = __GIS__api.Context.getActiveCamera()
      const { position, rotation } = activecamera.position
      const camera = JSON.stringify({ position, rotation })

      console.log('camera: ' + camera, 'data: ' + data)
    },
    // 添加锚点
    locationFn(e) {
      const dt = this.setClickPoint(e)
      console.log(dt)

      document.getElementById(dt.id).addEventListener('click', this.addEvent)
      this.locationVisible = true
    },
    // 锚点标记
    location() {
      __GIS__dom.addEventListener('click', this.locationFn)
    },
    // 保存锚点信息
    saveLocation() {
      this.locationVisible = false
      __GIS__dom.removeEventListener('click', this.locationFn)
    },
    // 定位指定元素
    zoomElement(item) {
      console.log('zoomItem', item)
      // const pos = this.dataList[1]['position']
      __GIS__api.Context.zoomToTarget(item.position)
      const style = this.$refs.vedioPopover.$el.style
      const { position, top, left, zIndex } = item.viewpointIcon.style
      style.position = position
      style.top = `${parseInt(top) + 20}px`
      style.left = `${parseInt(left) + 20}px`
      style.zIndex = zIndex
      this.videoVisible = true
      // __GIS__api.Controller.zoomElementByElementId(item.id)
    },
    // 添加比例尺
    addScale() {
      const w = document.querySelector('#gis-wrapper').clientWidth
      const h = document.querySelector('#gis-wrapper').clientHeight
      const scale = __GIS__api.Utility.pixelToDistance(100, w, h)
      console.log('scale', scale)
      // gisContext.gisControl.addScaleControl();
    },
    addMeasure() {
      // 监听测量结果 长度单位是米，面积单位是平方米
      // gisContext.measure2d.measureResult.on("default", e => {
      //   console.log(e);
      // });
    },
    // 测距
    measureLong(flag) {
      this.setAllPointDisable()
      flag
        ? __GIS__api.Extension.Measure.activeLengthMeasure()
        : __GIS__api.Extension.Measure.deActiveLengthMeasure()
      // gisContext.measure2d.measureDistance();
    },
    // 测面积
    measureArea(flag) {
      this.setAllPointDisable()
      if (flag) {
        this.$message.success('按ESC关闭测绘线')
        __GIS__api.Extension.Measure.activeMeasureArea()
      } else {
        __GIS__api.Extension.Measure.deActiveMeasureArea()
        // this.measureClear()
      }
      // gisContext.measure2d.measureArea();
    },
    addEvent(e, a) {
      // console.dir(e)
      this.clickPoint(e.currentTarget.id)
    },
    randomPos() {
      return Math.random() * 100
    },
    randomNum() {
      return parseInt(Math.random() * 100)
    },
    randomAdd() {
      return Math.random() * 10000 > 5000
    },
    setPoint(viewPointData) {
      viewPointData.forEach(it => {
        const pos = {
          x: it.x,
          y: it.y,
          z: it.z
        }
        it.a = this.randomNum()
        it.b = this.randomNum()
        it.c = this.randomNum()
        it.d = this.randomNum()
        it.e = this.randomNum()
        // console.log(pos)
        // console.log('viewPoint', it)
        this.closeCluster()
        const data = __GIS__api.Extension.Point.addAnchorPointByPosition(pos, PointIcon)
        this.openCluster()
        this.dataList.push(data)
        console.log(data)
        // 闪烁指定构件
        // __GIS__api.Controller.flashElements(elementid)
      })
      // for (var i = 1; i < 3; i++) {
      //   var dt = JSON.parse(JSON.stringify(ctl))
      //   dt.name += '(' + i + ')'
      //   dt.viewID = parseInt(dt.viewID) + i + ''
      //   dt.id = this.randomPos() + ''
      //   dt.modelID = this.randomPos() + ''
      //   dt.viewpointInfo.ModelID = dt.modelID
      //   dt.viewpointInfo.ID = dt.id
      //   dt.viewpointInfo.ViewID = dt.viewID
      //   // let inf=JSON.parse(dt.override)
      //   const pos = JSON.parse(JSON.stringify(controlPostion))
      //   if (this.randomAdd()) pos.x += this.randomPos()
      //   else pos.x -= this.randomPos()
      //   if (this.randomAdd()) pos.z += this.randomPos()
      //   else pos.z -= this.randomPos()
      //   pos.y = 0
      //   delete dt.override
      //   delete dt.viewpointInfo.Override

      //   dt.x = pos.x
      //   dt.y = pos.z
      //   dt.a = this.randomNum()
      //   dt.b = this.randomNum()
      //   dt.c = this.randomNum()
      //   dt.d = this.randomNum()
      //   dt.e = this.randomNum()
      //   console.log(pos)
      //   console.log(dt)

      //   const data = model.BIM365API.Extension.Point.addAnchorPointByPosition(
      //     pos,
      //     'http://www.probim.cn:8088/bimexample/img/point.png',
      //     dt
      //   )
      //   window._this.dataList.push(data)
      // }
    },
    clickPoint(id) {
      const clickPoint = this.dataList.find(it => it.id === id)
      console.log('clickPoint', clickPoint)
      clickPoint && this.__fetchPointInfo(clickPoint.id)

      // var data = {}
      // for (var i = 0; i < this.dataList.length; i++) { if (this.dataList[i].id == id) data = this.dataList[i] }
      // console.log(data)
      // this.dlgTitle = data.data.name + '详情'
      // data = data.data
      // if (this.pos == 0) {
      //   this.dlgData =
      //     '传感器编号：340' +
      //     data.id.replace('.', '') +
      //     '<br/>' +
      //     '传感器类型：激光甲烷<br/>' +
      //     '安装地点：中区11-2采区煤层回风T回<br/>' +
      //     '实时值：' +
      //     this.randomNum() +
      //     '<br/>' +
      //     '单位：%CH4<br/>' +
      //     '状态：正常<br/>' +
      //     '监测时间：' +
      //     new Date()
      // } else if (this.pos == 1) {
      //   this.dlgData =
      //     '勘探线：十南线<br/>' +
      //     'X：' +
      //     data.x +
      //     '<br/>' +
      //     'Y：' +
      //     data.y +
      //     '<br/>' +
      //     '孔口标高(m)：' +
      //     data.a +
      //     '<br/>' +
      //     '施工日期：2011.8.29-2020.2.12<br/>' +
      //     '施工机组：' +
      //     data.b +
      //     '<br/>' +
      //     '新地层厚度：' +
      //     data.c +
      //     '<br/>' +
      //     '终孔深度：' +
      //     data.d +
      //     '<br/>' +
      //     '钻探级别：甲<br/>' +
      //     '测井级别：甲<br/>' +
      //     '综合级别：甲<br/>' +
      //     '穿过层位： 25～13-1/11-2～6-2/4-2～1～C31 DF30 H=40m F97 H=10～15m<br/>' +
      //     '终孔歪斜：3°36′<br/>' +
      //     '方位角：' +
      //     data.e +
      //     '°<br/>' +
      //     '最大歪斜：3°36′<br/>'
      // } else if (this.pos == 2) {
      //   this.dlgData =
      //     '设计长度（m）：' +
      //     data.a +
      //     '<br/>' +
      //     '工作面长度（m）：' +
      //     data.b +
      //     '<br/>' +
      //     '采高（m）：3.8<br/>' +
      //     '煤层视密度（t /m3）：0<br/>' +
      //     '可采储量（预期）：' +
      //     data.c +
      //     '<br/>' +
      //     '采煤工艺：综采<br/>' +
      //     '采深（m）：-' +
      //     data.d +
      //     '<br/>' +
      //     '编号：1<br/>' +
      //     '出厂日期：2008-1-12<br/>' +
      //     '出厂编号：<br/>' +
      //     '防爆证号：<br/>' +
      //     '煤安证号：<br/>' +
      //     '电压等级：<br/>' +
      //     '资产类型：自有<br/>' +
      //     '状态：在用'
      // } else if (this.pos == 3) {
      //   this.dlgData =
      //     '编号：' +
      //     data.id.replace('.', '') +
      //     '<br/>' +
      //     '粉尘1.5毫克/立方米正常<br/>' +
      //     '当前矿井在采工作面4个，在掘工作面' +
      //     data.a +
      //     '个；井下作业人员' +
      //     data.b +
      //     '人，中央区' +
      //     data.c +
      //     '人，南区' +
      //     data.d +
      //     '人；存在重大风险0个，重大隐患0个，发生红线三违0个；主要设备运转发生故障0处。<br/>' +
      //     '厂家：常州科研试制中心有限公司<br/>' +
      //     '领用人：王龙<br/>' +
      //     '使用单位：综采三队<br/>' +
      //     '领用时间：2018-02-27<br/>' +
      //     '使用地点：1213（1）运顺<br/>' +
      //     '型号：SQ-90 / 132K'
      // } else if (this.pos == 4) {
      //   this.dlgData =
      //     '编号：' +
      //     data.id.replace('.', '') +
      //     '<br/>' +
      //     '状态：正常<br/>' +
      //     '厂家：常州科研试制中心有限公司<br/>' +
      //     '领用人：王龙<br/>' +
      //     '使用单位：综采三队<br/>' +
      //     '领用时间：2018-02-27<br/>' +
      //     '使用地点：1213（1）运顺<br/>' +
      //     '型号：SQ-90 / 132K'
      // } else if (this.pos == 5) {
      //   this.dlgData =
      //     '传感器编号：' +
      //     data.id.replace('.', '') +
      //     '<br/>' +
      //     '当前矿井在采工作面4个，在掘工作面' +
      //     data.a +
      //     '个；井下作业人员' +
      //     data.b +
      //     '人，中央区' +
      //     data.c +
      //     '人，南区' +
      //     data.d +
      //     '人；存在重大风险0个，重大隐患0个，发生红线三违0个；主要设备运转发生故障0处。<br/>' +
      //     '传感器类型：粉尘<br/>' +
      //     '安装地点：东一边界回风巷粉尘<br/>' +
      //     '实时值：1.2<br/>' +
      //     '单位：mg / m3<br/>' +
      //     '状态：正常'
      // } else if (this.pos == 6) {
      //   this.dlgData =
      //     '传感器编号：' +
      //     data.id.replace('.', '') +
      //     '<br/>' +
      //     '当前矿井在采工作面4个，在掘工作面' +
      //     data.a +
      //     '个；井下作业人员' +
      //     data.b +
      //     '人，中央区' +
      //     data.c +
      //     '人，南区' +
      //     data.d +
      //     '人；存在重大风险0个，重大隐患0个，发生红线三违0个；主要设备运转发生故障0处。<br/>' +
      //     '重大风险（0）<br/>' +
      //     '潜在风险（0）<br/>' +
      //     '一般风险（0）<br/>' +
      //     '低风险（0）<br/>' +
      //     '状态：正常'
      // }

      this.outerVisible = true
    }
    // request(url, cb) {
    //   var xmlHttpReq = new XMLHttpRequest()
    //   xmlHttpReq.open('GET', url, true)
    //   xmlHttpReq.send(null)
    //   xmlHttpReq.onreadystatechange = function() {
    //     if (xmlHttpReq.readyState === 4) {
    //       cb && cb(xmlHttpReq.responseText)
    //     }
    //   }
    // },
    // fectchContent(path, type, bim) {
    //   this.request(path, function(content) {
    //     var s = document.createElement(type)
    //     s.innerHTML = content
    //     document.getElementsByTagName('head')[0].appendChild(s)
    //     if (bim !== undefined) bim()
    //   })
    // }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';
.gis-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  ::v-deep.el-dialog {
    height: auto;
  }
}
.gis-wrapper {
  width: 100%;
  height: 100%;
}
.location-form {
  margin-top: 20px;
}
.side-wrapper {
  display: flex;
  justify-content: space-between;
  margin-top: 6%;
  .left-side-wrapper,
  .right-side-wrapper {
    z-index: 10;
    .paper-wrapper {
      display: flex;
      flex-direction: column;
      label {
        margin-bottom: 2px;
      }
    }
    .side-item {
      display: block;
      // background: #5cadff;
      color: #fff;
      margin-left: 0;
      margin-bottom: 2px;
    }
    .drawer {
      width: 360px;
      height: 460px;
      position: absolute;
      top: 60px;
      left: 80px;
      overflow: auto;
      ::v-deep.el-drawer__header {
        margin-bottom: 10px;
        border-bottom: 1px solid #000;
        padding: 10px 0;
        text-align: center;
      }
      .list-item-wrapper {
        overflow: auto;
        height: 164px;
        .list-item {
          border-bottom: 1px dashed #ccc;
          padding-bottom: 10px;
          margin-bottom: 10px;
          .work-wrapper {
            display: flex;
            justify-content: space-around;
            margin-top: 10px;
          }
        }
      }
      .el-select {
        width: 100px;
      }

      ::v-deep .el-input-group__prepend div.el-select .el-input__inner {
        border-color: transparent;
      }
      ::v-deep .el-input-group__append button.el-button {
        border-color: transparent;
        background-color: transparent;
        color: inherit;
      }

      ::v-deep .el-drawer__body {
        padding: 0 10px;
      }
      .js-tools-wrapper {
        display: flex;
        margin: 10px 0;
        .js-tools {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 0 12px;
        }
      }
      .js-quick-tools-wrapper {
        display: flex;
        justify-content: space-around;
      }
      .js-tools-img {
        width: 30px;
      }
    }
  }
}
</style>
<style lang="scss">
</style>
