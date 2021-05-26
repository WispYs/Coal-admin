import { BimConfig, PointIcon } from '@/config/gis-config'

/**
 * GIS公共混入组件
 * 用于多GIS初始化及公共资源方法整合
 */
const gisMixin = {
  data() {
    return {
    }
  },
  created() {
  },
  mounted() {
    // 初始化GIS
    this.initGIS()
  },
  destroyed() {
    window.__GIS__model = void 0
    window.__GIS__api = void 0
    window.__GIS__dom = void 0
  },
  methods: {
    // 初始化GIS
    initGIS() {
      // this.fectchContent('http://122.112.148.164:9980/BIMExample/css/BIM2020.css', 'style')

      window.bim_config = BimConfig
      const obj = Object.assign(BimConfig.model, {
        DOM: document.querySelector('.gis-wrapper')
      })

      window.__GIS__model = new bim365.BIMModel(obj)
      __GIS__model.load()
      window.__GIS__api = __GIS__model.BIM365API
      window.__GIS__dom = obj.DOM

      // 隐藏viewCube
      __GIS__model.bimComponent.viewCube.style.display = 'none'
      // 画布随窗口变化
      window.onresize = __GIS__api.Context.onCanvasResize()
      // polyfill
      // document.querySelector('.app-main').style.padding = '20px 20px 0 20px'

      // 监听完成加载事件
      __GIS__api.Events.finishRender.on('default', this.__gisMounted)

      // 监听相机更新事件
      __GIS__api.Events.updateCameraInSpace.on('default', this.__gisUpdate)
    },
    // gis加载完成事件监听
    __gisMounted(ev) {
      this.gisLoading = false

      // 获取相机距离 最大值
      // const maxDistance = __GIS__api.Context.getOrbitControl().maxDistance
      // console.log('maxDistance', maxDistance)
      // 初始化视点
      this.initViewPoint()
      // 获取模型的全部视图
      // this.getAllViews()
      // for (var i = 0; i < viewpointlist.annotation.length; i++)
      // var i = 1
      // {
      //   // const annotation = viewpointlist.annotation[1]
      //   // const annotation = viewpointlist.annotation[i]
      //   // const inf = JSON.parse(annotation.override)
      //   // console.log(inf)
      //   // console.log(annotation)

      //   // 添加锚点
      //   // const pos = inf.controlPostion
      //   // pos.y = 0
      //   // var a = 1
      //   // delete annotation.override
      //   // delete annotation.viewpointInfo.Override
      //   // annotation.name = window._this.name[window._this.pos]
      //   // console.log(annotation)
      //   // let data = model.BIM365API.Extension.Point.addAnchorPointByPosition(pos,'http://www.probim.cn:8088/bimexample/img/point.png',annotation)
      //   // window._this.dataList.push(data);
      //   // point添加事件
      //   // let pointDom = data.viewpointIcon;
      //   // document.getElementById(data.id).addEventListener('click',()=>{
      //   //     //alert('刚才根据' + JSON.stringify(data.data) +'添加的锚点')
      //   //     //console.log(data.data)
      //   //     window._this.clickPoint(data.data);
      //   //     // window._this.$alert('<strong>'+JSON.stringify(data.data) +'</strong>', 'HTML 片段', {
      //   //     //   dangerouslyUseHTMLString: true
      //   //     // });
      //   // })
      //   // 利用锚点位置 自定义html
      //   // pointDom.innerHTML = " <div style='background:#fff;width:300px;border:1px solid #ff0000'><li>设备名称："+annotation.name+"</li><li>设备状态：开机</li><li>生产数：88</li><li>温度：120­°C</li></div>";
      //   // window._this.randPoint(annotation, pos)

      // }

      if (this.dataList) {
        for (var i = 0; i < this.dataList.length; i++) {
          var dt = this.dataList[i]
          document.getElementById(dt.id).addEventListener('click', this.addEvent)
        }
      }

      // 执行页面中GIS加载完其他动作
      this.gisMounted && this.gisMounted()

      // 设置可预见性
      // __GIS__api.Options.checkedBvhOption(false)
      // 设置帧率优先
      // __GIS__api.Options.frameRatePriorityChange(false)

      // var dom=document.getElementsByClassName("gis-wrapper")[0].childNodes;
      // for(var i=0;i<dom.length;i++)
      //   if("DIV"==dom[i].tagName.toUpperCase()&&"viewCube"!=dom[i].id)
      //   {
      //     document.getElementById(dom[i].id).addEventListener('click',()=>{
      //       window._this.clickPoint(this);
      //     })
      //   }
    },

    // gis更新事件监听
    __gisUpdate() {
      this.gisUpdate && this.gisUpdate()
    },

    // 初始化视点
    initViewPoint() {
      // 获取视点列表
      const viewpointlist = __GIS__api.Data.getMainModel().activeView.getViewpointList()
      console.log('viewpointlist', viewpointlist)
      if (!viewpointlist.length) return
      // 设置第一个视点
      const viewpointoverride = JSON.parse(viewpointlist.viewpoint[0].override)
      const { cameraPosition, cameraRotation, controlPostion } = { ...viewpointoverride }
      __GIS__api.Context.setActiveCameraPositionAnimation(cameraPosition, cameraRotation, controlPostion)
    },
    // 通过点击添加锚点
    setClickPoint(e) {
      this.closeCluster()
      const pos = __GIS__api.Context.sheetGetPosition(e)
      pos.y = 0
      let point = __GIS__api.Extension.Point.addAnchorPointByPosition(pos, PointIcon)
      const cameraInfo = __GIS__api.Context.getViewPointBasicInfo()
      point.cameraInfo = cameraInfo
      this.openCluster()
      console.log('click_point', point)
      return point
    },
    // 通过位置参数设置锚点
    setPosPoint(pos) {
      this.closeCluster()
      pos.y = 0
      const point = __GIS__api.Extension.Point.addAnchorPointByPosition(pos, PointIcon)
      this.openCluster()
      return point
    },
    // 清除所有锚点
    clearAllAnchorpoint() {
      __GIS__api.Extension.Point.clearAllAnchorpoint()
    },
    // 根据id清除锚点
    clearAnchorPointById(pointId) {
      __GIS__api.Extension.Point.clearAnchorPointById(pointId)
    },
    // 全屏
    fullScreen(flag) {
      // const item = this.topConfig.find(t => t.name === '全屏')
      // const flag = item['status'] = !item['status']
      const el = flag ? document.documentElement : document
      const rfs = flag
        ? el.requestFullScreen ||
            el.webkitRequestFullScreen ||
            el.mozRequestFullScreen ||
            el.msRequestFullScreen
        : el.cancelFullScreen ||
            el.webkitCancelFullScreen ||
            el.mozCancelFullScreen ||
            el.exitFullScreen

      if (rfs) {
        rfs.call(el)
      } else if (typeof window.ActiveXObject !== 'undefined') {
        // for IE，这里其实就是模拟了按下键盘的F11，使浏览器全屏
        var wscript = new ActiveXObject('WScript.Shell')
        if (wscript != null) {
          wscript.SendKeys('{F11}')
        }
      }
    },
    // 清除测距
    measureClear() {
      __GIS__api.Extension.Measure.clearMeasure()
      // gisContext.measure2d.clear();
    },
    // 打开聚合
    openCluster() {
      __GIS__api.Extension.Point.openCluster()
    },
    // 关闭聚合
    closeCluster() {
      __GIS__api.Extension.Point.clusterService && __GIS__api.Extension.Point.closeCluster()
    },
    // 设置锚点事件不可用（测量操作锚点遮挡无法点击polyfill）
    setAllPointDisable() {
      const pointArr = __GIS__api.Extension.Point.getAllPoint()
      if (pointArr.length > 0) {
        pointArr.forEach(item => {
          const style = item.viewpointIcon.style
          style.pointerEvents !== '' ? style.pointerEvents = '' : style.pointerEvents = 'none'
        })
      }
    }
  }
}

export {
  gisMixin
}
