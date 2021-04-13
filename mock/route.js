/*
 * @Author: Wisper
 * @Date: 2021-01-08 15:38:12
 * @Last Modified by: Wisper
 * @Last Modified time: 2021-04-08 13:33:51
 */

/**
 * @param {string}  path          路由路径，如果想直接跳转到外部链接可直接传入外网url链接
 * @param {string}  name          路由名称
 * @param {string}  component     路由所引用的前端页面模板路径
 * @param {string}  redirect      路由重定向路径
 * @param {boolean} hidden        true表示隐藏路由，不显示在headbar菜单中
 * @param {string}  title         路由在菜单和导航 tagView 中显示的中文名称
 * @param {boolean} affix         meta参数，true表示永久固定在路由导航tagView中不可删除
 * @param {array}   roles         meta参数，['admin', 'editor']表示该路由仅对admin和editor开放，现权限按角色分配，后可根据项目需求修改
 * @param {boolean} hiddenChild   meta参数，true表示隐藏该路由下所有子路由，仅一级路由显示在headbar菜单中
 * @param {string}  externalUrl   meta参数，用于内嵌外部链接，例：'https://www.baidu.com/'
 * @param {string}  important     meta参数，true表示重要的菜单需要在headbar中显示
 */

const asyncRoutes = [
  // 首页
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: '/dashboard/index',
    meta: { title: '首页', affix: true, important: true }
  },
  // GIS一张图
  {
    path: '/map-gis',
    name: 'demoGis',
    component: 'Layout',
    redirect: '/map-gis/index',
    meta: { title: 'GIS一张图', important: true },
    children: [
      // {
      //   path: '/map-gis/gis1',
      //   name: 'GIS1',
      //   component: '/demo/index',
      //   meta: { title: '矿山三维场景展示' }
      // },
      // {
      //   path: '/map-gis/gis2',
      //   name: 'GIS2',
      //   component: '/demo/index',
      //   meta: { title: '三维地理信息展示' }
      // },
      {
        path: '/map-gis/index',
        name: 'MapGis',
        component: '/gis/index',
        meta: {
          title: '综合一张图',
          externalUrl:
            'http://122.112.148.164:9980/BIMComposer/index.html?projectId=9759d32b-8245-4567-875b-908be0f612ce&model=77b4621d-d89d-45d4-a66d-7b5be1c938f8&ver='
        }
      }
      // {
      //   path: '/map-gis/gis4',
      //   name: 'GIS4',
      //   component: '/gis/index',
      //   meta: {
      //     title: '地测一张图',
      //     externalUrl:
      //       'http://122.112.148.164:9980/BIMComposer/index.html?projectId=9759d32b-8245-4567-875b-908be0f612ce&model=77b4621d-d89d-45d4-a66d-7b5be1c938f8&ver='
      //   }
      // },
      // {
      //   path: '/map-gis/gis5',
      //   name: 'GIS5',
      //   component: '/gis/index',
      //   meta: {
      //     title: '生产一张图',
      //     externalUrl:
      //       'http://122.112.148.164:9980/BIMComposer/index.html?projectId=9759d32b-8245-4567-875b-908be0f612ce&model=77b4621d-d89d-45d4-a66d-7b5be1c938f8&ver='
      //   }
      // },
      // {
      //   path: '/map-gis/gis6',
      //   name: 'GIS6',
      //   component: '/gis/index',
      //   meta: {
      //     title: '通防一张图',
      //     externalUrl:
      //       'http://122.112.148.164:9980/BIMComposer/index.html?projectId=9759d32b-8245-4567-875b-908be0f612ce&model=77b4621d-d89d-45d4-a66d-7b5be1c938f8&ver='
      //   }
      // },
      // {
      //   path: '/map-gis/gis7',
      //   name: 'GIS7',
      //   component: '/gis/index',
      //   meta: {
      //     title: '机电一张图',
      //     externalUrl:
      //       'http://122.112.148.164:9980/BIMComposer/index.html?projectId=9759d32b-8245-4567-875b-908be0f612ce&model=77b4621d-d89d-45d4-a66d-7b5be1c938f8&ver='
      //   }
      // },
      // {
      //   path: '/map-gis/gis8',
      //   name: 'GIS8',
      //   component: '/gis/index',
      //   meta: {
      //     title: '安全一张图',
      //     externalUrl:
      //       'http://122.112.148.164:9980/BIMComposer/index.html?projectId=9759d32b-8245-4567-875b-908be0f612ce&model=77b4621d-d89d-45d4-a66d-7b5be1c938f8&ver='
      //   }
      // },
      // {
      //   path: '/map-gis/gis9',
      //   name: 'GIS9',
      //   component: '/gis/index',
      //   meta: {
      //     title: '应急一张图',
      //     externalUrl:
      //       'http://122.112.148.164:9980/BIMComposer/index.html?projectId=9759d32b-8245-4567-875b-908be0f612ce&model=77b4621d-d89d-45d4-a66d-7b5be1c938f8&ver='
      //   }
      // },
      // {
      //   path: '/map-gis/gis10',
      //   name: 'GIS10',
      //   component: '/gis/index',
      //   meta: {
      //     title: '监测一张图',
      //     externalUrl:
      //       'http://122.112.148.164:9980/BIMComposer/index.html?projectId=9759d32b-8245-4567-875b-908be0f612ce&model=77b4621d-d89d-45d4-a66d-7b5be1c938f8&ver='
      //   }
      // }
    ]
  },
  // 地测防控水
  {
    path: '/demo-geodesy',
    name: 'DemoGeodesy',
    component: 'Layout',
    redirect: '/demo-geodesy/geodesy1/geodesy1-1/geodesy1-1-1',
    meta: { title: '地测防控水', important: true },
    children: [
      {
        path: '/demo-geodesy/geodesy1',
        name: 'Geodesy1',
        component: '/demo/index',
        meta: { title: '地质管理' },
        children: [
          {
            path: '/demo-geodesy/geodesy1/geodesy1-1',
            name: 'Geodesy1-1',
            component: '/demo/index',
            meta: { title: '地质图件' },
            children: [
              {
                path: '/demo-geodesy/geodesy1/geodesy1-1/geodesy1-1-1',
                name: 'Geodesy1-1-1',
                component: '/demo/table/upload/index',
                meta: { title: '矿区构造纲要图' }
              },
              {
                path: '/demo-geodesy/geodesy1/geodesy1-1/geodesy1-1-2',
                name: 'Geodesy1-1-2',
                component: '/demo/table/upload/index',
                meta: { title: '地质地形图' }
              },
              {
                path: '/demo-geodesy/geodesy1/geodesy1-1/geodesy1-1-3',
                name: 'Geodesy1-1-3',
                component: '/demo/table/upload/index',
                meta: { title: '地层综合柱状图' }
              },
              {
                path: '/demo-geodesy/geodesy1/geodesy1-1/geodesy1-1-4',
                name: 'Geodesy1-1-4',
                component: '/demo/table/upload/index',
                meta: { title: '主要地质剖面图' }
              },
              {
                path: '/demo-geodesy/geodesy1/geodesy1-1/geodesy1-1-5',
                name: 'Geodesy1-1-5',
                component: '/demo/table/upload/index',
                meta: { title: '矿井煤岩层对比图' }
              },
              {
                path: '/demo-geodesy/geodesy1/geodesy1-1/geodesy1-1-6',
                name: 'Geodesy1-1-6',
                component: '/demo/table/upload/index',
                meta: { title: '煤矿可采煤层底板等高线及资源/储量估算图' }
              },
              {
                path: '/demo-geodesy/geodesy1/geodesy1-1/geodesy1-1-7',
                name: 'Geodesy1-1-7',
                component: '/demo/table/upload/index',
                meta: { title: '井巷地质素描图' }
              },
              {
                path: '/demo-geodesy/geodesy1/geodesy1-1/geodesy1-1-8',
                name: 'Geodesy1-1-8',
                component: '/demo/table/upload/index',
                meta: { title: '水平地质切面图勘探钻孔柱状图' }
              },
              {
                path: '/demo-geodesy/geodesy1/geodesy1-1/geodesy1-1-9',
                name: 'Geodesy1-1-9',
                component: '/demo/table/upload/index',
                meta: { title: '矿井瓦斯地质图' }
              },
              {
                path: '/demo-geodesy/geodesy1/geodesy1-1/geodesy1-1-10',
                name: 'Geodesy1-1-10',
                component: '/demo/table/upload/index',
                meta: { title: '井上下对照图' }
              },
              {
                path: '/demo-geodesy/geodesy1/geodesy1-1/geodesy1-1-11',
                name: 'Geodesy1-1-11',
                component: '/demo/table/upload/index',
                meta: { title: '采掘工程平面图' }
              },
              {
                path: '/demo-geodesy/geodesy1/geodesy1-1/geodesy1-1-12',
                name: 'Geodesy1-1-12',
                component: '/demo/table/upload/index',
                meta: { title: '井巷、石门地质编录工程地质相关图件' }
              },
              {
                path: '/demo-geodesy/geodesy1/geodesy1-1/geodesy1-1-13',
                name: 'Geodesy1-1-13',
                component: '/demo/table/upload/index',
                meta: { title: '储量损失量计算图' }
              },
              {
                path: '/demo-geodesy/geodesy1/geodesy1-1/geodesy1-1-14',
                name: 'Geodesy1-1-14',
                component: '/demo/table/upload/index',
                meta: { title: '单孔柱状图层位控制图' }
              }
            ]
          },
          {
            path: '/demo-geodesy/geodesy1/geodesy1-2',
            name: 'Geodesy1-2',
            component: '/demo/index',
            meta: { title: '地质文件' },
            children: [
              {
                path: '/demo-geodesy/geodesy1/geodesy1-2/geodesy1-2-1',
                name: 'Geodesy1-2-1',
                component: '/demo/index',
                meta: { title: '采区地质说明书' }
              },
              {
                path: '/demo-geodesy/geodesy1/geodesy1-2/geodesy1-2-2',
                name: 'Geodesy1-2-2',
                component: '/demo/index',
                meta: { title: '掘进工作面地质说明书' }
              },
              {
                path: '/demo-geodesy/geodesy1/geodesy1-2/geodesy1-2-3',
                name: 'Geodesy1-2-3',
                component: '/demo/index',
                meta: { title: '采煤工作面地质说明书' }
              },
              {
                path: '/demo-geodesy/geodesy1/geodesy1-2/geodesy1-2-4',
                name: 'Geodesy1-2-4',
                component: '/demo/index',
                meta: { title: '揭煤地质说明书' }
              },
              {
                path: '/demo-geodesy/geodesy1/geodesy1-2/geodesy1-2-5',
                name: 'Geodesy1-2-5',
                component: '/demo/index',
                meta: { title: '采区采后总结' }
              },
              {
                path: '/demo-geodesy/geodesy1/geodesy1-2/geodesy1-2-6',
                name: 'Geodesy1-2-6',
                component: '/demo/index',
                meta: { title: '工作面采后总结' }
              },
              {
                path: '/demo-geodesy/geodesy1/geodesy1-2/geodesy1-2-7',
                name: 'Geodesy1-2-7',
                component: '/demo/index',
                meta: { title: '年度采面地质预报' }
              },
              {
                path: '/demo-geodesy/geodesy1/geodesy1-2/geodesy1-2-8',
                name: 'Geodesy1-2-8',
                component: '/demo/index',
                meta: { title: '月度采面地质预报' }
              },
              {
                path: '/demo-geodesy/geodesy1/geodesy1-2/geodesy1-2-9',
                name: 'Geodesy1-2-9',
                component: '/demo/index',
                meta: { title: '临时采面地质预报' }
              }
            ]
          },
          {
            path: '/demo-geodesy/geodesy1/geodesy1-3',
            name: 'Geodesy1-3',
            component: '/demo/index',
            meta: { title: '地质技术资料' },
            children: [
              {
                path: '/demo-geodesy/geodesy1/geodesy1-3/geodesy1-3-1',
                name: 'Geodesy1-3-1',
                component: '/demo/index',
                meta: { title: '钻孔成果卡片' }
              },
              {
                path: '/demo-geodesy/geodesy1/geodesy1-3/geodesy1-3-2',
                name: 'Geodesy1-3-2',
                component: '/demo/index',
                meta: { title: '地质构造素描卡片' }
              },
              {
                path: '/demo-geodesy/geodesy1/geodesy1-3/geodesy1-3-3',
                name: 'Geodesy1-3-3',
                component: '/demo/index',
                meta: { title: '井筒石门见煤点柱状卡片' }
              },
              {
                path: '/demo-geodesy/geodesy1/geodesy1-3/geodesy1-3-4',
                name: 'Geodesy1-3-4',
                component: '/demo/index',
                meta: { title: '地质专业的业务规程' }
              },
              {
                path: '/demo-geodesy/geodesy1/geodesy1-3/geodesy1-3-5',
                name: 'Geodesy1-3-5',
                component: '/demo/index',
                meta: { title: '理论知识' }
              },
              {
                path: '/demo-geodesy/geodesy1/geodesy1-3/geodesy1-3-6',
                name: 'Geodesy1-3-6',
                component: '/demo/index',
                meta: { title: '培训教材标准规范' }
              }
            ]
          },
          {
            path: '/demo-geodesy/geodesy1/geodesy1-4',
            name: 'Geodesy1-4',
            component: '/demo/index',
            meta: { title: '行业标准管理' },
            children: [
              {
                path: '/demo-geodesy/geodesy1/geodesy1-4/geodesy1-4-1',
                name: 'Geodesy1-4-1',
                component: '/demo/index',
                meta: { title: '国家地质文件标准规范' }
              },
              {
                path: '/demo-geodesy/geodesy1/geodesy1-4/geodesy1-4-2',
                name: 'Geodesy1-4-2',
                component: '/demo/index',
                meta: { title: '省市地质文件标准规范' }
              },
              {
                path: '/demo-geodesy/geodesy1/geodesy1-4/geodesy1-4-3',
                name: 'Geodesy1-4-3',
                component: '/demo/index',
                meta: { title: '公司地质文件标准规范' }
              },
              {
                path: '/demo-geodesy/geodesy1/geodesy1-4/geodesy1-4-4',
                name: 'Geodesy1-4-4',
                component: '/demo/index',
                meta: { title: '矿井地质文件标准规范' }
              },
              {
                path: '/demo-geodesy/geodesy1/geodesy1-4/geodesy1-4-5',
                name: 'Geodesy1-4-5',
                component: '/demo/index',
                meta: { title: '规章制度' }
              }
            ]
          }
        ]
      },
      {
        path: '/demo-geodesy/geodesy2',
        name: 'Geodesy2',
        component: '/demo/index',
        meta: { title: '测量管理' },
        children: [
          {
            path: '/demo-geodesy/geodesy2/geodesy2-1',
            name: 'Geodesy2-1',
            component: '/demo/index',
            meta: { title: '测量图件' },
            children: [
              {
                path: '/demo-geodesy/geodesy2/geodesy2-1/geodesy2-1-1',
                name: 'Geodesy2-1-1',
                component: '/demo/index',
                meta: { title: '井田区域地形图' }
              },
              {
                path: '/demo-geodesy/geodesy2/geodesy2-1/geodesy2-1-2',
                name: 'Geodesy2-1-2',
                component: '/demo/index',
                meta: { title: '工业广场平面图' }
              },
              {
                path: '/demo-geodesy/geodesy2/geodesy2-1/geodesy2-1-3',
                name: 'Geodesy2-1-3',
                component: '/demo/index',
                meta: { title: '采掘工程平面图' }
              },
              {
                path: '/demo-geodesy/geodesy2/geodesy2-1/geodesy2-1-4',
                name: 'Geodesy2-1-4',
                component: '/demo/index',
                meta: { title: '井上下对照图' }
              },
              {
                path: '/demo-geodesy/geodesy2/geodesy2-1/geodesy2-1-5',
                name: 'Geodesy2-1-5',
                component: '/demo/index',
                meta: { title: '主要保安煤柱图' }
              },
              {
                path: '/demo-geodesy/geodesy2/geodesy2-1/geodesy2-1-6',
                name: 'Geodesy2-1-6',
                component: '/demo/index',
                meta: { title: '井筒断面图' }
              },
              {
                path: '/demo-geodesy/geodesy2/geodesy2-1/geodesy2-1-7',
                name: 'Geodesy2-1-7',
                component: '/demo/index',
                meta: { title: '东西翼测量图' }
              },
              {
                path: '/demo-geodesy/geodesy2/geodesy2-1/geodesy2-1-8',
                name: 'Geodesy2-1-8',
                component: '/demo/index',
                meta: { title: '井底车场图' }
              },
              {
                path: '/demo-geodesy/geodesy2/geodesy2-1/geodesy2-1-9',
                name: 'Geodesy2-1-9',
                component: '/demo/index',
                meta: { title: '主要巷道平面图' }
              }
            ]
          },
          {
            path: '/demo-geodesy/geodesy2/geodesy2-2',
            name: 'Geodesy2-2',
            component: '/demo/index',
            meta: { title: '测量文件' },
            children: [
              {
                path: '/demo-geodesy/geodesy2/geodesy2-2/geodesy2-2-1',
                name: 'Geodesy2-2-1',
                component: '/demo/index',
                meta: { title: '安全采掘通知单' }
              },
              {
                path: '/demo-geodesy/geodesy2/geodesy2-2/geodesy2-2-2',
                name: 'Geodesy2-2-2',
                component: '/demo/index',
                meta: { title: '安全贯通通知单' }
              },
              {
                path: '/demo-geodesy/geodesy2/geodesy2-2/geodesy2-2-3',
                name: 'Geodesy2-2-3',
                component: '/demo/index',
                meta: { title: '巷道开口通知单' }
              },
              {
                path: '/demo-geodesy/geodesy2/geodesy2-2/geodesy2-2-4',
                name: 'Geodesy2-2-4',
                component: '/demo/index',
                meta: { title: '停掘、停采通知单' }
              },
              {
                path: '/demo-geodesy/geodesy2/geodesy2-2/geodesy2-2-5',
                name: 'Geodesy2-2-5',
                component: '/demo/index',
                meta: { title: '巷道变坡、拐弯通知单' }
              },
              {
                path: '/demo-geodesy/geodesy2/geodesy2-2/geodesy2-2-6',
                name: 'Geodesy2-2-6',
                component: '/demo/index',
                meta: { title: '导线技术成果台账' }
              },
              {
                path: '/demo-geodesy/geodesy2/geodesy2-2/geodesy2-2-7',
                name: 'Geodesy2-2-7',
                component: '/demo/index',
                meta: { title: '临近未保护区通知单' }
              }
            ]
          },
          {
            path: '/demo-geodesy/geodesy2/geodesy2-3',
            name: 'Geodesy2-3',
            component: '/demo/index',
            meta: { title: '测量技术资料管理' },
            children: [
              {
                path: '/demo-geodesy/geodesy2/geodesy2-3/geodesy2-3-1',
                name: 'Geodesy2-3-1',
                component: '/demo/index',
                meta: { title: '业务规程' }
              },
              {
                path: '/demo-geodesy/geodesy2/geodesy2-3/geodesy2-3-2',
                name: 'Geodesy2-3-2',
                component: '/demo/index',
                meta: { title: '理论知识' }
              },
              {
                path: '/demo-geodesy/geodesy2/geodesy2-3/geodesy2-3-3',
                name: 'Geodesy2-3-3',
                component: '/demo/index',
                meta: { title: '培训教材' }
              },
              {
                path: '/demo-geodesy/geodesy2/geodesy2-3/geodesy2-3-4',
                name: 'Geodesy2-3-4',
                component: '/demo/index',
                meta: { title: '标准规范' }
              }
            ]
          }
        ]
      },
      {
        path: '/demo-geodesy/geodesy3',
        name: 'Geodesy3',
        component: '/demo/index',
        meta: { title: '水文管理' },
        children: [
          {
            path: '/demo-geodesy/geodesy3/geodesy3-1',
            name: 'Geodesy3-1',
            component: '/demo/index',
            meta: { title: '水文台账' },
            children: [
              {
                path: '/demo-geodesy/geodesy3/geodesy3-1/geodesy3-1-1',
                name: 'Geodesy3-1-1',
                component: '/demo/index',
                meta: { title: '矿井涌水量月报表' }
              },
              {
                path: '/demo-geodesy/geodesy3/geodesy3-1/geodesy3-1-2',
                name: 'Geodesy3-1-2',
                component: '/demo/index',
                meta: { title: '地表水体观测台账' }
              },
              {
                path: '/demo-geodesy/geodesy3/geodesy3-1/geodesy3-1-3',
                name: 'Geodesy3-1-3',
                component: '/demo/index',
                meta: { title: '矿井和周边煤矿采空区相关资料台账' }
              },
              {
                path: '/demo-geodesy/geodesy3/geodesy3-1/geodesy3-1-4',
                name: 'Geodesy3-1-4',
                component: '/demo/index',
                meta: { title: '水源水质受污染观测资料台账' }
              },
              {
                path: '/demo-geodesy/geodesy3/geodesy3-1/geodesy3-1-5',
                name: 'Geodesy3-1-5',
                component: '/demo/index',
                meta: { title: '地面水文观测孔水位动态月报表' }
              },
              {
                path: '/demo-geodesy/geodesy3/geodesy3-1/geodesy3-1-6',
                name: 'Geodesy3-1-6',
                component: '/demo/index',
                meta: { title: '地面水文地质钻孔台账' }
              },
              {
                path: '/demo-geodesy/geodesy3/geodesy3-1/geodesy3-1-7',
                name: 'Geodesy3-1-7',
                component: '/demo/index',
                meta: { title: '地面水文观测孔管理台账' }
              },
              {
                path: '/demo-geodesy/geodesy3/geodesy3-1/geodesy3-1-8',
                name: 'Geodesy3-1-8',
                component: '/demo/index',
                meta: { title: '钻孔水位、井泉动态观测成果及河流渗漏台账' }
              },
              {
                path: '/demo-geodesy/geodesy3/geodesy3-1/geodesy3-1-9',
                name: 'Geodesy3-1-9',
                component: '/demo/index',
                meta: { title: '封闭不良钻孔台账' }
              },
              {
                path: '/demo-geodesy/geodesy3/geodesy3-1/geodesy3-1-10',
                name: 'Geodesy3-1-10',
                component: '/demo/index',
                meta: { title: '井田地质钻孔综合成果台账' }
              }
            ]
          },
          {
            path: '/demo-geodesy/geodesy3/geodesy3-2',
            name: 'Geodesy3-2',
            component: '/demo/index',
            meta: { title: '水文台账预览' },
            children: [
              {
                path: '/demo-geodesy/geodesy3/geodesy3-2/geodesy3-2-1',
                name: 'Geodesy3-2-1',
                component: '/demo/index',
                meta: { title: '矿井涌水量月报表预览' }
              },
              {
                path: '/demo-geodesy/geodesy3/geodesy3-2/geodesy3-2-2',
                name: 'Geodesy3-2-2',
                component: '/demo/index',
                meta: { title: '地表水体观测台账预览' }
              },
              {
                path: '/demo-geodesy/geodesy3/geodesy3-2/geodesy3-2-3',
                name: 'Geodesy3-2-3',
                component: '/demo/index',
                meta: { title: '矿井和周边煤矿采空区相关资料台账预览' }
              },
              {
                path: '/demo-geodesy/geodesy3/geodesy3-2/geodesy3-2-4',
                name: 'Geodesy3-2-4',
                component: '/demo/index',
                meta: { title: '水源水质受污染观测资料台账预览' }
              },
              {
                path: '/demo-geodesy/geodesy3/geodesy3-2/geodesy3-2-5',
                name: 'Geodesy3-2-5',
                component: '/demo/index',
                meta: { title: '地面水文观测孔水位动态月报表预览' }
              },
              {
                path: '/demo-geodesy/geodesy3/geodesy3-2/geodesy3-2-6',
                name: 'Geodesy3-2-6',
                component: '/demo/index',
                meta: { title: '地面水文地质钻孔台账预览' }
              },
              {
                path: '/demo-geodesy/geodesy3/geodesy3-2/geodesy3-2-7',
                name: 'Geodesy3-2-7',
                component: '/demo/index',
                meta: { title: '地面水文观测孔管理台账预览' }
              }
            ]
          },
          {
            path: '/demo-geodesy/geodesy3/geodesy3-3',
            name: 'Geodesy3-3',
            component: '/demo/index',
            meta: { title: '防治水工程' },
            children: [
              {
                path: '/demo-geodesy/geodesy3/geodesy3-3/geodesy3-3-1',
                name: 'Geodesy3-3-1',
                component: '/demo/index',
                meta: { title: '中长期防治水计划' }
              },
              {
                path: '/demo-geodesy/geodesy3/geodesy3-3/geodesy3-3-2',
                name: 'Geodesy3-3-2',
                component: '/demo/index',
                meta: { title: '年度防治水计划' }
              },
              {
                path: '/demo-geodesy/geodesy3/geodesy3-3/geodesy3-3-3',
                name: 'Geodesy3-3-3',
                component: '/demo/index',
                meta: { title: '工程方案与设计' }
              },
              {
                path: '/demo-geodesy/geodesy3/geodesy3-3/geodesy3-3-4',
                name: 'Geodesy3-3-4',
                component: '/demo/index',
                meta: { title: '施工结果' }
              },
              {
                path: '/demo-geodesy/geodesy3/geodesy3-3/geodesy3-3-5',
                name: 'Geodesy3-3-5',
                component: '/demo/index',
                meta: { title: '探放水工程' }
              },
              {
                path: '/demo-geodesy/geodesy3/geodesy3-3/geodesy3-3-6',
                name: 'Geodesy3-3-6',
                component: '/demo/index',
                meta: { title: '水文地质情况分析报告和水害防治措施' }
              },
              {
                path: '/demo-geodesy/geodesy3/geodesy3-3/geodesy3-3-7',
                name: 'Geodesy3-3-7',
                component: '/demo/index',
                meta: {
                  title: '水文地质情况评价报告和水害隐患治理情况分析报告'
                }
              }
            ]
          },
          {
            path: '/demo-geodesy/geodesy3/geodesy3-4',
            name: 'Geodesy3-4',
            component: '/demo/index',
            meta: { title: '水文资料' },
            children: [
              {
                path: '/demo-geodesy/geodesy3/geodesy3-4/geodesy3-4-1',
                name: 'Geodesy3-4-1',
                component: '/demo/index',
                meta: { title: '矿井水文地质类型划分报告' }
              },
              {
                path: '/demo-geodesy/geodesy3/geodesy3-4/geodesy3-4-2',
                name: 'Geodesy3-4-2',
                component: '/demo/index',
                meta: { title: '月度水文地质预报' }
              },
              {
                path: '/demo-geodesy/geodesy3/geodesy3-4/geodesy3-4-3',
                name: 'Geodesy3-4-3',
                component: '/demo/index',
                meta: { title: '允许掘进通知单' }
              },
              {
                path: '/demo-geodesy/geodesy3/geodesy3-4/geodesy3-4-4',
                name: 'Geodesy3-4-4',
                component: '/demo/index',
                meta: { title: '物探报告' }
              },
              {
                path: '/demo-geodesy/geodesy3/geodesy3-4/geodesy3-4-5',
                name: 'Geodesy3-4-5',
                component: '/demo/index',
                meta: { title: '防治水隐患排查记录' }
              }
            ]
          },
          {
            path: '/demo-geodesy/geodesy3/geodesy3-5',
            name: 'Geodesy3-5',
            component: '/demo/index',
            meta: { title: '水文图件' },
            children: [
              {
                path: '/demo-geodesy/geodesy3/geodesy3-5/geodesy3-5-1',
                name: 'Geodesy3-5-1',
                component: '/demo/index',
                meta: { title: '矿井充水性图' }
              },
              {
                path: '/demo-geodesy/geodesy3/geodesy3-5/geodesy3-5-2',
                name: 'Geodesy3-5-2',
                component: '/demo/index',
                meta: { title: '矿井综合水文地质柱状图' }
              },
              {
                path: '/demo-geodesy/geodesy3/geodesy3-5/geodesy3-5-3',
                name: 'Geodesy3-5-3',
                component: '/demo/index',
                meta: { title: '矿井水文地质剖面图' }
              },
              {
                path: '/demo-geodesy/geodesy3/geodesy3-5/geodesy3-5-4',
                name: 'Geodesy3-5-4',
                component: '/demo/index',
                meta: { title: '矿井综合水文地质图' }
              },
              {
                path: '/demo-geodesy/geodesy3/geodesy3-5/geodesy3-5-5',
                name: 'Geodesy3-5-5',
                component: '/demo/index',
                meta: { title: '矿井涌水量与各种相关因素动态曲线图' }
              },
              {
                path: '/demo-geodesy/geodesy3/geodesy3-5/geodesy3-5-6',
                name: 'Geodesy3-5-6',
                component: '/demo/index',
                meta: { title: '年度水害分析预测表及水害预测图' }
              }
            ]
          },
          {
            path: '/demo-geodesy/geodesy3/geodesy3-6',
            name: 'Geodesy3-6',
            component: '/demo/index',
            meta: { title: '水质分析' },
            children: [
              {
                path: '/demo-geodesy/geodesy3/geodesy3-6/geodesy3-6-1',
                name: 'Geodesy3-6-1',
                component: '/demo/index',
                meta: { title: '水质分析台账' }
              },
              {
                path: '/demo-geodesy/geodesy3/geodesy3-6/geodesy3-6-2',
                name: 'Geodesy3-6-2',
                component: '/demo/index',
                meta: { title: '未知水样判别' }
              },
              {
                path: '/demo-geodesy/geodesy3/geodesy3-6/geodesy3-6-3',
                name: 'Geodesy3-6-3',
                component: '/demo/index',
                meta: { title: '已知水样分析' }
              }
            ]
          }
        ]
      },
      {
        path: '/demo-geodesy/geodesy4',
        name: 'Geodesy4',
        component: '/demo/index',
        meta: { title: '储量管理' },
        children: [
          {
            path: '/demo-geodesy/geodesy4/geodesy4-1',
            name: 'Geodesy4-1',
            component: '/demo/index',
            meta: { title: '分工作面各月损失量分析及回采率计算基础台账' }
          },
          {
            path: '/demo-geodesy/geodesy4/geodesy4-2',
            name: 'Geodesy4-2',
            component: '/demo/index',
            meta: { title: '分月分采区分煤层损失量分析及回采率计算基础台账' }
          },
          {
            path: '/demo-geodesy/geodesy4/geodesy4-3',
            name: 'Geodesy4-3',
            component: '/demo/index',
            meta: { title: '矿井期末保有储量计算基础和汇总数字台账' }
          },
          {
            path: '/demo-geodesy/geodesy4/geodesy4-4',
            name: 'Geodesy4-4',
            component: '/demo/index',
            meta: { title: '矿井“三下“压煤台账' }
          },
          {
            path: '/demo-geodesy/geodesy4/geodesy4-5',
            name: 'Geodesy4-5',
            component: '/demo/index',
            meta: { title: '矿井永久煤柱台账' }
          },
          {
            path: '/demo-geodesy/geodesy4/geodesy4-6',
            name: 'Geodesy4-6',
            component: '/demo/index',
            meta: { title: '矿井损失量摊销台账' }
          },
          {
            path: '/demo-geodesy/geodesy4/geodesy4-7',
            name: 'Geodesy4-7',
            component: '/demo/index',
            meta: { title: '矿井储量增减、变动审批情况台账' }
          },
          {
            path: '/demo-geodesy/geodesy4/geodesy4-8',
            name: 'Geodesy4-8',
            component: '/demo/index',
            meta: { title: '矿井储量动态数字台账' }
          },
          {
            path: '/demo-geodesy/geodesy4/geodesy4-9',
            name: 'Geodesy4-9',
            component: '/demo/index',
            meta: { title: '“三量”计算成果台账' }
          }
        ]
      },
      {
        path: '/demo-geodesy/geodesy5',
        name: 'Geodesy5',
        component: '/demo/index',
        meta: { title: '地测资料管理' },
        children: [
          {
            path: '/demo-geodesy/geodesy5/geodesy5-1',
            name: 'Geodesy5-1',
            component: '/demo/index',
            meta: { title: '超前物探信息表' }
          },
          {
            path: '/demo-geodesy/geodesy5/geodesy5-2',
            name: 'Geodesy5-2',
            component: '/demo/index',
            meta: { title: '工作面钻孔注浆管理' }
          },
          {
            path: '/demo-geodesy/geodesy4/geodesy5-3',
            name: 'Geodesy5-3',
            component: '/demo/index',
            meta: { title: '巷道贯通管理' }
          },
          {
            path: '/demo-geodesy/geodesy4/geodesy5-4',
            name: 'Geodesy5-4',
            component: '/demo/table/upload/index',
            meta: { title: '超前钻探管理台账' }
          },
          {
            path: '/demo-geodesy/geodesy4/geodesy5-5',
            name: 'Geodesy5-5',
            component: '/demo/index',
            meta: { title: '沉陷观测' }
          }
        ]
      }
    ]
  },
  // 采掘管理
  {
    path: '/mining-management',
    name: 'DemoExcavate',
    component: 'Layout',
    redirect: 'mining-management/product-plan/yield-plan',
    meta: { title: '采掘管理', important: true },
    children: [
      {
        path: '/mining-management/excavate1',
        name: 'Excavate1',
        component: '/demo/index',
        meta: { title: '基础设计信息' },
        children: [
          {
            path: '/mining-management/excavate1/excavate1-1',
            name: 'Excavate1-1',
            component: '/demo/index',
            meta: { title: '矿井基础信息' }
          },
          {
            path: '/mining-management/excavate1/excavate1-2',
            name: 'Excavate1-2',
            component: '/demo/index',
            meta: { title: '煤层编号信息' }
          },
          {
            path: '/mining-management/excavate1/excavate1-3',
            name: 'Excavate1-3',
            component: '/demo/index',
            meta: { title: '水平基本信息' }
          },
          {
            path: '/mining-management/excavate1/excavate1-4',
            name: 'Excavate1-4',
            component: '/demo/index',
            meta: { title: '采区基本信息' }
          },
          {
            path: '/mining-management/excavate1/excavate1-5',
            name: 'Excavate1-5',
            component: '/demo/index',
            meta: { title: '采煤队信息' }
          },
          {
            path: '/mining-management/excavate1/excavate1-6',
            name: 'Excavate1-6',
            component: '/mining-management/excavate1/excavate1-6/index',
            meta: { title: '掘进队信息' }
          },
          {
            path: '/mining-management/excavate1/excavate1-7',
            name: 'Excavate1-7',
            component: '/demo/index',
            meta: { title: '工作面管理' }
          },
          {
            path: '/mining-management/excavate1/excavate1-8',
            name: 'Excavate1-8',
            component: '/demo/index',
            meta: { title: '巷道管理' }
          }
        ]
      },
      {
        path: '/mining-management/excavate2',
        name: 'Excavate2',
        component: '/demo/index',
        meta: { title: '生产计划' },
        children: [
          {
            path: '/mining-management/product-plan/yield-plan',
            name: 'Excavate2-1',
            component: '/mining-management/product-plan/yield-plan/index',
            meta: { title: '产量月计划表' }
          },
          {
            path: '/mining-management/product-plan/month-plan',
            name: 'Excavate2-2',
            component: '/mining-management/product-plan/month-plan/index',
            meta: { title: '掘进月计划表' }
          },
          {
            path: '/mining-management/product-plan/coal-year-plan',
            name: 'Excavate2-3',
            component: '/mining-management/product-plan/coal-year-plan/index',
            meta: { title: '煤巷掘进接替年计划表' }
          },
          {
            path: '/mining-management/product-plan/rock-year-plan',
            name: 'Excavate2-4',
            component: '/mining-management/product-plan/rock-year-plan/index',
            meta: { title: '岩巷工程接替年计划表' }
          },
          {
            path: '/mining-management/product-plan/work-year-plan',
            name: 'Excavate2-5',
            component: '/mining-management/product-plan/work-year-plan/index',
            meta: { title: '工作面接续年计划表' }
          },
          {
            path: '/mining-management/product-plan/year-preview',
            name: 'Excavate2-6',
            component: '/mining-management/product-plan/year-preview/index',
            meta: { title: '年计划预览表' }
          }
        ]
      },
      {
        path: '/mining-management/excavate3',
        name: 'Excavate3',
        component: '/demo/index',
        meta: { title: '生产管理' },
        children: [
          {
            path: '/mining-management/production-management/working-lifecycle',
            name: 'WorkingLifecycle',
            component:
              '/mining-management/production-management/working-lifecycle/index',
            meta: { title: '工作面生命周期管理' }
          },
          {
            path: '/mining-management/production-management/roadway-lifecycle',
            name: 'RoadwayLifecycle',
            component:
              '/mining-management/production-management/roadway-lifecycle/index',
            meta: { title: '巷道生命周期管理' }
          },
          {
            path: '/mining-management/production-management/mining-operation',
            name: 'MiningOperation',
            component:
              '/mining-management/production-management/mining-operation/index',
            meta: { title: '采掘作业规程' }
          }
        ]
      },
      {
        path: '/mining-management/excavate4',
        name: 'Excavate4',
        component: '/demo/index',
        meta: { title: '生产图件' },
        children: [
          {
            path: '/mining-management/excavate4/excavate4-1',
            name: 'Excavate4-1',
            component: '/demo/index',
            meta: { title: '工作面图纸' }
          },
          {
            path: '/mining-management/excavate4/excavate4-2',
            name: 'Excavate4-2',
            component: '/demo/index',
            meta: { title: '巷道图纸' }
          },
          {
            path: '/mining-management/excavate4/excavate4-3',
            name: 'Excavate4-3',
            component: '/demo/index',
            meta: { title: '采掘工程设计图' }
          },
          {
            path: '/mining-management/excavate4/excavate4-4',
            name: 'Excavate4-4',
            component: '/demo/index',
            meta: { title: '单项工程图纸' }
          }
        ]
      },
      {
        path: '/mining-management/excavate5',
        name: 'Excavate5',
        component: '/demo/index',
        meta: { title: '生产文档' },
        children: [
          {
            path: '/mining-management/excavate5/excavate5-1',
            name: 'Excavate5-1',
            component: '/demo/index',
            meta: { title: '掘进开拓方案' }
          },
          {
            path: '/mining-management/excavate5/excavate5-2',
            name: 'Excavate5-2',
            component: '/demo/index',
            meta: { title: '采煤方案' }
          },
          {
            path: '/mining-management/excavate5/excavate5-3',
            name: 'Excavate5-3',
            component: '/demo/index',
            meta: { title: '理论知识' }
          },
          {
            path: '/mining-management/excavate5/excavate5-4',
            name: 'Excavate5-4',
            component: '/demo/index',
            meta: { title: '培训教材' }
          },
          {
            path: '/mining-management/excavate5/excavate5-5',
            name: 'Excavate5-5',
            component: '/demo/index',
            meta: { title: '标准规范' }
          },
          {
            path: '/mining-management/excavate5/excavate5-6',
            name: 'Excavate5-6',
            component: '/demo/index',
            meta: { title: '上报上级单位周报' }
          },
          {
            path: '/mining-management/excavate5/excavate5-7',
            name: 'Excavate5-7',
            component: '/demo/index',
            meta: { title: '上报上级单位月报' }
          },
          {
            path: '/mining-management/excavate5/excavate5-8',
            name: 'Excavate5-8',
            component: '/demo/index',
            meta: { title: '上报上级单位季报' }
          },
          {
            path: '/mining-management/excavate5/excavate5-9',
            name: 'Excavate5-9',
            component: '/demo/index',
            meta: { title: '上报上级单位年报' }
          }
        ]
      }
    ]
  },
  // 生产调度
  {
    path: '/product-dispatch',
    name: 'DemoDispatch',
    component: 'Layout',
    redirect: '/product-dispatch/dispatch-parameter/hcgzmqdzhbjl',
    meta: { title: '生产调度', important: true },
    children: [
      {
        path: '/product-dispatch/dispatch1',
        name: 'Dispatch1',
        component: '/demo/index',
        meta: { title: '调度台账' },
        children: [
          {
            path: '/product-dispatch/dispatch1/dispatch1-1',
            name: 'Dispatch1-1',
            component: '/demo/index',
            meta: { title: '采煤工作面日报' }
          },
          {
            path: '/product-dispatch/dispatch1/dispatch1-2',
            name: 'Dispatch1-2',
            component: '/demo/index',
            meta: { title: '主井提升及调度生产动态' }
          },
          {
            path: '/product-dispatch/dispatch1/dispatch1-3',
            name: 'Dispatch1-3',
            component: '/demo/index',
            meta: { title: '中央区副井提升情况表' }
          },
          {
            path: '/product-dispatch/dispatch1/dispatch1-4',
            name: 'Dispatch1-4',
            component: '/demo/index',
            meta: { title: '南区副井提升情况表' }
          },
          {
            path: '/product-dispatch/dispatch1/dispatch1-5',
            name: 'Dispatch1-5',
            component: '/demo/index',
            meta: { title: '东区副井提升情况表' }
          },
          {
            path: '/product-dispatch/dispatch1/dispatch1-6',
            name: 'Dispatch1-6',
            component: '/demo/index',
            meta: { title: '深部基本井提升情况表' }
          },
          {
            path: '/product-dispatch/dispatch-parameter/hcgzmqdzhbjl',
            name: 'Dispatch1-7',
            component:
              '/product-dispatch/dispatch-parameter/hcgzmqdzhbjl/index',
            meta: { title: '回采工作面区队长汇报记录' }
          },
          {
            path: '/product-dispatch/dispatch-parameter/jjscqk',
            name: 'Dispatch1-8',
            component: '/product-dispatch/dispatch-parameter/jjscqk/index',
            meta: { title: '掘进工作面区队长汇报记录' }
          },
          {
            path: '/product-dispatch/dispatch1/dispatch1-9',
            name: 'Dispatch1-9',
            component: '/demo/index',
            meta: { title: '巷道贯通日报' }
          },
          {
            path: '/product-dispatch/dispatch1/dispatch1-10',
            name: 'Dispatch1-10',
            component: '/demo/index',
            meta: { title: '巷道揭煤日报' }
          },
          {
            path: '/product-dispatch/dispatch1/dispatch1-11',
            name: 'Dispatch1-11',
            component: '/demo/index',
            meta: { title: '工作面安装日报' }
          },
          {
            path: '/product-dispatch/dispatch1/dispatch1-12',
            name: 'Dispatch1-12',
            component: '/demo/index',
            meta: { title: '工作面拆除日报' }
          },
          {
            path: '/product-dispatch/dispatch1/dispatch1-13',
            name: 'Dispatch1-13',
            component: '/demo/index',
            meta: { title: '煤管科生产信息日报' }
          },
          {
            path: '/product-dispatch/dispatch1/dispatch1-14',
            name: 'Dispatch1-14',
            component: '/demo/index',
            meta: { title: '矸石仓地点信息表' }
          },
          {
            path: '/product-dispatch/dispatch1/dispatch1-15',
            name: 'Dispatch1-15',
            component: '/demo/index',
            meta: { title: '矸石仓放矸日报' }
          }
        ]
      },
      {
        path: '/product-dispatch/dispatch2',
        name: 'Dispatch2',
        component: '/demo/index',
        meta: { title: '调度管理' },
        children: [
          {
            path: '/product-dispatch/dispatch2/dispatch2-1',
            name: 'Dispatch2-1',
            component: '/demo/index',
            meta: { title: '入井人数日统计' }
          },
          {
            path: '/product-dispatch/dispatch2/dispatch2-2',
            name: 'Dispatch2-2',
            component: '/demo/index',
            meta: { title: '矿领导值班计划表' }
          },
          {
            path: '/product-dispatch/dispatch2/dispatch2-3',
            name: 'Dispatch2-3',
            component: '/demo/index',
            meta: { title: '矿领导带班计划表' }
          },
          {
            path: '/product-dispatch/dispatch2/dispatch2-4',
            name: 'Dispatch2-4',
            component: '/demo/index',
            meta: { title: '防汛值班计划表' }
          },
          {
            path: '/product-dispatch/dispatch2/dispatch2-5',
            name: 'Dispatch2-5',
            component: '/demo/index',
            meta: { title: '调度员值班计划表' }
          },
          {
            path: '/product-dispatch/dispatch2/dispatch2-6',
            name: 'Dispatch2-6',
            component: '/demo/index',
            meta: { title: '各单位值跟班计划表' }
          },
          {
            path: '/product-dispatch/dispatch2/dispatch2-7',
            name: 'Dispatch2-7',
            component: '/demo/index',
            meta: { title: '各单位值跟班计划预览表' }
          },
          {
            path: '/product-dispatch/dispatch2/dispatch2-8',
            name: 'Dispatch2-8',
            component: '/demo/index',
            meta: { title: '调度数据锁定' }
          },
          {
            path: '/product-dispatch/dispatch2/dispatch2-9',
            name: 'Dispatch2-9',
            component: '/demo/index',
            meta: { title: '公文公告' }
          },
          {
            path: '/product-dispatch/dispatch2/dispatch2-10',
            name: 'Dispatch2-10',
            component: '/demo/index',
            meta: { title: '公文公告查看' }
          },
          {
            path: '/product-dispatch/dispatch2/dispatch2-11',
            name: 'Dispatch2-11',
            component: '/demo/index',
            meta: { title: '早调会领导下派任务' }
          },
          {
            path: '/product-dispatch/dispatch2/dispatch2-12',
            name: 'Dispatch2-12',
            component: '/demo/index',
            meta: { title: '早调会领导下派任务记录' }
          }
        ]
      },
      {
        path: '/product-dispatch/dispatch3',
        name: 'Dispatch3',
        component: '/demo/index',
        meta: { title: '调度汇报' },
        children: [
          {
            path: '/product-dispatch/dispatch3/dispatch3-1',
            name: 'Dispatch3-1',
            component: '/demo/index',
            meta: { title: '调度资料' },
            children: [
              {
                path: '/product-dispatch/dispatch3/dispatch3-1/dispatch3-1-1',
                name: 'Dispatch3-1-1',
                component: '/demo/index',
                meta: { title: '管理制度' }
              },
              {
                path: '/product-dispatch/dispatch3/dispatch3-1/dispatch3-1-2',
                name: 'Dispatch3-1-2',
                component: '/demo/index',
                meta: { title: '机构建设' }
              },
              {
                path: '/product-dispatch/dispatch3/dispatch3-1/dispatch3-1-3',
                name: 'Dispatch3-1-3',
                component: '/demo/index',
                meta: { title: '领导讲话' }
              },
              {
                path: '/product-dispatch/dispatch3/dispatch3-1/dispatch3-1-4',
                name: 'Dispatch3-1-4',
                component: '/demo/index',
                meta: { title: '政策法规' }
              }
            ]
          },
          {
            path: '/product-dispatch/dispatch3/dispatch3-2',
            name: 'Dispatch3-2',
            component: '/demo/index',
            meta: { title: '作业月计划预览' }
          },
          {
            path: '/product-dispatch/dispatch3/dispatch3-3',
            name: 'Dispatch3-3',
            component: '/demo/index',
            meta: { title: '生产综合台账' }
          }
        ]
      }
    ]
  },
  // 安全管理
  {
    path: '/safe-management',
    name: 'DemoSafe',
    component: 'Layout',
    redirect: 'safe-management/safe1/safe1-1/safe1-1-1',
    meta: { title: '安全管理', roles: ['admin', 'editor'], important: true },
    children: [
      {
        path: '/safe-management/safeProduce-normalizing',
        name: 'Safe1',
        component: '/demo/index',
        meta: { title: '安全生产标准化' },
        children: [
          {
            path: '/safe-management/safeProduce-normalizing/compliance-planning',
            name: 'Safe1-1',
            component: '/demo/index',
            meta: { title: '达标规划' },
            children: [
              {
                path: '/safe-management/safeProduce-normalizing/compliance-planning/annual-plan',
                name: 'Safe1-1-1',
                component: '/safe-management/safeProduce-normalizing/compliance-planning/annual-plan/index',
                meta: { title: '年度规划' }
              },
              {
                path: '/safe-management/safeProduce-normalizing/compliance-planning/quarterly-plan',
                name: 'Safe1-1-2',
                component: '/safe-management/safeProduce-normalizing/compliance-planning/quarterly-plan/index',
                meta: { title: '季度计划' }
              },
              {
                path: '/safe-management/safeProduce-normalizing/compliance-planning/monthly-plan',
                name: 'Safe1-1-3',
                component: '/safe-management/safeProduce-normalizing/compliance-planning/monthly-plan/index',
                meta: { title: '月度计划' }
              }
            ]
          },
          {
            path: '/safe-management/safeProduce-normalizing/standardizationScore-manage',
            name: 'Safe1-2',
            component: '/demo/index',
            meta: { title: '标准化评分管理' },
            children: [
              {
                path:
                  '/safe-management/safeProduce-normalizing/standardizationScore-manage/safety-commitment',
                name: 'Safe1-2-1',
                component:
                  '/safe-management/safeProduce-normalizing/standardizationScore-manage/safety-commitment/index',
                meta: { title: '理念目标和矿长安全承诺' }
              },
              {
                path: '/safe-management/safeProduce-normalizing/standardizationScore-manage/organization',
                name: 'Safe1-2-2',
                component:
                  '/safe-management/safeProduce-normalizing/standardizationScore-manage/organization/index',
                meta: { title: '组织机构' }
              },
              {
                path:
                  '/safe-management/safeProduce-normalizing/standardizationScore-manage/security-manager-system',
                name: 'Safe1-2-3',
                component:
                  '/safe-management/safeProduce-normalizing/standardizationScore-manage/security-manager-system/index',
                meta: { title: '安全生产责任制及安全管理制度' }
              },
              {
                path:
                  '/safe-management/safeProduce-normalizing/standardizationScore-manage/person-quality',
                name: 'Safe1-2-4',
                component:
                  '/safe-management/safeProduce-normalizing/standardizationScore-manage/person-quality/index',
                meta: { title: '从业人员素质' }
              },
              {
                path: '/safe-management/safeProduce-normalizing/standardizationScore-manage/safe-risk',
                name: 'Safe1-2-5',
                component:
                  '/safe-management/safeProduce-normalizing/standardizationScore-manage/safe-risk/index',
                meta: { title: '安全风险分级管控' }
              },
              {
                path:
                  '/safe-management/safeProduce-normalizing/standardizationScore-manage/investigation-government',
                name: 'Safe1-2-6',
                component:
                  '/safe-management/safeProduce-normalizing/standardizationScore-manage/investigation-government/index',
                meta: { title: '事故隐患排查治理' }
              },
              {
                path:
                  '/safe-management/safeProduce-normalizing/standardizationScore-manage/quality-control-air',
                name: 'Safe1-2-7',
                component:
                  '/safe-management/safeProduce-normalizing/standardizationScore-manage/quality-control-air/index',
                meta: { title: '质量控制_通风' }
              },
              {
                path:
                  '/safe-management/safeProduce-normalizing/standardizationScore-manage/quailty-control-measure',
                name: 'Safe1-2-8',
                component:
                  '/safe-management/safeProduce-normalizing/standardizationScore-manage/quailty-control-measure/index',
                meta: { title: '质量控制_地质灾害防治与测量' }
              },
              {
                path:
                  '/safe-management/safeProduce-normalizing/standardizationScore-manage/quality-control-coalMining',
                name: 'Safe1-2-9',
                component:
                  '/safe-management/safeProduce-normalizing/standardizationScore-manage/quality-control-coalMining/index',
                meta: { title: '质量控制_采煤' }
              },
              {
                path:
                  '/safe-management/safeProduce-normalizing/standardizationScore-manage/quality-control-driving',
                name: 'Safe1-2-10',
                component:
                  '/safe-management/safeProduce-normalizing/standardizationScore-manage/quality-control-driving/index',
                meta: { title: '质量控制_掘进' }
              },
              {
                path:
                  '/safe-management/standard-scoring-manager/quality-control-electromechanical',
                name: 'Safe1-2-11',
                component:
                  '/safe-management/standard-scoring-manager/quality-control-electromechanical/index',
                meta: { title: '质量控制_机电' }
              },
              {
                path:
                  '/safe-management/standard-scoring-manager/quality-control-transport',
                name: 'Safe1-2-12',
                component:
                  '/safe-management/standard-scoring-manager/quality-control-transport/index',
                meta: { title: '质量控制_运输' }
              },
              {
                path:
                  '/safe-management/standard-scoring-manager/dispatch-emergency-manager',
                name: 'Safe1-2-13',
                component:
                  '/safe-management/standard-scoring-manager/dispatch-emergency-manager/index',
                meta: { title: '质量控制_调度和应急管理' }
              },
              {
                path:
                  '/safe-management/standard-scoring-manager/occupational-diseases-facilities',
                name: 'Safe1-2-14',
                component:
                  '/safe-management/standard-scoring-manager/occupational-diseases-facilities/index',
                meta: { title: '质量控制_职业病危害防治和地面设施' }
              },
              {
                path:
                  '/safe-management/standard-scoring-manager/continued-improve',
                name: 'Safe1-2-15',
                component:
                  '/safe-management/standard-scoring-manager/continued-improve/index',
                meta: { title: '持续改进' }
              }
            ]
          },
          {
            path: '/safe-management/safe1/safe1-3',
            name: 'Safe1-3',
            component: '/demo/index',
            meta: { title: '标准化评分汇总' }
          },
          {
            path: '/safe-management/safe1/safe1-4',
            name: 'Safe1-4',
            component: '/demo/index',
            meta: { title: '矿井地质类型设置' }
          },
          {
            path: '/safe-management/safe1/safe1-5',
            name: 'Safe1-5',
            component: '/demo/index',
            meta: { title: '标准化知识库' }
          }
        ]
      },
      {
        path: '/safe-management/safeRisk-gradeControl',
        name: 'Safe2',
        component: '/demo/index',
        meta: { title: '安全风险分级管控' },
        children: [
          {
            path: '/safe-management/safeRisk-gradeControl/management-system',
            name: 'Safe2-1',
            component: '/demo/index',
            meta: { title: '管理制度' },
            children: [
              {
                path: '/safe-management/safeRisk-gradeControl/management-system/management-system',
                name: 'Safe2-1-1',
                component: '/demo/table/upload/index',
                meta: { title: '安全风险分级管理制度' }
              },
              {
                path:
                  '/safe-management/safe1/safe1-1/safe1-1-1',
                name: 'Organization',
                component:
                  '/safe-management/risk-control/management-system/organization/index',
                meta: { title: '风险组织结构' }
              },
              {
                path:
                  '/safe-management/risk-control/management-system/liability-system',
                name: 'LiabilitySystem',
                component:
                  '/safe-management/risk-control/management-system/liability-system/index',
                meta: { title: '风险责任体系' }
              }
            ]
          },
          {
            path: '/safe-management/safe2/safe2-2',
            name: 'Safe2-2',
            component: '/demo/index',
            meta: { title: '年度辨识评估' },
            children: [
              {
                path: '/safe-management/safe2/safe2-2/safe2-2-1',
                name: 'Safe2-2-1',
                component: '/demo/table/upload/index',
                meta: { title: '年度辨识评估报告' }
              },
              {
                path:
                  '/safe-management/risk-control/assessment/assessment-library',
                name: 'AssessmentLibrary',
                component:
                  '/safe-management/risk-control/assessment/assessment-library/index',
                meta: { title: '风险辨识库' }
              }
            ]
          },
          {
            path: '/safe-management/safe2/safe2-3',
            name: 'Safe2-3',
            component: '/demo/index',
            meta: { title: '专项辨识：设计前' },
            children: [
              {
                path:
                  '/safe-management/risk-control/pre-design/pre-design-list',
                name: 'PreDesignList',
                component:
                  '/safe-management/risk-control/pre-design/pre-design-list/index',
                meta: { title: '设计前风险清单' }
              },
              {
                path: '/safe-management/safe2/safe2-3/safe2-3-2',
                name: 'Safe2-3-2',
                component: '/demo/table/upload/index',
                meta: { title: '设计前辨识报告' }
              }
            ]
          },
          {
            path: '/safe-management/safe2/safe2-4',
            name: 'Safe2-4',
            component: '/demo/index',
            meta: { title: '专项辨识：变化后' },
            children: [
              {
                path:
                  '/safe-management/risk-control/after-change/after-change-list',
                name: 'AfterChangeList',
                component:
                  '/safe-management/risk-control/after-change/after-change-list/index',
                meta: { title: '变化后风险清单' }
              },
              {
                path: '/safe-management/safe2/safe2-4/safe2-4-2',
                name: 'Safe2-4-2',
                component: '/demo/table/upload/index',
                meta: { title: '变化后辨识报告' }
              }
            ]
          },
          {
            path: '/safe-management/safe2/safe2-5',
            name: 'Safe2-5',
            component: '/demo/index',
            meta: { title: '专项辨识：施工前' },
            children: [
              {
                path:
                  '/safe-management/risk-control/pre-construct/pre-construct-list',
                name: 'PreConstructList',
                component:
                  '/safe-management/risk-control/pre-construct/pre-construct-list/index',
                meta: { title: '施工前风险清单' }
              },
              {
                path: '/safe-management/safe2/safe2-5/safe2-5-2',
                name: 'Safe2-5-2',
                component: '/demo/table/upload/index',
                meta: { title: '施工前辨识报告' }
              }
            ]
          },
          {
            path: '/safe-management/safe2/safe2-6',
            name: 'Safe2-6',
            component: '/demo/index',
            meta: { title: '专项辨识：事故后' },
            children: [
              {
                path:
                  '/safe-management/risk-control/after-accident/after-accident-list',
                name: 'AfterAccidentList',
                component:
                  '/safe-management/risk-control/after-accident/after-accident-list/index',
                meta: { title: '事故后风险清单' }
              },
              {
                path: '/safe-management/safe2/safe2-6/safe2-6-2',
                name: 'Safe2-6-2',
                component: '/demo/table/upload/index',
                meta: { title: '事故后辨识报告' }
              }
            ]
          },
          {
            path: '/safe-management/safe2/safe2-7',
            name: 'Safe2-7',
            component: '/demo/index',
            meta: { title: '现状风险辨识评估' }
          },
          {
            path: '/safe-management/risk-control/control-measure',
            name: 'ControlMeasure',
            component: '/safe-management/risk-control/control-measure/index',
            meta: { title: '安全风险管控' }
          },
          {
            path: '/safe-management/risk-control/risk-echart',
            name: 'RiskEchart',
            component: '/safe-management/risk-control/risk-echart/index',
            meta: { title: '风险分析' }
          }
        ]
      },
      {
        path: '/safe-management/safe3',
        name: 'Safe3',
        component: '/demo/index',
        meta: { title: '隐患排查治理' },
        children: [
          {
            path: '/safe-management/safe3/safe3-1',
            name: 'Safe3-1',
            component: '/demo/index',
            meta: { title: '工作机制' },
            children: [
              {
                path:
                  '/safe-management/hidden-danger/working-mechanism/organization',
                name: 'DangerOrganization',
                component:
                  '/safe-management/hidden-danger/working-mechanism/organization/index',
                meta: { title: '隐患组织结构' }
              },
              {
                path:
                  '/safe-management/hidden-danger/working-mechanism/liability-system',
                name: 'DangerLiability',
                component:
                  '/safe-management/hidden-danger/working-mechanism/liability-system/index',
                meta: { title: '隐患责任体系' }
              }
            ]
          },
          {
            path: '/safe-management/hidden-danger/danger-registration',
            name: 'DangerRegistration',
            component:
              '/safe-management/hidden-danger/danger-registration/index',
            meta: { title: '事故隐患登记' }
          },
          {
            path: '/safe-management/safe3/safe3-3',
            name: 'Safe3-3',
            component: '/demo/index',
            meta: { title: '隐患监督管理' },
            children: [
              {
                path:
                  '/safe-management/hidden-danger/danger-supervision/reform',
                name: 'Reform',
                component:
                  '/safe-management/hidden-danger/danger-supervision/reform/index',
                meta: { title: '隐患整改' }
              },
              {
                path:
                  '/safe-management/hidden-danger/danger-supervision/delay-approval',
                name: 'DelayApproval',
                component:
                  '/safe-management/hidden-danger/danger-supervision/delay-approval/index',
                meta: { title: '延期审批' }
              },
              {
                path:
                  '/safe-management/hidden-danger/danger-supervision/acceptance',
                name: 'Acceptance',
                component:
                  '/safe-management/hidden-danger/danger-supervision/acceptance/index',
                meta: { title: '隐患验收' }
              },
              {
                path:
                  '/safe-management/hidden-danger/danger-supervision/exceed',
                name: 'DangerExceed',
                component:
                  '/safe-management/hidden-danger/danger-supervision/exceed/index',
                meta: { title: '超期隐患' }
              },
              {
                path:
                  '/safe-management/hidden-danger/danger-supervision/supervision',
                name: 'DangerSupervision',
                component:
                  '/safe-management/hidden-danger/danger-supervision/supervision/index',
                meta: { title: '治理督办' }
              }
            ]
          },
          {
            path: '/safe-management/hidden-danger/danger-list',
            name: 'DangerList',
            component: '/safe-management/hidden-danger/danger-list/index',
            meta: { title: '隐患清单' }
          },
          {
            path: '/safe-management/hidden-danger/danger-echart',
            name: 'DangerEchart',
            component: '/safe-management/hidden-danger/danger-echart/index',
            meta: { title: '隐患统计分析' }
          }
        ]
      },
      {
        path: '/safe-management/safe4',
        name: 'Safe4',
        component: '/demo/index',
        meta: { title: '三违管理' },
        children: [
          {
            path: '/safe-management/three-violation/document-management',
            name: 'ViolationDocument',
            component: '/demo/table/upload/index',
            meta: { title: '三违文档管理' }
          },
          {
            path: '/safe-management/three-violation/register',
            name: 'ViolationRegister',
            component: '/safe-management/three-violation/register/index',
            meta: { title: '三违登记' }
          },
          {
            path: '/safe-management/three-violation/violation-echart',
            name: 'ViolationEchart',
            component:
              '/safe-management/three-violation/violation-echart/index',
            meta: { title: '三违分析' }
          }
        ]
      },
      {
        path: '/safe-management/safe5',
        name: 'Safe5',
        component: '/demo/index',
        meta: { title: '证照管理' },
        children: [
          {
            path: '/safe-management/safe5/safe5-1',
            name: 'Safe5-1',
            component: '/demo/index',
            meta: { title: '三证一照' }
          }
        ]
      },
      {
        path: '/safe-management/safe6',
        name: 'Safe6',
        component: '/demo/index',
        meta: { title: '职业卫生' },
        children: [
          {
            path: '/safe-management/safe6/safe6-1',
            name: 'Safe6-1',
            component: '/demo/index',
            meta: { title: '体检' }
          },
          {
            path: '/safe-management/safe6/safe6-2',
            name: 'Safe6-2',
            component: '/demo/index',
            meta: { title: '劳保发放' },
            children: [
              {
                path: '/safe-management/safe6/safe6-2/safe6-2-1',
                name: 'Safe6-2-1',
                component: '/demo/index',
                meta: { title: '年度计划' }
              },
              {
                path: '/safe-management/safe6/safe6-2/safe6-2-2',
                name: 'Safe6-2-2',
                component: '/demo/index',
                meta: { title: '季度计划' }
              },
              {
                path: '/safe-management/safe6/safe6-2/safe6-2-3',
                name: 'Safe6-2-3',
                component: '/demo/index',
                meta: { title: '劳保发放记录' }
              }
            ]
          },
          {
            path: '/safe-management/safe6/safe6-3',
            name: 'Safe6-3',
            component: '/demo/index',
            meta: { title: '职业病危害防治' }
          },
          {
            path: '/safe-management/safe6/safe6-4',
            name: 'Safe6-4',
            component: '/demo/index',
            meta: { title: '职业病危害告知' }
          }
        ]
      },
      {
        path: '/safe-management/safe7',
        name: 'Safe7',
        component: '/demo/index',
        meta: { title: '安全综合管理' },
        children: [
          {
            path: '/safe-management/safe7/safe7-1',
            name: 'Safe7-1',
            component: '/demo/index',
            meta: { title: '事故警示教育' }
          },
          {
            path: '/safe-management/safe7/safe7-2',
            name: 'Safe7-2',
            component: '/demo/index',
            meta: { title: '国家安全文件' }
          },
          {
            path: '/safe-management/safe7/safe7-3',
            name: 'Safe7-3',
            component: '/demo/index',
            meta: { title: '省市安全文件' }
          },
          {
            path: '/safe-management/safe7/safe7-4',
            name: 'Safe7-4',
            component: '/demo/index',
            meta: { title: '集团安全文件' }
          },
          {
            path: '/safe-management/safe7/safe7-5',
            name: 'Safe7-5',
            component: '/demo/index',
            meta: { title: '矿井安全文件' }
          },
          {
            path: '/safe-management/safe7/safe7-6',
            name: 'Safe7-6',
            component: '/demo/index',
            meta: { title: '矿井安全例会' }
          },
          {
            path: '/safe-management/safe7/safe7-7',
            name: 'Safe7-7',
            component: '/demo/index',
            meta: { title: '安全地点管理' }
          },
          {
            path: '/safe-management/safe7/safe7-8',
            name: 'Safe7-8',
            component: '/demo/index',
            meta: { title: '员工培训台账' }
          }
        ]
      }
    ]
  },
  // 应急救援
  // 已录入
  {
    path: '/emergency-rescue',
    name: 'DemoEmergency',
    component: 'Layout',
    redirect: '/emergency-rescue/rescue-plan/common-plan',
    meta: { title: '应急救援', important: true },
    children: [
      {
        path: '/emergency-rescue/emergency1',
        name: 'Emergency1',
        component: '/demo/index',
        meta: { title: '应急救援指南' },
        children: [
          {
            path: '/emergency-rescue/emergency1/emergency1-1',
            name: 'Emergency1-1',
            component: '/emergency-rescue/emergency-rescue-guide/accident-management/index',
            meta: { title: '事故管理' }
          },
          {
            path: '/emergency-rescue/emergency1/emergency1-2',
            name: 'Emergency1-2',
            component: '/demo/index',
            meta: { title: '应急流程管理' }
          }
        ]
      },
      {
        path: '/emergency-rescue/emergency2',
        name: 'Emergency2',
        component: '/demo/index',
        meta: { title: '应急救援预案' },
        children: [
          {
            path: '/emergency-rescue/rescue-plan/common-plan',
            name: 'EmergencyCommonPlan',
            component: '/emergency-rescue/rescue-plan/common-plan/index',
            meta: { title: '综合预案' }
          },
          {
            path: '/emergency-rescue/rescue-plan/special-plan',
            name: 'EmergencySpecialPlan',
            component: '/emergency-rescue/rescue-plan/special-plan/index',
            meta: { title: '专项预案' }
          },
          {
            path: '/emergency-rescue/rescue-plan/accident-plan',
            name: 'EmergencyAccidentPlan',
            component: '/emergency-rescue/rescue-plan/accident-plan/index',
            meta: { title: '事故处置方案' }
          }
        ]
      },
      {
        path: '/emergency-rescue/emergency3',
        name: 'Emergency3',
        component: '/demo/index',
        meta: { title: '应急救援保障' },
        children: [
          {
            path: '/emergency-rescue/emergency3/emergency3-1',
            name: 'Emergency3-1',
            component: '/demo/index',
            meta: { title: '应急通讯组织机构' }
          },
          {
            path: '/emergency-rescue/emergency3/emergency3-2',
            name: 'Emergency3-2',
            component: '/demo/index',
            meta: { title: '应急通讯' }
          },
          {
            path: '/emergency-rescue/emergency3/emergency3-3',
            name: 'Emergency3-3',
            component: '/demo/index',
            meta: { title: '应急队伍' }
          },
          {
            path: '/emergency-rescue/emergency3/emergency3-4',
            name: 'Emergency3-4',
            component: '/demo/index',
            meta: { title: '应急专家' }
          },
          {
            path: '/emergency-rescue/emergency3/emergency3-5',
            name: 'Emergency3-5',
            component: '/demo/index',
            meta: { title: '应急物资' }
          },
          {
            path: '/emergency-rescue/emergency3/emergency3-6',
            name: 'Emergency3-6',
            component: '/demo/index',
            meta: { title: '应急车辆' }
          },
          {
            path: '/emergency-rescue/emergency3/emergency3-7',
            name: 'Emergency3-7',
            component: '/demo/index',
            meta: { title: '应急医疗' }
          },
          {
            path: '/emergency-rescue/emergency3/emergency3-8',
            name: 'Emergency3-8',
            component: '/demo/index',
            meta: { title: '应急避险' }
          },
          {
            path: '/emergency-rescue/emergency3/emergency3-9',
            name: 'Emergency3-9',
            component: '/demo/index',
            meta: { title: '应急处置权' }
          }
        ]
      },
      {
        path: '/emergency-rescue/emergency4',
        name: 'Emergency4',
        component: '/demo/index',
        meta: { title: '日常管理' },
        children: [
          {
            path: '/emergency-rescue/emergency4/emergency4-1',
            name: 'Emergency4-1',
            component: '/demo/index',
            meta: { title: '事故调查报告' }
          },
          {
            path: '/emergency-rescue/emergency4/emergency4-2',
            name: 'Emergency4-2',
            component: '/demo/index',
            meta: { title: '应急演练' }
          }
        ]
      }
    ]
  },
  // 一通三防
  // 已录入
  {
    path: '/prevention-management',
    name: 'DemoPrevention',
    component: 'Layout',
    redirect: '/prevention-management/prevention1/prevention1-2',
    meta: { title: '一通三防', important: true },
    children: [
      // 已录入
      {
        path: '/prevention-management/prevention1',
        name: 'Prevention1',
        component: '/demo/index',
        meta: { title: '通风管理' },
        children: [
          {
            path: '/prevention-management/prevention1/prevention1-1',
            name: 'Prevention1-1',
            component: '/demo/index',
            meta: { title: '贯通措施' }
          },
          {
            path: '/prevention-management/prevention1/prevention1-2',
            name: 'Prevention1-2',
            component: '/demo/table/upload/index',
            meta: { title: '贯通记录' }
          },
          {
            path: '/prevention-management/ventilate-manage/gas-daily',
            name: 'Prevention1-3',
            component:
              '/prevention-management/ventilate-manage/gas-daily/index',
            meta: { title: '瓦斯日报' }
          },
          {
            path: '/prevention-management/prevention1/prevention1-4',
            name: 'Prevention1-4',
            component: '/demo/index',
            meta: { title: '通风设施' },
            children: [
              {
                path:
                  '/prevention-management/ventilate-manage/ventilation/wind-bridge-parameter',
                name: 'Prevention1-4-1',
                component:
                  '/prevention-management/ventilate-manage/ventilation/wind-bridge-parameter/index',
                meta: { title: '风门台账' }
              },
              {
                path:
                  '/prevention-management/prevention1/prevention1-4/prevention1-4-2',
                name: 'Prevention1-4-2',
                component: '/demo/table/upload/index',
                meta: { title: '密闭台账' }
              },
              {
                path:
                  '/prevention-management/prevention1/prevention1-4/prevention1-4-3',
                name: 'Prevention1-4-3',
                component: '/demo/table/upload/index',
                meta: { title: '挡风墙台账' }
              },
              {
                path:
                  '/prevention-management/ventilate-manage/ventilation/inspection-record',
                name: 'Prevention1-4-4',
                component:
                  '/prevention-management/ventilate-manage/ventilation/inspection-record/index',
                meta: { title: '通风设施验收记录' }
              }
            ]
          },
          {
            path: '/prevention-management/prevention1/prevention1-5',
            name: 'Prevention1-5',
            component: '/demo/table/upload/index',
            meta: { title: '甲烷传感器对照记录' }
          },
          {
            path: '/prevention-management/prevention1/prevention1-6',
            name: 'Prevention1-6',
            component: '/demo/table/upload/index',
            meta: { title: '便携仪发放记录' }
          },
          {
            path: '/prevention-management/prevention1/prevention1-7',
            name: 'Prevention1-7',
            component: '/demo/table/upload/index',
            meta: { title: '便携仪调校记录' }
          },
          {
            path: '/prevention-management/prevention1/prevention1-8',
            name: 'Prevention1-8',
            component: '/demo/table/upload/index',
            meta: { title: '安全技术措施' }
          },
          {
            path: '/prevention-management/prevention1/prevention1-9',
            name: 'Prevention1-9',
            component: '/demo/table/upload/index',
            meta: { title: '通风巷道检查记录' }
          },
          {
            path: '/prevention-management/ventilate-manage/anti-wind-record',
            name: 'Prevention1-10',
            component:
              '/prevention-management/ventilate-manage/anti-wind-record/index',
            meta: { title: '反风设施检查记录' }
          },
          {
            path: '/prevention-management/prevention1/prevention1-11',
            name: 'Prevention1-11',
            component: '/demo/table/upload/index',
            meta: { title: '测风记录' }
          },
          {
            path: '/prevention-management/prevention1/prevention1-12',
            name: 'Prevention1-12',
            component: '/demo/table/upload/index',
            meta: { title: '外部漏风率报告' }
          },
          {
            path: '/prevention-management/prevention1/prevention1-13',
            name: 'Prevention1-13',
            component: '/demo/table/upload/index',
            meta: { title: '反风演习' }
          },
          {
            path: '/prevention-management/prevention1/prevention1-14',
            name: 'Prevention1-14',
            component: '/demo/index',
            meta: { title: '通风月报' },
            children: [
              {
                path:
                  '/prevention-management/ventilate-manage/ventilate-monthly/submit',
                name: 'Prevention1-14-1',
                component:
                  '/prevention-management/ventilate-manage/ventilate-monthly/submit/index',
                meta: { title: '填报' }
              },
              {
                path:
                  '/prevention-management/ventilate-manage/ventilate-monthly/preview',
                name: 'Prevention1-14-2',
                component:
                  '/prevention-management/ventilate-manage/ventilate-monthly/preview/index',
                meta: { title: '预览' }
              }
            ]
          },
          {
            path: '/prevention-management/prevention1/prevention1-15',
            name: 'Prevention1-15',
            component: '/demo/index',
            meta: { title: '突出煤层掘进工作面防突月报' },
            children: [
              {
                path:
                  '/prevention-management/ventilate-manage/outburst-prevention-monthly/submit',
                name: 'Prevention1-15-1',
                component:
                  '/prevention-management/ventilate-manage/outburst-prevention-monthly/submit/index',
                meta: { title: '填报' }
              },
              {
                path:
                  '/prevention-management/ventilate-manage/outburst-prevention-monthly/preview',
                name: 'Prevention1-15-2',
                component:
                  '/prevention-management/ventilate-manage/outburst-prevention-monthly/preview/index',
                meta: { title: '预览' }
              }
            ]
          },
          {
            path: '/prevention-management/prevention1/prevention1-16',
            name: 'Prevention1-16',
            component: '/demo/index',
            meta: { title: '钻孔施工日报' },
            children: [
              {
                path:
                  '/prevention-management/ventilate-manage/drill-daily/submit',
                name: 'Prevention1-16-1',
                component:
                  '/prevention-management/ventilate-manage/drill-daily/submit/index',
                meta: { title: '填报' }
              },
              {
                path:
                  '/prevention-management/ventilate-manage/drill-daily/preview',
                name: 'Prevention1-16-2',
                component:
                  '/prevention-management/ventilate-manage/drill-daily/preview/index',
                meta: { title: '预览' }
              }
            ]
          },
          {
            path: '/prevention-management/prevention1/prevention1-17',
            name: 'Prevention1-17',
            component: '/demo/index',
            meta: { title: '通风旬报' },
            children: [
              {
                path:
                  '/prevention-management/ventilate-manage/ventilate-ten-day/ventilate-info',
                name: 'Prevention1-17-1',
                component:
                  '/prevention-management/ventilate-manage/ventilate-ten-day/ventilate-info/index',
                meta: { title: '通风信息旬报' }
              },
              {
                path:
                  '/prevention-management/ventilate-manage/ventilate-ten-day/mrtn-report',
                name: 'Prevention1-17-2',
                component:
                  '/prevention-management/ventilate-manage/ventilate-ten-day/mrtn-report/index',
                meta: { title: '回风量旬报表' }
              },
              {
                path:
                  '/prevention-management/ventilate-manage/ventilate-ten-day/coalface-report',
                name: 'Prevention1-17-3',
                component:
                  '/prevention-management/ventilate-manage/ventilate-ten-day/coalface-report/index',
                meta: { title: '掘进面旬报表' }
              },
              {
                path:
                  '/prevention-management/ventilate-manage/ventilate-ten-day/working-situation-report',
                name: 'Prevention1-17-4',
                component:
                  '/prevention-management/ventilate-manage/ventilate-ten-day/working-situation-report/index',
                meta: { title: '采煤工作面通风情况旬报表' }
              }
            ]
          }
        ]
      },
      // 已录入
      {
        path: '/prevention-management/prevention2',
        name: 'Prevention2',
        component: '/demo/index',
        meta: { title: '瓦斯管理' },
        children: [
          {
            path: '/prevention-management/prevention2-1',
            name: 'Prevention2-1',
            component: '/demo/index',
            meta: { title: '瓦斯鉴定报告' },
            children: [
              {
                path:
                  '/prevention-management/gas-manage/survey-report/ventilate',
                name: 'Prevention2-1-1',
                component:
                  '/prevention-management/gas-manage/survey-report/ventilate/index',
                meta: { title: '通风旬报' }
              }
            ]
          },
          {
            path: '/prevention-management/prevention2-2',
            name: 'Prevention2-2',
            component: '/demo/index',
            meta: { title: '瓦斯抽采' },
            children: [
              {
                path: '/prevention-management/prevention2-2/prevention2-2-1',
                name: 'Prevention2-2-1',
                component: '/demo/index',
                meta: { title: '巡查报告' }
              },
              {
                path: '/prevention-management/prevention2-2/prevention2-2-2',
                name: 'Prevention2-2-2',
                component: '/demo/index',
                meta: { title: '抽采对比台账' }
              },
              {
                path: '/prevention-management/prevention2-2/prevention2-2-3',
                name: 'Prevention2-2-3',
                component: '/demo/index',
                meta: { title: '管路巡查台账' }
              },
              {
                path: '/prevention-management/prevention2-2/prevention2-2-4',
                name: 'Prevention2-2-4',
                component: '/demo/index',
                meta: { title: '抽采阻力测定报告' }
              },
              {
                path: '/prevention-management/prevention2-2/prevention2-2-5',
                name: 'Prevention2-2-5',
                component: '/demo/index',
                meta: { title: '掉钻记录' }
              },
              {
                path: '/prevention-management/prevention2-2/prevention2-2-6',
                name: 'Prevention2-2-6',
                component: '/demo/index',
                meta: { title: '钻孔设计' }
              },
              {
                path: '/prevention-management/prevention2-2/prevention2-2-7',
                name: 'Prevention2-2-7',
                component: '/demo/index',
                meta: { title: '抽采管路设计' }
              },
              {
                path: '/prevention-management/prevention2-2/prevention2-2-8',
                name: 'Prevention2-2-8',
                component: '/demo/index',
                meta: { title: '抽采达标评判报告' }
              },
              {
                path: '/prevention-management/prevention2-2/prevention2-2-9',
                name: 'Prevention2-2-9',
                component: '/demo/index',
                meta: { title: '瓦斯抽采设计' }
              }
            ]
          },
          {
            path: '/prevention-management/prevention2-3',
            name: 'Prevention2-3',
            component: '/demo/index',
            meta: { title: '瓦斯超限记录' }
          },
          {
            path: '/prevention-management/prevention2-4',
            name: 'Prevention2-4',
            component: '/demo/index',
            meta: { title: '瓦斯排放措施' }
          },
          {
            path: '/prevention-management/prevention2-5',
            name: 'Prevention2-5',
            component: '/demo/index',
            meta: { title: '瓦斯排放记录' }
          },
          {
            path: '/prevention-management/prevention2-6',
            name: 'Prevention2-6',
            component: '/demo/index',
            meta: { title: '瓦斯防治中长期规划' }
          },
          {
            path: '/prevention-management/prevention2-7',
            name: 'Prevention2-7',
            component: '/demo/index',
            meta: { title: '通风阻力测定报告' }
          },
          {
            path: '/prevention-management/prevention2-8',
            name: 'Prevention2-8',
            component: '/demo/index',
            meta: { title: '通风阻力测定报告' }
          },
          {
            path: '/prevention-management/prevention2-9',
            name: 'Prevention2-9',
            component: '/demo/index',
            meta: { title: '防突管理' },
            children: [
              {
                path: '/prevention-management/prevention2-9/prevention2-9-1',
                name: 'Prevention2-9-1',
                component: '/demo/index',
                meta: { title: '工作面区域防突设计及措施' }
              },
              {
                path: '/prevention-management/prevention2-9/prevention2-9-2',
                name: 'Prevention2-9-2',
                component: '/demo/index',
                meta: { title: '年度、季度、月度防突措施实施计划' }
              },
              {
                path: '/prevention-management/prevention2-9/prevention2-9-3',
                name: 'Prevention2-9-3',
                component: '/demo/index',
                meta: { title: '工作面抽采达标评判报告' }
              },
              {
                path: '/prevention-management/prevention2-9/prevention2-9-4',
                name: 'Prevention2-9-4',
                component: '/demo/index',
                meta: { title: '区域验证（局部措施效果检验）报表' }
              },
              {
                path: '/prevention-management/prevention2-9/prevention2-9-5',
                name: 'Prevention2-9-5',
                component: '/demo/index',
                meta: { title: '工作面防突措施' }
              }
            ]
          },
          {
            path: '/prevention-management/prevention2-10',
            name: 'Prevention2-10',
            component: '/demo/index',
            meta: { title: '采煤工作面瓦斯涌出量报表' },
            children: [
              {
                path: '/prevention-management/prevention2-10/prevention2-10-1',
                name: 'Prevention2-10-1',
                component: '/demo/index',
                meta: { title: '填报' }
              },
              {
                path: '/prevention-management/prevention2-10/prevention2-10-2',
                name: 'Prevention2-10-2',
                component: '/demo/index',
                meta: { title: '预览' }
              }
            ]
          },
          {
            path: '/prevention-management/prevention2-11',
            name: 'Prevention2-11',
            component: '/demo/index',
            meta: { title: '采煤工作面瓦斯治理月报' },
            children: [
              {
                path: '/prevention-management/prevention2-11/prevention2-11-1',
                name: 'Prevention2-11-1',
                component: '/demo/index',
                meta: { title: '填报' }
              },
              {
                path: '/prevention-management/prevention2-11/prevention2-11-2',
                name: 'Prevention2-11-2',
                component: '/demo/index',
                meta: { title: '预览' }
              }
            ]
          },
          {
            path: '/prevention-management/prevention2-12',
            name: 'Prevention2-12',
            component: '/demo/index',
            meta: { title: '贯通、排瓦斯月报' },
            children: [
              {
                path: '/prevention-management/prevention2-12/prevention2-12-1',
                name: 'Prevention2-12-1',
                component: '/demo/index',
                meta: { title: '填报' }
              },
              {
                path: '/prevention-management/prevention2-12/prevention2-12-2',
                name: 'Prevention2-12-2',
                component: '/demo/index',
                meta: { title: '预览' }
              }
            ]
          },
          {
            path: '/prevention-management/prevention2-13',
            name: 'Prevention2-13',
            component: '/demo/index',
            meta: { title: '瓦斯利用日报' },
            children: [
              {
                path: '/prevention-management/gas-manage/use-gas-daily/submit',
                name: 'Prevention2-13-1',
                component:
                  '/prevention-management/gas-manage/use-gas-daily/submit/index',
                meta: { title: '填报' }
              },
              {
                path: '/prevention-management/prevention2-13/prevention2-13-2',
                name: 'Prevention2-13-2',
                component: '/demo/index',
                meta: { title: '预览' }
              }
            ]
          },
          {
            path: '/prevention-management/prevention2-14',
            name: 'Prevention2-14',
            component: '/demo/index',
            meta: { title: '瓦斯利用月报' },
            children: [
              {
                path: '/prevention-management/prevention2-14/prevention2-14-1',
                name: 'Prevention2-14-1',
                component: '/demo/index',
                meta: { title: '填报' }
              },
              {
                path: '/prevention-management/prevention2-14/prevention2-14-2',
                name: 'Prevention2-14-2',
                component: '/demo/index',
                meta: { title: '预览' }
              }
            ]
          },
          {
            path: '/prevention-management/prevention2-15',
            name: 'Prevention2-15',
            component: '/demo/index',
            meta: { title: '重点瓦斯日报' },
            children: [
              {
                path:
                  '/prevention-management/gas-manage/focus-gas-daily/submit',
                name: 'Prevention2-15-1',
                component:
                  '/prevention-management/gas-manage/focus-gas-daily/submit/index',
                meta: { title: '填报' }
              },
              {
                path:
                  '/prevention-management/gas-manage/focus-gas-daily/preview',
                name: 'Prevention2-15-2',
                component:
                  '/prevention-management/gas-manage/focus-gas-daily/preview/index',
                meta: { title: '预览' }
              }
            ]
          }
        ]
      },
      // 已录入
      {
        path: '/prevention-management/prevention3',
        name: 'Prevention3',
        component: '/demo/index',
        meta: { title: '防火管理' },
        children: [
          {
            path: '/prevention-management/prevention3/prevention3-1',
            name: 'Prevention3-1',
            component: '/demo/index',
            meta: { title: '防火门台账填报' }
          },
          {
            path: '/prevention-management/prevention3/prevention3-2',
            name: 'Prevention3-2',
            component: '/demo/index',
            meta: { title: '煤层自燃倾向性鉴定报告' },
            children: [
              {
                path:
                  '/prevention-management/prevention3/prevention3-2/prevention3-2-1',
                name: 'Prevention3-2-1',
                component: '/demo/index',
                meta: { title: '预览' }
              }
            ]
          },
          {
            path: '/prevention-management/prevention3/prevention3-3',
            name: 'Prevention3-3',
            component: '/demo/index',
            meta: { title: '隔爆水袋检查记录' }
          },
          {
            path: '/prevention-management/prevention3/prevention3-4',
            name: 'Prevention3-4',
            component: '/demo/index',
            meta: { title: '防火报表' }
          },
          {
            path: '/prevention-management/prevention3/prevention3-5',
            name: 'Prevention3-5',
            component: '/demo/index',
            meta: { title: '灌浆注氮记录' }
          },
          {
            path: '/prevention-management/prevention3/prevention3-6',
            name: 'Prevention3-6',
            component: '/demo/index',
            meta: { title: '防火月报' },
            children: [
              {
                path: '/prevention-management/fire-manage/fire-monthly/submit',
                name: 'Prevention3-6-1',
                component:
                  '/prevention-management/fire-manage/fire-monthly/submit/index',
                meta: { title: '填报' }
              },
              {
                path: '/prevention-management/fire-manage/fire-monthly/preview',
                name: 'Prevention3-6-2',
                component:
                  '/prevention-management/fire-manage/fire-monthly/preview/index',
                meta: { title: '预览' }
              }
            ]
          }
        ]
      },
      // 已录入
      {
        path: '/prevention-management/prevention4',
        name: 'Prevention4',
        component: '/demo/index',
        meta: { title: '防尘管理' },
        children: [
          {
            path: '/prevention-management/prevention4/prevention4-1',
            name: 'Prevention4-1',
            component: '/demo/index',
            meta: { title: '防尘设施台账' }
          },
          {
            path: '/prevention-management/prevention4/prevention4-2',
            name: 'Prevention4-2',
            component: '/demo/index',
            meta: { title: '测尘记录' }
          },
          {
            path: '/prevention-management/prevention4/prevention4-3',
            name: 'Prevention4-3',
            component: '/demo/index',
            meta: { title: '冲尘记录' }
          },
          {
            path: '/prevention-management/prevention4/prevention4-4',
            name: 'Prevention4-4',
            component: '/demo/index',
            meta: { title: '测尘月报' }
          },
          {
            path: '/prevention-management/prevention4/prevention4-5',
            name: 'Prevention4-5',
            component: '/demo/index',
            meta: { title: '煤尘爆炸危险性鉴定报告' }
          },
          {
            path: '/prevention-management/prevention4/prevention4-6',
            name: 'Prevention4-6',
            component: '/demo/index',
            meta: { title: '防尘月报' },
            children: [
              {
                path:
                  '/prevention-management/prevention4/prevention4-6/prevention4-6-1',
                name: 'Prevention4-6-1',
                component: '/demo/index',
                meta: { title: '采掘面防尘情况月报' }
              },
              {
                path:
                  '/prevention-management/prevention4/prevention4-6/prevention4-6-2',
                name: 'Prevention4-6-2',
                component: '/demo/index',
                meta: { title: '防治高尘措施场所月报' }
              },
              {
                path:
                  '/prevention-management/prevention4/prevention4-6/prevention4-6-3',
                name: 'Prevention4-6-3',
                component: '/demo/index',
                meta: { title: '粉尘浓度情况与测尘仪型号月报表' }
              },
              {
                path:
                  '/prevention-management/prevention4/prevention4-6/prevention4-6-4',
                name: 'Prevention4-6-4',
                component: '/demo/index',
                meta: { title: '采掘面粉尘浓度检测月报' }
              },
              {
                path:
                  '/prevention-management/prevention4/prevention4-6/prevention4-6-5',
                name: 'Prevention4-6-5',
                component: '/demo/index',
                meta: { title: '防尘月报' }
              }
            ]
          }
        ]
      },
      // 已录入
      {
        path: '/prevention-management/prevention5',
        name: 'Prevention5',
        component: '/demo/index',
        meta: { title: '安全监控管理' },
        children: [
          {
            path: '/prevention-management/safety-manage/equipment-ledger',
            name: 'Prevention5-1',
            component:
              '/prevention-management/safety-manage/equipment-ledger/index',
            meta: { title: '监控设备管理台账' }
          },
          {
            path: '/prevention-management/prevention5/prevention5-2',
            name: 'Prevention5-2',
            component: '/demo/index',
            meta: { title: '安全监控设备检查、测试记录' },
            children: [
              {
                path:
                  '/prevention-management/prevention5/prevention5-2/prevention5-2-1',
                name: 'Prevention5-2-1',
                component: '/demo/index',
                meta: { title: '三分闭锁测试记录' }
              },
              {
                path:
                  '/prevention-management/prevention5/prevention5-2/prevention5-2-2',
                name: 'Prevention5-2-2',
                component: '/demo/index',
                meta: { title: '井下巡检记录' }
              },
              {
                path:
                  '/prevention-management/prevention5/prevention5-2/prevention5-2-3',
                name: 'Prevention5-2-3',
                component: '/demo/index',
                meta: { title: '避雷设施检查记录' }
              },
              {
                path:
                  '/prevention-management/prevention5/prevention5-2/prevention5-2-4',
                name: 'Prevention5-2-4',
                component: '/demo/index',
                meta: { title: '监控机房UPS电源测试记录' }
              }
            ]
          },
          {
            path: '/prevention-management/safety-manage/monitoring-record',
            name: 'Prevention5-3',
            component:
              '/prevention-management/safety-manage/monitoring-record/index',
            meta: { title: '监控传感器校验记录' }
          },
          {
            path: '/prevention-management/prevention5/prevention5-4',
            name: 'Prevention5-4',
            component: '/demo/index',
            meta: { title: '监控月报上传' }
          },
          {
            path: '/prevention-management/prevention5/prevention5-5',
            name: 'Prevention5-5',
            component: '/demo/index',
            meta: { title: '监控设备故障记录' }
          },
          {
            path: '/prevention-management/prevention5/prevention5-6',
            name: 'Prevention5-6',
            component: '/demo/index',
            meta: { title: '监控月报' },
            children: [
              {
                path:
                  '/prevention-management/prevention5/prevention5-6/prevention5-6-1',
                name: 'Prevention5-6-1',
                component: '/demo/index',
                meta: { title: '安全监控系统故障统计表' }
              },
              {
                path:
                  '/prevention-management/prevention5/prevention5-6/prevention5-6-2',
                name: 'Prevention5-6-2',
                component: '/demo/index',
                meta: { title: '安全监控系统装备情况表' }
              },
              {
                path:
                  '/prevention-management/prevention5/prevention5-6/prevention5-6-3',
                name: 'Prevention5-6-3',
                component: '/demo/index',
                meta: { title: '抽采自动计量装备情况表' }
              },
              {
                path:
                  '/prevention-management/prevention5/prevention5-6/prevention5-6-4',
                name: 'Prevention5-6-4',
                component: '/demo/index',
                meta: { title: '设备使用情况表' }
              },
              {
                path:
                  '/prevention-management/prevention5/prevention5-6/prevention5-6-5',
                name: 'Prevention5-6-5',
                component: '/demo/index',
                meta: { title: '采掘开等场所各类传感器安设情况表' }
              },
              {
                path:
                  '/prevention-management/prevention5/prevention5-6/prevention5-6-6',
                name: 'Prevention5-6-6',
                component: '/demo/index',
                meta: { title: '监控月报' }
              }
            ]
          }
        ]
      },
      // 已录入
      {
        path: '/prevention-management/prevention6',
        name: 'Prevention6',
        component: '/demo/index',
        meta: { title: '通防图件' },
        children: [
          {
            path: '/prevention-management/prevention6/prevention6-1',
            name: 'Prevention6-1',
            component: '/demo/index',
            meta: { title: '通风系统图' }
          },
          {
            path: '/prevention-management/prevention6/prevention6-2',
            name: 'Prevention6-2',
            component: '/demo/index',
            meta: { title: '通风立体示意图' }
          },
          {
            path: '/prevention-management/prevention6/prevention6-3',
            name: 'Prevention6-3',
            component: '/demo/index',
            meta: { title: '通风网络图' }
          },
          {
            path: '/prevention-management/prevention6/prevention6-4',
            name: 'Prevention6-4',
            component: '/demo/index',
            meta: { title: '瓦斯地质图' }
          },
          {
            path: '/prevention-management/prevention6/prevention6-5',
            name: 'Prevention6-5',
            component: '/demo/index',
            meta: { title: '防尘、防火系统图' }
          },
          {
            path: '/prevention-management/prevention6/prevention6-6',
            name: 'Prevention6-6',
            component: '/demo/index',
            meta: { title: '避灾路线图' }
          },
          {
            path: '/prevention-management/prevention6/prevention6-7',
            name: 'Prevention6-7',
            component: '/demo/index',
            meta: { title: '安全监控系统布置图' }
          },
          {
            path: '/prevention-management/prevention6/prevention6-8',
            name: 'Prevention6-8',
            component: '/demo/index',
            meta: { title: '安全监控系统断电控制图' }
          },
          {
            path: '/prevention-management/prevention6/prevention6-9',
            name: 'Prevention6-9',
            component: '/demo/index',
            meta: { title: '瓦斯抽采系统图' }
          },
          {
            path: '/prevention-management/prevention6/prevention6-10',
            name: 'Prevention6-10',
            component: '/demo/index',
            meta: { title: '安全监控网络拓扑图' }
          }
        ]
      },
      // 已录入
      {
        path: '/prevention-management/prevention7',
        name: 'Prevention7',
        component: '/demo/index',
        meta: { title: '基础管理' },
        children: [
          {
            path: '/prevention-management/prevention7/prevention7-1',
            name: 'Prevention7-1',
            component: '/demo/index',
            meta: { title: '管理制度' }
          },
          {
            path: '/prevention-management/prevention7/prevention7-2',
            name: 'Prevention7-2',
            component: '/demo/index',
            meta: { title: '岗位责任制度' }
          },
          {
            path: '/prevention-management/prevention7/prevention7-3',
            name: 'Prevention7-3',
            component: '/demo/index',
            meta: { title: '岗位操作规程' }
          },
          {
            path: '/prevention-management/prevention7/prevention7-4',
            name: 'Prevention7-4',
            component: '/demo/index',
            meta: { title: '“一通三防”例会' }
          },
          {
            path: '/prevention-management/prevention7/prevention7-5',
            name: 'Prevention7-5',
            component: '/demo/index',
            meta: { title: '“一通三防”工作总结' }
          },
          {
            path: '/prevention-management/prevention7/prevention7-6',
            name: 'Prevention7-6',
            component: '/demo/index',
            meta: { title: '通风人员配置' }
          },
          {
            path: '/prevention-management/prevention7/prevention7-7',
            name: 'Prevention7-7',
            component: '/demo/index',
            meta: { title: '风险辨识及隐患排查' }
          },
          {
            path: '/prevention-management/prevention7/prevention7-8',
            name: 'Prevention7-8',
            component: '/demo/index',
            meta: { title: '通防任务计划提醒' },
            children: [
              {
                path:
                  '/prevention-management/prevention7/prevention7-8/prevention7-8-1',
                name: 'Prevention7-8-1',
                component: '/demo/index',
                meta: { title: '任务计划提醒' }
              },
              {
                path:
                  '/prevention-management/prevention7/prevention7-8/prevention7-8-2',
                name: 'Prevention7-8-2',
                component: '/demo/index',
                meta: { title: '通防提醒日历' }
              },
              {
                path:
                  '/prevention-management/prevention7/prevention7-8/prevention7-8-3',
                name: 'Prevention7-8-3',
                component: '/demo/index',
                meta: { title: '通防任务计划执行' }
              }
            ]
          }
        ]
      }
    ]
  },
  // 机电运输
  {
    path: '/mechatronics',
    name: 'DemoMechanical',
    component: 'Layout',
    redirect: '/mechatronics/mechanical-manage/large-equipment-manage',
    meta: { title: '机电运输', important: true },
    children: [
      {
        path: '/mechatronics/mechanical-manage',
        name: 'Mechanical1',
        component: '/mechatronics/mechanical-manage/index',
        meta: { title: '机电管理' },
        children: [
          {
            path: '/mechatronics/mechanical-manage/large-equipment-manage',
            name: 'Mechanical1-1',
            component: '/mechatronics/mechanical-manage/large-equipment-manage/index',
            meta: { title: '大型设备管理' }
          },
          {
            path: '/mechatronics/mechanical-manage/large-equipment-type',
            name: 'Mechanical1-2',
            component: '/mechatronics/mechanical-manage/large-equipment-type/index',
            meta: { title: '大型设备类型' }
          },
          {
            path: '/mechatronics/mechanical-manage/maintain-knowledge',
            name: 'Mechanical1-3',
            component: '/mechatronics/mechanical-manage/maintain-knowledge/index',
            meta: { title: '维修知识库' }
          },
          {
            path: '/mechatronics/mechanical-manage/dissipation-knowledge',
            name: 'Mechanical1-4',
            component: '/mechatronics/mechanical-manage/dissipation-knowledge/index',
            meta: { title: '设备能耗分析知识库' }
          },
          {
            path: '/mechatronics/mechanical-manage/mechanical-document',
            name: 'Mechanical1-5',
            component: '/mechatronics/mechanical-manage/mechanical-document/index',
            meta: { title: '机电数字文档' }
          }
        ]
      },
      {
        path: '/mechatronics/transportation-manage',
        name: 'Mechanical2',
        component: '/mechatronics/transportation-manage/index',
        meta: { title: '运输管理' },
        children: [
          {
            path: '/mechatronics/transportation-manage/large-equipment-manage',
            name: 'EquipmentManagement',
            component: '/mechatronics/transportation-manage/large-equipment-manage/index',
            meta: { title: '大型设备管理' }
          },
          {
            path: '/mechatronics/transportation-manage/large-equipment-type',
            name: 'EquipmentType',
            component: '/mechatronics/transportation-manage/large-equipment-type/index',
            meta: { title: '大型设备类型' }
          },
          {
            path: '/mechatronics/transportation-manage/typical-fault',
            name: 'TypicalFault',
            component: '/mechatronics/transportation-manage/typical-fault/index',
            meta: { title: '典型故障知识库' }
          },
          {
            path: '/mechatronics/transportation-manage/history-fault',
            name: 'HistoryFault',
            component: '/mechatronics/transportation-manage/history-fault/index',
            meta: { title: '历史故障知识库' }
          },
          {
            path: '/mechatronics/transportation-manage/transportation-document',
            name: 'TransportationDocument',
            component: '/mechatronics/transportation-manage/transportation-document/index',
            meta: { title: '运输数字文档' }
          }
        ]
      },
      {
        path: '/mechatronics/service-manage',
        name: 'Mechanical3',
        component: '/mechatronics/service-manage/index',
        meta: { title: '检修管理' },
        children: [
          {
            path: '/mechatronics/service-manage/service-plan',
            name: 'ServicePlan',
            component: '/mechatronics/service-manage/service-plan/index',
            meta: { title: '检修计划' }
          },
          {
            path: '/mechatronics/service-manage/daily-service-manage',
            name: 'DailyServiceManage',
            component: '/mechatronics/service-manage/daily-service-manage/index',
            meta: { title: '日常维检管理' }
          },
          {
            path: '/mechatronics/service-manage/daily-service-calendar',
            name: 'DailyServiceCalendar',
            component: '/mechatronics/service-manage/daily-service-calendar/index',
            meta: { title: '日常维检日历' }
          },
          {
            path: '/mechatronics/service-manage/equipment-service',
            name: 'EquipmentService',
            component: '/mechatronics/service-manage/equipment-service/index',
            meta: { title: '设备维修' }
          },
          {
            path: '/mechatronics/service-manage/spare-parts',
            name: 'SpareParts',
            component: '/mechatronics/service-manage/spare-parts/index',
            meta: { title: '备品备件' }
          }
        ]
      },
      {
        path: '/mechatronics/equipment-manage',
        name: 'Mechanical4',
        component: '/mechatronics/equipment-manage/index',
        meta: { title: '设备管理' },
        children: [
          {
            path: '/mechatronics/equipment-manage/supplier-manage',
            name: 'SupplierManage',
            component: '/mechatronics/equipment-manage/supplier-manage/index',
            meta: { title: '供应商管理' }
          },
          {
            path: '/mechatronics/equipment-manage/category-manage',
            name: 'CategoryManage',
            component: '/mechatronics/equipment-manage/category-manage/index',
            meta: { title: '设备类型管理' }
          },
          {
            path: '/mechatronics/equipment-manage/model-manage',
            name: 'ModelManage',
            component: '/mechatronics/equipment-manage/model-manage/index',
            meta: { title: '设备型号管理' }
          },
          {
            path: '/mechatronics/equipment-manage/storage-manage',
            name: 'StorageManage',
            component: '/mechatronics/equipment-manage/storage-manage/index',
            meta: { title: '设备出入库' }
          },
          {
            path: '/mechatronics/equipment-manage/using-equipment',
            name: 'UsingEquipment',
            component: '/mechatronics/equipment-manage/using-equipment/index',
            meta: { title: '在用设备' }
          },
          {
            path: '/mechatronics/equipment-manage/repair-manage',
            name: 'RepairManage',
            component: '/mechatronics/equipment-manage/repair-manage/index',
            meta: { title: '设备维修' }
          },
          {
            path: '/mechatronics/equipment-manage/scrap-manage',
            name: 'ScrapManage',
            component: '/mechatronics/equipment-manage/scrap-manage/index',
            meta: { title: '设备报废' }
          },
          {
            path: '/mechatronics/equipment-manage/standing-book',
            name: 'StandingBook',
            component: '/mechatronics/equipment-manage/standing-book/index',
            meta: { title: '设备台账' }
          },
          {
            path: '/mechatronics/equipment-manage/certificate-manage',
            name: 'CertificateManage',
            component: '/mechatronics/equipment-manage/certificate-manage/index',
            meta: { title: '设备证书' }
          },
          {
            path: '/mechatronics/equipment-manage/equipment-summary-sheet',
            name: 'EquipmentSummarySheet',
            component: '/mechatronics/equipment-manage/equipment-summary-sheet/index',
            meta: { title: '生产设备汇总表' }
          }
        ]
      },
      {
        path: '/mechatronics/power-supply',
        name: 'Mechanical5',
        component: '/mechatronics/power-supply/index',
        meta: { title: '供电管理' },
        children: [
          {
            path: '/mechatronics/power-supply/encode-manage',
            name: 'Mechanical5-1',
            component: '/mechatronics/power-supply/encode-manage/index',
            meta: { title: '编码管理' }
          },
          {
            path: '/mechatronics/power-supply/cable-storage',
            name: 'Mechanical5-2',
            component: '/mechatronics/power-supply/cable-storage/index',
            meta: { title: '电缆出入库' }
          },
          {
            path: '/mechatronics/power-supply/using-cable',
            name: 'Mechanical5-3',
            component: '/mechatronics/power-supply/using-cable/index',
            meta: { title: '在用电缆' }
          },
          {
            path: '/mechatronics/power-supply/cable-scrap',
            name: 'Mechanical5-4',
            component: '/mechatronics/power-supply/cable-scrap/index',
            meta: { title: '电缆报废' }
          },
          {
            path: '/mechatronics/power-supply/cable-ledger',
            name: 'Mechanical5-5',
            component: '/mechatronics/power-supply/cable-ledger/index',
            meta: { title: '电缆台账' }
          },
          {
            path: '/mechatronics/power-supply/power-consumption',
            name: 'Mechanical5-6',
            component: '/mechatronics/power-supply/power-consumption/index',
            meta: { title: '用电量管理' },
            children: [
              {
                path: '/mechatronics/power-supply/power-consumption/team-report-1',
                name: 'Mechanical5-6-1',
                component: '/mechatronics/power-supply/power-consumption/team-report-1/index',
                meta: { title: '供电一队上报' }
              },
              {
                path: '/mechatronics/power-supply/power-consumption/team-report-2',
                name: 'Mechanical5-6-2',
                component: '/mechatronics/power-supply/power-consumption/team-report-2/index',
                meta: { title: '供电二队上报' }
              }
            ]
          },
          {
            path: '/mechatronics/power-supply/approve',
            name: 'Mechanical5-7',
            component: '/mechatronics/power-supply/approve/index',
            meta: { title: '停供电申请审批' },
            children: [
              {
                path: '/mechatronics/power-supply/approve/apply',
                name: 'Mechanical5-7-1',
                component: '/mechatronics/power-supply/approve/apply/index',
                meta: { title: '停供电申请' }
              },
              {
                path: '/mechatronics/power-supply/approve/organ-audit',
                name: 'Mechanical5-7-2',
                component: '/mechatronics/power-supply/approve/organ-audit/index',
                meta: { title: '单位审核' }
              },
              {
                path: '/mechatronics/power-supply/approve/administrator-audit',
                name: 'Mechanical5-7-3',
                component: '/mechatronics/power-supply/approve/administrator-audit/index',
                meta: { title: '电管员审核' }
              },
              {
                path: '/mechatronics/power-supply/approve/group-audit',
                name: 'Mechanical5-7-4',
                component: '/mechatronics/power-supply/approve/group-audit/index',
                meta: { title: '电管班审核' }
              },
              {
                path: '/mechatronics/power-supply/approve/affect-audit',
                name: 'Mechanical5-7-5',
                component: '/mechatronics/power-supply/approve/affect-audit/index',
                meta: { title: '影响单位审核' }
              },
              {
                path: '/mechatronics/power-supply/approve/fixed-audit',
                name: 'Mechanical5-7-6',
                component: '/mechatronics/power-supply/approve/fixed-audit/index',
                meta: { title: '固定单位审核' }
              },
              {
                path: '/mechatronics/power-supply/approve/leader-audit',
                name: 'Mechanical5-7-7',
                component: '/mechatronics/power-supply/approve/leader-audit/index',
                meta: { title: '机电领导审核' }
              },
              {
                path: '/mechatronics/power-supply/approve/duty-audit',
                name: 'Mechanical5-7-8',
                component: '/mechatronics/power-supply/approve/duty-audit/index',
                meta: { title: '矿总值班审核' }
              }
            ]
          }
        ]
      },
      {
        path: '/mechatronics/mechanical-maps',
        name: 'Mechanical6',
        component: '/mechanical-maps/index',
        meta: { title: '机电图件' },
        children: [
          {
            path: '/mechatronics/mechanical-maps/drain',
            name: 'Mechanical6-1',
            component: '/mechatronics/mechanical-maps/drain/index',
            meta: { title: '主排水系统图' }
          },
          {
            path: '/mechatronics/mechanical-maps/water-supply',
            name: 'Mechanical6-2',
            component: '/mechatronics/mechanical-maps/water-supply/index',
            meta: { title: '供水系统图' }
          },
          {
            path: '/mechatronics/mechanical-maps/pressure-air',
            name: 'Mechanical6-3',
            component: '/mechatronics/mechanical-maps/pressure-air/index',
            meta: { title: '压风系统图' }
          },
          {
            path: '/mechatronics/mechanical-maps/equipment-layout',
            name: 'Mechanical6-4',
            component: '/mechatronics/mechanical-maps/equipment-layout/index',
            meta: { title: '机电设备布置图' }
          },
          {
            path: '/mechatronics/mechanical-maps/power-supply',
            name: 'Mechanical6-5',
            component: '/mechatronics/mechanical-maps/power-supply/index',
            meta: { title: '井上下供电系统图' }
          },
          {
            path: '/mechatronics/mechanical-maps/transportation',
            name: 'Mechanical6-6',
            component: '/mechatronics/mechanical-maps/transportation/index',
            meta: { title: '运输系统图' }
          }
        ]
      },
      {
        path: '/mechatronics/technology-manage',
        name: 'Mechanical7',
        component: '/mechatronics/technology-manage/index',
        meta: { title: '技术管理' },
        children: [
          {
            path: '/mechatronics/technology-manage/regulation',
            name: 'Mechanical7-1',
            component: '/mechatronics/technology-manage/regulation/index',
            meta: { title: '规章制度' }
          },
          {
            path: '/mechatronics/technology-manage/operation',
            name: 'Mechanical7-2',
            component: '/mechatronics/technology-manage/operation/index',
            meta: { title: '操作规程' }
          },
          {
            path: '/mechatronics/technology-manage/information',
            name: 'Mechanical7-3',
            component: '/mechatronics/technology-manage/information/index',
            meta: { title: '资料文件' }
          },
          {
            path: '/mechatronics/technology-manage/relevant-standard',
            name: 'Mechanical7-4',
            component: '/mechatronics/technology-manage/relevant-standard/index',
            meta: { title: '相关标准' }
          },
          {
            path: '/mechatronics/technology-manage/technical-documents',
            name: 'Mechanical7-5',
            component: '/mechatronics/technology-manage/technical-documents/index',
            meta: { title: '机电技术档案' }
          }
        ]
      }
    ]
  },
  // 综合自动化
  {
    path: '/demo-automation',
    name: 'DemoAutomation',
    component: 'Layout',
    redirect: '/demo-automation/automation1',
    meta: { title: '综合自动化', important: true },
    children: [
      {
        path: '/demo-automation/automation1',
        name: 'Automation1',
        component: '/demo/index',
        meta: { title: '通风系统' }
      },
      {
        path: '/demo-automation/automation2',
        name: 'Automation2',
        component: '/demo/index',
        meta: { title: '压风系统' }
      },
      {
        path: '/demo-automation/automation3',
        name: 'Automation3',
        component: '/demo/index',
        meta: { title: '井下排水系统' }
      },
      {
        path: '/demo-automation/automation4',
        name: 'Automation4',
        component: '/demo/index',
        meta: { title: '提升系统' }
      },
      {
        path: '/demo-automation/automation5',
        name: 'Automation5',
        component: '/demo/index',
        meta: { title: '主运输系统' }
      },
      {
        path: '/demo-automation/automation6',
        name: 'Automation6',
        component: '/demo/index',
        meta: { title: '电力监控系统' }
      },
      {
        path: '/demo-automation/automation7',
        name: 'Automation7',
        component: '/demo/index',
        meta: { title: '局扇监控系统' }
      },
      {
        path: '/demo-automation/automation8',
        name: 'Automation8',
        component: '/demo/index',
        meta: { title: '瓦斯抽放系统' }
      },
      {
        path: '/demo-automation/automation9',
        name: 'Automation9',
        component: '/demo/index',
        meta: { title: '制氮系统' }
      },
      {
        path: '/demo-automation/automation10',
        name: 'Automation10',
        component: '/demo/index',
        meta: { title: '辅助运输系统' }
      },
      {
        path: '/demo-automation/automation11',
        name: 'Automation11',
        component: '/demo/index',
        meta: { title: '制冷系统' }
      },
      {
        path: '/demo-automation/automation12',
        name: 'Automation12',
        component: '/demo/index',
        meta: { title: '智能化综采工作面' }
      },
      {
        path: '/demo-automation/automation13',
        name: 'Automation13',
        component: '/demo/index',
        meta: { title: '智能化掘进工作面' }
      }
    ]
  },
  // 系统管理
  {
    path: '/system-management',
    name: 'DemoSystem',
    component: 'Layout',
    redirect: '/system-management/authority-manage/application-manage',
    meta: { title: '系统管理' },
    children: [
      {
        path: '/system-management/authority-manage',
        name: 'DemoAuthority',
        component: '/demo/index',
        meta: { title: '统一权限管理' },
        children: [
          {
            path: '/system-management/authority-manage/application-manage',
            name: 'Authority1',
            component: '/system-management/authority-manage/application-manage/index',
            meta: { title: '应用系统管理' }
          },
          {
            path: '/system-management/authority-manage/role-type',
            name: 'Authority1',
            component: '/system-management/authority-manage/role-type/index',
            meta: { title: '角色类型管理' }
          },
          {
            path: '/system-management/authority-manage/user-manage',
            name: 'Authority2',
            component: '/system-management/authority-manage/user-manage/index',
            meta: { title: '用户管理' }
          },
          {
            path: '/system-management/authority-manage/organization-manage',
            name: 'Authority3',
            component:
              '/system-management/authority-manage/organization-manage/index',
            meta: { title: '组织机构管理' }
          },
          {
            path: '/system-management/authority-manage/role-manage',
            name: 'Authority4',
            component: '/system-management/authority-manage/role-manage/index',
            meta: { title: '角色管理' }
          },
          {
            path: '/system-management/authority-manage/menu-manage',
            name: 'Authority5',
            component: '/system-management/authority-manage/menu-manage/index',
            meta: { title: '菜单资源管理' }
          },
          {
            path: '/system-management/authority-manage/data-dictionary-manage',
            name: 'Authority6',
            component: '/system-management/authority-manage/data-dictionary-manage/index',
            meta: { title: '数据字典管理' }
          },
          {
            path: '/system-management/authority-manage/resource-manage',
            name: 'Authority6',
            component:
              '/system-management/authority-manage/resource-manage/index',
            meta: { title: '资源权限管理' }
          },
          {
            path: '/system-management/authority-manage/personnel-manage',
            name: 'Authority7',
            component:
              '/system-management/authority-manage/personnel-manage/index',
            meta: { title: '人员管理' }
          }
        ]
      },
      {
        path: '/system-management/system1',
        name: 'System1',
        component: '/demo/index',
        meta: { title: '门户设置管理' },
        children: [
          {
            path: '/system-management/system1/system1-1',
            name: 'System1-1',
            component: '/demo/index',
            meta: { title: '门户资源设置' }
          },
          {
            path: '/system-management/system1/system1-2',
            name: 'System1-2',
            component: '/demo/index',
            meta: { title: '门户布局设置' }
          },
          {
            path: '/system-management/system1/system1-3',
            name: 'System1-3',
            component: '/demo/index',
            meta: { title: '门户内容设置' }
          },
          {
            path: '/system-management/system1/system1-4',
            name: 'System1-4',
            component: '/demo/index',
            meta: { title: '门户权限设置' }
          }
        ]
      },
      {
        path: '/system-management/system2',
        name: 'System2',
        component: '/demo/index',
        meta: { title: '页面视图配置管理' },
        children: [
          {
            path: '/system-management/system2/system2-1',
            name: 'System2-1',
            component: '/demo/index',
            meta: { title: '页面资源管理' }
          },
          {
            path: '/system-management/system2/system2-2',
            name: 'System2-2',
            component: '/demo/index',
            meta: { title: '页面布局设置' }
          }
        ]
      },
      {
        path: '/system-management/message-manage',
        name: 'DemoMessage',
        component: '/demo/index',
        meta: { title: '消息管理' },
        children: [
          // {
          //   path: '/system-management/message-manage/message-template',
          //   name: 'Message1',
          //   component:
          //     '/system-management/message-manage/message-template/index',
          //   meta: { title: '消息模板配置' }
          // },
          {
            path: '/system-management/message-manage/message-type',
            name: 'Message1',
            component: '/system-management/message-manage/message-type/index',
            meta: { title: '消息模板配置' }
          },
          {
            path: '/system-management/message-manage/message-log',
            name: 'Message2',
            component: '/system-management/message-manage/message-log/index',
            meta: { title: '消息日志' }
          },
          {
            path: '/system-management/message-manage/message3',
            name: 'Message3',
            component: '/demo/index',
            meta: { title: '消息统计分析' }
          },
          {
            path: '/system-management/message-manage/message4',
            name: 'Message4',
            component: '/demo/index',
            meta: { title: '发送策略配置' }
          }
        ]
      },
      {
        path: '/system-management/system3',
        name: 'System3',
        component: '/demo/index',
        meta: { title: '系统日志' },
        children: [
          {
            path: '/system-management/system-log/login-log',
            name: 'System3-1',
            component: '/system-management/system-log/login-log/index',
            meta: { title: '登录日志' }
          },
          {
            path: '/system-management/system-log/action-log',
            name: 'System3-2',
            component: '/system-management/system-log/action-log/index',
            meta: { title: '操作日志' }
          },
          {
            path: '/system-management/system3/system3-3',
            name: 'System3-3',
            component: '/demo/index',
            meta: { title: '系统日志' }
          }
        ]
      },
      {
        path: '/system-management/flow-manage',
        name: 'DemoFlow',
        component: '/demo/index',
        redirect: '/system-management/flow-manage/flow1',
        meta: { title: '流程管理' },
        children: [
          {
            path: '/system-management/flow-manage/flow1',
            name: 'Flow1',
            component: '/system-management/flow-manage/flow-config/index',
            meta: { title: '流程配置' }
          },
          {
            path: '/system-management/flow-manage/flow2',
            name: 'Flow2',
            component: '/demo/index',
            meta: { title: '流程统计分析' }
          },
          {
            path: '/system-management/flow-manage/flow3',
            name: 'Flow3',
            component: '/system-management/flow-manage/index',
            meta: { title: '流程管理' }
          },
          {
            path: '/system-management/flow-manage/flow4',
            name: 'Flow3',
            component: '/system-management/flow-manage/my-publish/index',
            meta: { title: '我的发布', externalUrl: '' }
          },
          {
            path: '/system-management/flow-manage/flow5',
            name: 'Flow3',
            component: '/system-management/flow-manage/to-do-process/index',
            meta: { title: '待办流程' }
          }
        ]
      },
      {
        path: '/system-management/document-manage',
        name: 'System4',
        component: '/system-management/document-manage/index',
        meta: { title: '文档管理' }
      },
      {
        path: '/system-management/system5',
        name: 'System5',
        component: '/demo/index',
        meta: { title: '一张图设置' },
        children: [
          {
            path: '/system-management/system5/system5-1',
            name: 'System5-1',
            component: '/demo/index',
            meta: { title: '实体分类' }
          },
          {
            path: '/system-management/system5/system5-2',
            name: 'System5-2',
            component: '/demo/index',
            meta: { title: '避灾路线绘制' }
          },
          {
            path: '/system-management/system5/system5-3',
            name: 'System5-3',
            component: '/demo/index',
            meta: { title: '实体设置' }
          },
          {
            path: '/system-management/system5/system5-4',
            name: 'System5-4',
            component: '/demo/index',
            meta: { title: '属性设置' }
          }
        ]
      },
      {
        path: '/system-management/report',
        name: 'System7',
        component: '/demo/index',
        meta: { title: '报表管理' },
        children: [
          {
            path: '/system-management/report/ureport',
            name: 'System5-1',
            component: '/ureport/designer/index',
            meta: { title: '报表设计器（ureport）' }
          },
          {
            path: '/system-management/report/kForm/design',
            name: 'kFormDesign',
            component: '/demo/k-form/design/index',
            meta: { title: '表单设计器' }
          },
          {
            path: '/system-management/report/kForm/build',
            name: 'kFormBuild',
            component: '/demo/k-form/build/index',
            meta: { title: '表单显示模块' }
          }
        ]
      },
      // 任务调度
      {
        path: '/system-management/demo-task',
        name: 'DemoTask',
        component: '/demo/index',
        meta: { title: '任务调度' },
        children: [
          {
            path: '/system-management/task1',
            name: 'Task1',
            component: '/system-management/task-scheduling/task-config/index',
            meta: { title: '任务配置', externalUrl: 'http://192.168.1.68:18020/jobgroup' }
          },
          {
            path: '/system-management/task2',
            name: 'Task2',
            component: '/system-management/task-scheduling/task-manage/index',
            meta: { title: '任务管理', externalUrl: 'http://192.168.1.68:18020/jobinfo' }
          },
          {
            path: '/system-management/task3',
            name: 'Task3',
            component: '/system-management/task-scheduling/task-monitoring/index',
            meta: { title: '任务监控', externalUrl: 'http://192.168.1.68:18020/' }
          },
          {
            path: '/system-management/task4',
            name: 'Task4',
            component: '/system-management/task-scheduling/task-log/index',
            meta: { title: '任务调度日志', externalUrl: 'http://192.168.1.68:18020/joblog' }
          }
        ]
      },
      {
        path: '/system-management/to-do-list',
        name: 'System8',
        component: '/system-management/to-do-list/index',
        meta: { title: '待办列表' }
      },
      {
        path: '/system-management/menuManager',
        name: 'System9',
        component: '/system-management/menu-manager/index',
        meta: { title: '菜单管理' }
      },
      {
        path: '/system-management/feedback',
        name: 'System6',
        component: '/system-management/feedback/index',
        meta: { title: '问题反馈' }
      },
      {
        path: '/system-management/app-power-manage',
        name: 'System6',
        component: '/system-management/app-power-manage/index',
        meta: { title: 'APP权限管理' }
      }
    ]
  },
  // 视频监控
  {
    path: '/demo-video',
    name: 'DemoVideo',
    component: 'Layout',
    redirect: '/demo-video/video1',
    meta: { title: '视频监控' },
    children: [
      {
        path: '/demo-video/video1',
        name: 'Video1',
        component: '/demo/index',
        meta: { title: '实时视频监控' }
      },
      {
        path: '/demo-video/video2',
        name: 'Video2',
        component: '/demo/index',
        meta: { title: '异常监控' }
      },
      {
        path: '/demo-video/video3',
        name: 'Video3',
        component: '/demo/index',
        meta: { title: '视频管理' }
      }
    ]
  },
  // 智慧党建
  {
    path: '/demo-party-build',
    name: 'DemoPartyBuild',
    component: 'Layout',
    redirect: '/demo-party-build/build1',
    meta: { title: '智慧党建' },
    children: [
      {
        path: '/demo-party-build/build1',
        name: 'Build1',
        component: '/demo/index',
        meta: { title: '党组织管理' },
        children: [
          {
            path: '/demo-party-build/build1/build1-1',
            name: 'Build1-1',
            component: '/demo/index',
            meta: { title: '党组织架构管理' }
          },
          {
            path: '/demo-party-build/build1/build1-2',
            name: 'Build1-2',
            component: '/demo/index',
            meta: { title: '党干部管理' }
          },
          {
            path: '/demo-party-build/build1/build1-3',
            name: 'Build1-3',
            component: '/demo/index',
            meta: { title: '党员管理' }
          },
          {
            path: '/demo-party-build/build1/build1-4',
            name: 'Build1-4',
            component: '/demo/index',
            meta: { title: '党籍管理' }
          },
          {
            path: '/demo-party-build/build1/build1-5',
            name: 'Build1-5',
            component: '/demo/index',
            meta: { title: '党费管理' }
          },
          {
            path: '/demo-party-build/build1/build1-6',
            name: 'Build1-6',
            component: '/demo/index',
            meta: { title: '党组织查询统计' }
          }
        ]
      },
      {
        path: '/demo-party-build/build2',
        name: 'Build2',
        component: '/demo/index',
        meta: { title: '党建学习' },
        children: [
          {
            path: '/demo-party-build/build2/build2-1',
            name: 'Build2-1',
            component: '/demo/index',
            meta: { title: '党建课堂' }
          },
          {
            path: '/demo-party-build/build2/build2-2',
            name: 'Build2-2',
            component: '/demo/index',
            meta: { title: '专题学习' }
          }
        ]
      },
      {
        path: '/demo-party-build/build3',
        name: 'Build3',
        component: '/demo/index',
        meta: { title: '模板管理' }
      }
    ]
  },
  // 大数据分析
  {
    path: '/demo-big-data',
    name: 'DemoBigData',
    component: 'Layout',
    redirect: '/demo-big-data/big-data1',
    meta: { title: '大数据分析' },
    children: [
      {
        path: '/demo-big-data/big-data1',
        name: 'BigData1',
        component: '/demo/index',
        meta: { title: '大数据指标库' },
        children: [
          {
            path: '/demo-big-data/big-data1/big-data1-1',
            name: 'BigData1-1',
            component: '/demo/index',
            meta: { title: '安全诊断指标库' }
          },
          {
            path: '/demo-big-data/big-data1/big-data1-2',
            name: 'BigData1-2',
            component: '/demo/index',
            meta: { title: '预警报警指标库' }
          },
          {
            path: '/demo-big-data/big-data1/big-data1-3',
            name: 'BigData1-3',
            component: '/demo/index',
            meta: { title: '预警报警指标类型' }
          },
          {
            path: '/demo-big-data/big-data1/big-data1-4',
            name: 'BigData1-4',
            component: '/demo/index',
            meta: { title: '预警报警实时数据' }
          }
        ]
      },
      {
        path: '/demo-big-data/big-data2',
        name: 'BigData2',
        component: '/demo/index',
        meta: { title: '大数据分析文献知识库' },
        children: [
          {
            path: '/demo-big-data/big-data2/big-data2-1',
            name: 'BigData2-1',
            component: '/demo/index',
            meta: { title: '预警报警知识库' }
          },
          {
            path: '/demo-big-data/big-data2/big-data2-2',
            name: 'BigData2-2',
            component: '/demo/index',
            meta: { title: '隐患知识库' }
          },
          {
            path: '/demo-big-data/big-data2/big-data2-3',
            name: 'BigData2-3',
            component: '/demo/index',
            meta: { title: '三违知识库' }
          },
          {
            path: '/demo-big-data/big-data2/big-data2-4',
            name: 'BigData2-4',
            component: '/demo/index',
            meta: { title: '安全规程' }
          },
          {
            path: '/demo-big-data/big-data2/big-data2-5',
            name: 'BigData2-5',
            component: '/demo/index',
            meta: { title: '操作规程' }
          }
        ]
      },
      {
        path: '/demo-big-data/big-data3',
        name: 'BigData3',
        component: '/demo/index',
        meta: { title: '大数据分析' },
        children: [
          {
            path: '/demo-big-data/big-data3/big-data3-1',
            name: 'BigData3-1',
            component: '/demo/index',
            meta: { title: '决策分析' },
            children: [
              {
                path: '/demo-big-data/big-data3/big-data3-1/big-data3-1-1',
                name: 'BigData3-1-1',
                component: '/demo/index',
                meta: { title: '重点作业区域安全等级评价' }
              },
              {
                path: '/demo-big-data/big-data3/big-data3-1/big-data3-1-2',
                name: 'BigData3-1-2',
                component: '/demo/index',
                meta: { title: '风险评价' }
              },
              {
                path: '/demo-big-data/big-data3/big-data3-1/big-data3-1-3',
                name: 'BigData3-1-3',
                component: '/demo/index',
                meta: { title: '动态排产' }
              },
              {
                path: '/demo-big-data/big-data3/big-data3-1/big-data3-1-4',
                name: 'BigData3-1-4',
                component: '/demo/index',
                meta: { title: '大型设备运维及管理' }
              },
              {
                path: '/demo-big-data/big-data3/big-data3-1/big-data3-1-5',
                name: 'BigData3-1-5',
                component: '/demo/index',
                meta: { title: '精细化成本核算' }
              },
              {
                path: '/demo-big-data/big-data3/big-data3-1/big-data3-1-6',
                name: 'BigData3-1-6',
                component: '/demo/index',
                meta: { title: '应急救援' }
              }
            ]
          },
          {
            path: '/demo-big-data/big-data3/big-data3-2',
            name: 'BigData3-2',
            component: '/demo/index',
            meta: { title: '专题分析' },
            children: [
              {
                path: '/demo-big-data/big-data3/big-data3-2/big-data3-2-1',
                name: 'BigData3-2-1',
                component: '/demo/index',
                meta: { title: '安全管理专题分析' }
              },
              {
                path: '/demo-big-data/big-data3/big-data3-2/big-data3-2-2',
                name: 'BigData3-2-2',
                component: '/demo/index',
                meta: { title: '生产运行专题分析' }
              },
              {
                path: '/demo-big-data/big-data3/big-data3-2/big-data3-2-3',
                name: 'BigData3-2-3',
                component: '/demo/index',
                meta: { title: '经营专题分析' }
              },
              {
                path: '/demo-big-data/big-data3/big-data3-2/big-data3-2-4',
                name: 'BigData3-2-4',
                component: '/demo/index',
                meta: { title: '调度专题分析' }
              },
              {
                path: '/demo-big-data/big-data3/big-data3-2/big-data3-2-5',
                name: 'BigData3-2-5',
                component: '/demo/index',
                meta: { title: '应急专题分析' }
              }
            ]
          }
        ]
      }
    ]
  },
  // 科技创新
  {
    path: '/demo-science',
    name: 'DemoScience',
    component: 'Layout',
    redirect: '/demo-science/science1',
    meta: { title: '科技创新' },
    children: [
      {
        path: '/demo-science/science1',
        name: 'Science1',
        component: '/demo/index',
        meta: { title: '科技成果' },
        children: [
          {
            path: '/demo-science/science1/science1-1',
            name: 'Science1-1',
            component: '/demo/index',
            meta: { title: '科技成果申报' }
          }
        ]
      },
      {
        path: '/demo-science/science2',
        name: 'Science2',
        component: '/demo/index',
        meta: { title: '获奖成果' },
        children: [
          {
            path: '/demo-science/science2/science2-1',
            name: 'Science2-1',
            component: '/demo/index',
            meta: { title: '历年获奖成果展示' }
          }
        ]
      }
    ]
  },

  // 预告警管理
  {
    path: '/demo-alarm',
    name: 'DemoAlarm',
    component: 'Layout',
    redirect: '/demo-alarm/alarm1',
    meta: { title: '预告警管理' },
    children: [
      {
        path: '/demo-alarm/alarm1',
        name: 'Alarm1',
        component: '/demo/index',
        meta: { title: '预告警规则管理' }
      },
      {
        path: '/demo-alarm/alarm2',
        name: 'Alarm2',
        component: '/demo/index',
        meta: { title: '预告警信息模板管理' }
      },
      {
        path: '/demo-alarm/alarm3',
        name: 'Alarm3',
        component: '/demo/index',
        meta: { title: '预告警策略配置' }
      }
    ]
  },
  // 报表
  {
    path: '/demo-statement',
    name: 'DemoStatement',
    component: 'Layout',
    redirect: '/demo-statement/statement1',
    meta: { title: '报表' },
    children: [
      {
        path: '/demo-statement/statement1',
        name: 'Statement1',
        component: '/demo/index',
        meta: { title: '报表设计' }
      },
      {
        path: '/demo-statement/statement2',
        name: 'Statement2',
        component: '/demo/index',
        meta: { title: '报表模板管理' }
      },
      {
        path: '/demo-statement/statement3',
        name: 'Statement3',
        component: '/demo/index',
        meta: { title: '报表版本管理' }
      }
    ]
  },
  // API接口管理
  {
    path: '/demo-api',
    name: 'DemoApi',
    component: 'Layout',
    redirect: '/demo-api/api',
    meta: { title: 'API接口管理', hiddenChild: true },
    children: [
      {
        path: '/demo-api/api',
        name: 'Api',
        component: '/demo/index',
        meta: { title: 'API' }
      }
    ]
  },
  // 智能检索
  {
    path: '/demo-intelligent-search',
    name: 'DemoIntelligentSearch',
    component: 'Layout',
    redirect: '/demo-intelligent-search/search',
    meta: { title: '智能检索', hiddenChild: true },
    children: [
      {
        path: '/demo-intelligent-search/search',
        name: 'Search',
        component: '/demo/index',
        meta: { title: '智能检索' }
      }
    ]
  },
  // 数据管理
  {
    path: '/demo-data',
    name: 'DemoData',
    component: 'Layout',
    redirect: '/demo-data/data1',
    meta: { title: '数据管理' },
    children: [
      {
        path: '/demo-data/data1',
        name: 'Data1',
        component: '/demo/index',
        meta: { title: '数据采集' },
        children: [
          {
            path: '/demo-data/data1/data1-1',
            name: 'Data1-1',
            component: '/demo/index',
            meta: { title: '数据源类型管理' }
          },
          {
            path: '/demo-data/data1/data1-2',
            name: 'Data1-2',
            component: '/demo/index',
            meta: { title: '数据源管理' }
          },
          {
            path: '/demo-data/data1/data1-3',
            name: 'Data1-3',
            component: '/demo/index',
            meta: { title: '关系数据库采集' }
          },
          {
            path: '/demo-data/data1/data1-4',
            name: 'Data1-4',
            component: '/demo/index',
            meta: { title: '系统日志实时采集' }
          },
          {
            path: '/demo-data/data1/data1-5',
            name: 'Data1-5',
            component: '/demo/index',
            meta: { title: '三方接口对接采集' }
          }
        ]
      },
      {
        path: '/demo-data/data2',
        name: 'Data2',
        component: '/demo/index',
        meta: { title: '数据资产' },
        children: [
          {
            path: '/demo-data/data2/data2-1',
            name: 'Data2-1',
            component: '/demo/index',
            meta: { title: '数据资源管理' }
          },
          {
            path: '/demo-data/data2/data2-2',
            name: 'Data2-2',
            component: '/demo/index',
            meta: { title: '资源目录管理' }
          },
          {
            path: '/demo-data/data2/data2-3',
            name: 'Data2-3',
            component: '/demo/index',
            meta: { title: '数据质量管理' }
          }
        ]
      },
      {
        path: '/demo-data/data3',
        name: 'Data3',
        component: '/demo/index',
        meta: { title: '数据应用' },
        children: [
          {
            path: '/demo-data/data3/data3-1',
            name: 'Data3-1',
            component: '/demo/index',
            meta: { title: '数据门户' }
          },
          {
            path: '/demo-data/data3/data3-2',
            name: 'Data3-2',
            component: '/demo/index',
            meta: { title: '数据检索' }
          },
          {
            path: '/demo-data/data3/data3-3',
            name: 'Data3-3',
            component: '/demo/index',
            meta: { title: '数据共享' }
          }
        ]
      },
      {
        path: '/demo-data/data4',
        name: 'Data4',
        component: '/demo/index',
        meta: { title: '数据处理' },
        children: [
          {
            path: '/demo-data/data4/data4-1',
            name: 'Data4-1',
            component: '/demo/index',
            meta: { title: '数据转换清洗' }
          },
          {
            path: '/demo-data/data4/data4-2',
            name: 'Data4-2',
            component: '/demo/index',
            meta: { title: '数据校验' }
          },
          {
            path: '/demo-data/data4/data4-3',
            name: 'Data4-3',
            component: '/demo/index',
            meta: { title: '数据建模分析' }
          }
        ]
      },
      {
        path: '/demo-data/data5',
        name: 'Data5',
        component: '/demo/index',
        meta: { title: '数据绑定' },
        children: [
          {
            path: '/demo-data/data5/data5-1',
            name: 'Data5-1',
            component: '/demo/index',
            meta: { title: '数据项绑定' }
          },
          {
            path: '/demo-data/data5/data5-2',
            name: 'Data5-2',
            component: '/demo/index',
            meta: { title: '数据列绑定' }
          },
          {
            path: '/demo-data/data5/data5-3',
            name: 'Data5-3',
            component: '/demo/index',
            meta: { title: '数据集绑定' }
          }
        ]
      }
    ]
  },

  // 页面模板
  {
    path: '/demo-page',
    name: 'DemoPage',
    component: 'Layout',
    redirect: '/demo-page/table1',
    meta: { title: '页面模板' },
    children: [
      {
        path: '/demo-page/table1',
        name: 'Table1',
        component: '/demo/table/table1/index',
        meta: { title: '表格 - 行内编辑' }
      },
      {
        path: '/demo-page/table2',
        name: 'Table2',
        component: '/demo/table/table2/index',
        meta: { title: '表格 - 弹窗编辑' }
      },
      {
        path: '/demo-page/report-table',
        name: 'ReportTable',
        component: '/demo/table/report-table/index',
        meta: { title: '表格 - 双击单元格编辑' }
      },
      {
        path: '/demo-page/mult-table',
        name: 'MultTable',
        component: '/demo/table/mult-table/index',
        meta: { title: '嵌套表格' }
      },
      {
        path: '/demo-page/upload',
        name: 'Upload',
        component: '/demo/table/upload/index',
        meta: { title: '上传附件' }
      },
      {
        path: '/demo-page/text-editor',
        name: 'TextEditor',
        component: '/demo/text-editor/index',
        meta: { title: '富文本编辑器' }
      },
      {
        path: '/demo-page/stair-table',
        name: 'StairTable',
        component: '/demo/table/stair-table/index',
        meta: { title: '阶梯图' }
      },
      {
        path: '/demo-page/external-link',
        name: 'ExternalLink',
        component: '/demo/external-link/index',
        meta: { title: '内嵌外部链接', externalUrl: 'https://www.baidu.com/' }
      }
    ]
  },

  {
    path: '/404',
    component: '/404',
    hidden: true
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

module.exports = [
  {
    url: '/example/route',
    type: 'get',
    response: config => {
      return {
        code: 200,
        data: asyncRoutes
      }
    }
  }
]
