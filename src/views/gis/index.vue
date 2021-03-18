<template><div style="width:100%;height:100%">
  <div class="gis-wrapper" />
  <el-dialog :title="dlgTitle" :visible.sync="outerVisible">
    <div
      style="    padding: 15px;
    line-height: 22px;
    font-size: 15px;"
      v-html="dlgData"
    />
    <div slot="footer" class="dialog-footer">
      <el-button @click="outerVisible = false">关  闭</el-button>
    </div>
  </el-dialog>
</div>
</template>
<script>
export default {
  data() {
    return {
      outerVisible: false,
      dlgTitle: '详情',
      pos: 0,
      dlgData: '',
      name: ['激光甲烷', '钻孔', '工作面', ' 无极绳绞车', '掘进机', '回风巷粉尘', '中央区主井提升机房', ''],
      maps: ['综合', '地测', '生产', '通防', '机电', '安全', '应急', '监测'],
      dataList: []
    }
  },
  mounted() {
    window._this = this
    this.dataList = []
    console.log(this.$route.meta.title)
    for (var i = 0; i < this.maps.length; i++) {
      if (this.$route.meta.title.indexOf(this.maps[i]) > -1) { this.pos = i }
    }
    this.fectchContent('http://122.112.148.164:9980/BIMExample/css/BIM2020.css', 'style')
    window.bim_config = {
      localAddress: 'http://122.112.148.164:9980/', // 模型public => hdr 文件地址 如果私有云请改成部署站点public根目录路径
      server: 'http://122.112.148.164:9982/api' // 模型api地址 如私有云请改成私有云相关模型api地址
    }
    var viewpointlist
    var model = null
    var api = null
    const obj = {
      modelID: '77b4621d-d89d-45d4-a66d-7b5be1c938f8',
      projectID: '9759d32b-8245-4567-875b-908be0f612ce',
      versionNO: '',
      viewID: '',
      DOM: document.querySelector('.gis-wrapper')
    }
    model = window.model = new bim365.BIMModel(obj)
    model.load()
    api = model.BIM365API
    api.Events.finishRender.on('default', function(e) {
      // 获取视点列表
      const viewpointlist = model.BIM365API.Data.getMainModel().activeView.getViewpointList()
      // viewpoint 视点 annotation批注数据
      console.log(viewpointlist)
      // for(var i=0;i<viewpointlist.annotation.length;i++)
      var i = 1
      {
        const annotation = viewpointlist.annotation[i]
        const inf = JSON.parse(annotation.override)
        // console.log(inf)
        // console.log(annotation)

        // 添加锚点
        const pos = inf.controlPostion
        pos.y = 0
        var a = 1
        delete annotation.override
        delete annotation.viewpointInfo.Override
        annotation.name = window._this.name[window._this.pos]
        // console.log(annotation)
        // let data = model.BIM365API.Extension.Point.addAnchorPointByPosition(pos,'http://www.probim.cn:8088/bimexample/img/point.png',annotation)
        // window._this.dataList.push(data);
        // point添加事件
        // let pointDom = data.viewpointIcon;
        // document.getElementById(data.id).addEventListener('click',()=>{
        //     //alert('刚才根据' + JSON.stringify(data.data) +'添加的锚点')
        //     //console.log(data.data)
        //     window._this.clickPoint(data.data);
        //     // window._this.$alert('<strong>'+JSON.stringify(data.data) +'</strong>', 'HTML 片段', {
        //     //   dangerouslyUseHTMLString: true
        //     // });
        // })
        // 利用锚点位置 自定义html
        // pointDom.innerHTML = " <div style='background:#fff;width:300px;border:1px solid #ff0000'><li>设备名称："+annotation.name+"</li><li>设备状态：开机</li><li>生产数：88</li><li>温度：120­°C</li></div>";
        window._this.randPoint(annotation, pos)
      }
      model.BIM365API.Extension.Point.openCluster()

      for (var i = 0; i < window._this.dataList.length; i++) {
        var dt = window._this.dataList[i]
        document.getElementById(dt.id).addEventListener('click', window._this.addEvent)
      }
      // var dom=document.getElementsByClassName("gis-wrapper")[0].childNodes;
      // for(var i=0;i<dom.length;i++)
      //   if("DIV"==dom[i].tagName.toUpperCase()&&"viewCube"!=dom[i].id)
      //   {
      //     document.getElementById(dom[i].id).addEventListener('click',()=>{
      //       window._this.clickPoint(this);
      //     })
      //   }
    })
  },
  methods: {
    addEvent(e, a) {
      // console.dir(e)
      window._this.clickPoint(e.currentTarget.id)
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
    randPoint(ctl, controlPostion) {
      for (var i = 1; i < 21; i++) {
        var dt = JSON.parse(JSON.stringify(ctl))
        dt.name += '(' + i + ')'
        dt.viewID = (parseInt(dt.viewID) + i) + ''
        dt.id = this.randomPos() + ''
        dt.modelID = this.randomPos() + ''
        dt.viewpointInfo.ModelID = dt.modelID
        dt.viewpointInfo.ID = dt.id
        dt.viewpointInfo.ViewID = dt.viewID
        // let inf=JSON.parse(dt.override)
        const pos = JSON.parse(JSON.stringify(controlPostion))
        if (this.randomAdd()) { pos.x += this.randomPos() } else { pos.x -= this.randomPos() }
        if (this.randomAdd()) { pos.z += this.randomPos() } else { pos.z -= this.randomPos() }
        pos.y = 0
        delete dt.override
        delete dt.viewpointInfo.Override

        dt.x = pos.x
        dt.y = pos.z
        dt.a = this.randomNum()
        dt.b = this.randomNum()
        dt.c = this.randomNum()
        dt.d = this.randomNum()
        dt.e = this.randomNum()

        console.log(dt)
        const data = model.BIM365API.Extension.Point.addAnchorPointByPosition(pos, 'http://www.probim.cn:8088/bimexample/img/point.png', dt)
        window._this.dataList.push(data)
      }
    },
    clickPoint(id) {
      var data = {}
      for (var i = 0; i < this.dataList.length; i++) {
        if (this.dataList[i].id == id) { data = this.dataList[i] }
      }
      console.log(data)
      this.dlgTitle = data.data.name + '详情'
      data = data.data
      if (this.pos == 0) {
        this.dlgData = '传感器编号：340' + data.id.replace('.', '') + '<br/>' +
          '传感器类型：激光甲烷<br/>' +
          '安装地点：中区11-2采区煤层回风T回<br/>' +
          '实时值：' + this.randomNum() + '<br/>' +
          '单位：%CH4<br/>' +
          '状态：正常<br/>' +
          '监测时间：' + new Date()
      } else if (this.pos == 1) {
        this.dlgData = '勘探线：十南线<br/>' +
          'X：' + data.x + '<br/>' +
          'Y：' + data.y + '<br/>' +
          '孔口标高(m)：' + data.a + '<br/>' +
          '施工日期：2011.8.29-2020.2.12<br/>' +
          '施工机组：' + data.b + '<br/>' +
          '新地层厚度：' + data.c + '<br/>' +
          '终孔深度：' + data.d + '<br/>' +
          '钻探级别：甲<br/>' +
          '测井级别：甲<br/>' +
          '综合级别：甲<br/>' +
          '穿过层位： 25～13-1/11-2～6-2/4-2～1～C31 DF30 H=40m F97 H=10～15m<br/>' +
          '终孔歪斜：3°36′<br/>' +
          '方位角：' + data.e + '°<br/>' +
          '最大歪斜：3°36′<br/>'
      } else if (this.pos == 2) {
        this.dlgData = '设计长度（m）：' + data.a + '<br/>' +
          '工作面长度（m）：' + data.b + '<br/>' +
          '采高（m）：3.8<br/>' +
          '煤层视密度（t /m3）：0<br/>' +
          '可采储量（预期）：' + data.c + '<br/>' +
          '采煤工艺：综采<br/>' +
          '采深（m）：-' + data.d + '<br/>' +
          '编号：1<br/>' +
          '出厂日期：2008-1-12<br/>' +
          '出厂编号：<br/>' +
          '防爆证号：<br/>' +
          '煤安证号：<br/>' +
          '电压等级：<br/>' +
          '资产类型：自有<br/>' +
          '状态：在用'
      } else if (this.pos == 3) {
        this.dlgData = '编号：' + data.id.replace('.', '') + '<br/>' +
          '粉尘1.5毫克/立方米正常<br/>' +
          '当前矿井在采工作面4个，在掘工作面' + data.a + '个；井下作业人员' + data.b + '人，中央区' + data.c + '人，南区' + data.d + '人；存在重大风险0个，重大隐患0个，发生红线三违0个；主要设备运转发生故障0处。<br/>' +
          '厂家：常州科研试制中心有限公司<br/>' +
          '领用人：王龙<br/>' +
          '使用单位：综采三队<br/>' +
          '领用时间：2018-02-27<br/>' +
          '使用地点：1213（1）运顺<br/>' +
          '型号：SQ-90 / 132K'
      } else if (this.pos == 4) {
        this.dlgData = '编号：' + data.id.replace('.', '') + '<br/>' +
          '状态：正常<br/>' +
          '厂家：常州科研试制中心有限公司<br/>' +
          '领用人：王龙<br/>' +
          '使用单位：综采三队<br/>' +
          '领用时间：2018-02-27<br/>' +
          '使用地点：1213（1）运顺<br/>' +
          '型号：SQ-90 / 132K'
      } else if (this.pos == 5) {
        this.dlgData = '传感器编号：' + data.id.replace('.', '') + '<br/>' +
          '当前矿井在采工作面4个，在掘工作面' + data.a + '个；井下作业人员' + data.b + '人，中央区' + data.c + '人，南区' + data.d + '人；存在重大风险0个，重大隐患0个，发生红线三违0个；主要设备运转发生故障0处。<br/>' +
          '传感器类型：粉尘<br/>' +
          '安装地点：东一边界回风巷粉尘<br/>' +
          '实时值：1.2<br/>' +
          '单位：mg / m3<br/>' +
          '状态：正常'
      } else if (this.pos == 6) {
        this.dlgData = '传感器编号：' + data.id.replace('.', '') + '<br/>' +
          '当前矿井在采工作面4个，在掘工作面' + data.a + '个；井下作业人员' + data.b + '人，中央区' + data.c + '人，南区' + data.d + '人；存在重大风险0个，重大隐患0个，发生红线三违0个；主要设备运转发生故障0处。<br/>' +
          '重大风险（0）<br/>' +
          '潜在风险（0）<br/>' +
          '一般风险（0）<br/>' +
          '低风险（0）<br/>' +
          '状态：正常'
      }

      this.outerVisible = true
    },
    request(url, cb) {
      var xmlHttpReq = new XMLHttpRequest()
      xmlHttpReq.open('GET', url, true)
      xmlHttpReq.send(null)
      xmlHttpReq.onreadystatechange = function() {
        if (xmlHttpReq.readyState === 4) {
          cb && cb(xmlHttpReq.responseText)
        }
      }
    },
    fectchContent(path, type, bim) {
      this.request(path, function(content) {
        var s = document.createElement(type)
        s.innerHTML = content
        document.getElementsByTagName('head')[0].appendChild(s)
        if (bim != undefined) { bim() }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.gis-wrapper {
  width: 100%;
  height: 100%;
}

</style>

