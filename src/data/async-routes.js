export default [
  // 首页
  // {
  //   path: '/dashboard',
  //   name: 'Dashboard',
  //   component: '/dashboard/index',
  //   meta: { title: '首页', affix: true }
  // },
  // GIS一张图
  {
    path: '/demo-gis',
    name: 'demoGis',
    component: 'Layout',
    redirect: '/demo-gis/gis1',
    meta: { title: 'GIS一张图' },
    children: [
      {
        path: '/demo-gis/gis1',
        name: 'GIS1',
        component: '/demo/index',
        meta: { title: '矿山三维场景展示' }
      },
      {
        path: '/demo-gis/gis2',
        name: 'GIS2',
        component: '/demo/index',
        meta: { title: '三维地理信息展示' }
      },
      {
        path: '/demo-gis/gis3',
        name: 'GIS3',
        component: '/demo/index',
        meta: { title: '综合一张图' }
      },
      {
        path: '/demo-gis/gis4',
        name: 'GIS4',
        component: '/demo/index',
        meta: { title: '地测一张图' }
      },
      {
        path: '/demo-gis/gis5',
        name: 'GIS5',
        component: '/demo/index',
        meta: { title: '生产一张图' }
      },
      {
        path: '/demo-gis/gis6',
        name: 'GIS6',
        component: '/demo/index',
        meta: { title: '通防一张图' }
      },
      {
        path: '/demo-gis/gis7',
        name: 'GIS7',
        component: '/demo/index',
        meta: { title: '机电一张图' }
      },
      {
        path: '/demo-gis/gis8',
        name: 'GIS8',
        component: '/demo/index',
        meta: { title: '安全一张图' }
      },
      {
        path: '/demo-gis/gis9',
        name: 'GIS9',
        component: '/demo/index',
        meta: { title: '应急一张图' }
      },
      {
        path: '/demo-gis/gis10',
        name: 'GIS10',
        component: '/demo/index',
        meta: { title: '监测一张图' }
      }
    ]
  },
  // 地测防控水
  {
    path: '/demo-geodesy',
    name: 'DemoGeodesy',
    component: 'Layout',
    redirect: '/demo-geodesy/geodesy1',
    meta: { title: '地测防控水' },
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
                component: '/table/table1/index',
                meta: { title: '矿区构造纲要图' }
              },
              {
                path: '/demo-geodesy/geodesy1/geodesy1-1/geodesy1-1-2',
                name: 'Geodesy1-1-2',
                component: '/table/table2/index',
                meta: { title: '地质地形图' }
              },
              {
                path: '/demo-geodesy/geodesy1/geodesy1-1/geodesy1-1-3',
                name: 'Geodesy1-1-3',
                component: '/demo/index',
                meta: { title: '地层综合柱状图' }
              },
              {
                path: '/demo-geodesy/geodesy1/geodesy1-1/geodesy1-1-4',
                name: 'Geodesy1-1-4',
                component: '/demo/index',
                meta: { title: '主要地质剖面图' }
              },
              {
                path: '/demo-geodesy/geodesy1/geodesy1-1/geodesy1-1-5',
                name: 'Geodesy1-1-5',
                component: '/demo/index',
                meta: { title: '矿井煤岩层对比图' }
              },
              {
                path: '/demo-geodesy/geodesy1/geodesy1-1/geodesy1-1-6',
                name: 'Geodesy1-1-6',
                component: '/demo/index',
                meta: { title: '煤矿可采煤层底板等高线及资源/储量估算图' }
              },
              {
                path: '/demo-geodesy/geodesy1/geodesy1-1/geodesy1-1-7',
                name: 'Geodesy1-1-7',
                component: '/demo/index',
                meta: { title: '井巷地质素描图' }
              },
              {
                path: '/demo-geodesy/geodesy1/geodesy1-1/geodesy1-1-8',
                name: 'Geodesy1-1-8',
                component: '/demo/index',
                meta: { title: '水平地质切面图勘探钻孔柱状图' }
              },
              {
                path: '/demo-geodesy/geodesy1/geodesy1-1/geodesy1-1-9',
                name: 'Geodesy1-1-9',
                component: '/demo/index',
                meta: { title: '矿井瓦斯地质图' }
              },
              {
                path: '/demo-geodesy/geodesy1/geodesy1-1/geodesy1-1-10',
                name: 'Geodesy1-1-10',
                component: '/demo/index',
                meta: { title: '井上下对照图' }
              },
              {
                path: '/demo-geodesy/geodesy1/geodesy1-1/geodesy1-1-11',
                name: 'Geodesy1-1-11',
                component: '/demo/index',
                meta: { title: '采掘工程平面图' }
              },
              {
                path: '/demo-geodesy/geodesy1/geodesy1-1/geodesy1-1-12',
                name: 'Geodesy1-1-12',
                component: '/demo/index',
                meta: { title: '井巷、石门地质编录工程地质相关图件' }
              },
              {
                path: '/demo-geodesy/geodesy1/geodesy1-1/geodesy1-1-13',
                name: 'Geodesy1-1-13',
                component: '/demo/index',
                meta: { title: '储量损失量计算图' }
              },
              {
                path: '/demo-geodesy/geodesy1/geodesy1-1/geodesy1-1-14',
                name: 'Geodesy1-1-14',
                component: '/demo/index',
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
                meta: { title: '水文地质情况评价报告和水害隐患治理情况分析报告' }
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
            component: '/demo/index',
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
    path: '/demo-excavate',
    name: 'DemoExcavate',
    component: 'Layout',
    redirect: '/demo-excavate/excavate1',
    meta: { title: '采掘管理' },
    children: [
      {
        path: '/demo-excavate/excavate1',
        name: 'Excavate1',
        component: '/demo/index',
        meta: { title: '基础设计信息' },
        children: [
          {
            path: '/demo-excavate/excavate1/excavate1-1',
            name: 'Excavate1-1',
            component: '/demo/index',
            meta: { title: '矿井基础信息' }
          },
          {
            path: '/demo-excavate/excavate1/excavate1-2',
            name: 'Excavate1-2',
            component: '/demo/index',
            meta: { title: '煤层编号信息' }
          },
          {
            path: '/demo-excavate/excavate1/excavate1-3',
            name: 'Excavate1-3',
            component: '/demo/index',
            meta: { title: '水平基本信息' }
          },
          {
            path: '/demo-excavate/excavate1/excavate1-4',
            name: 'Excavate1-4',
            component: '/demo/index',
            meta: { title: '采区基本信息' }
          },
          {
            path: '/demo-excavate/excavate1/excavate1-5',
            name: 'Excavate1-5',
            component: '/demo/index',
            meta: { title: '采煤队信息' }
          },
          {
            path: '/demo-excavate/excavate1/excavate1-6',
            name: 'Excavate1-6',
            component: '/demo/index',
            meta: { title: '掘进队信息' }
          },
          {
            path: '/demo-excavate/excavate1/excavate1-7',
            name: 'Excavate1-7',
            component: '/demo/index',
            meta: { title: '工作面管理' }
          },
          {
            path: '/demo-excavate/excavate1/excavate1-8',
            name: 'Excavate1-8',
            component: '/demo/index',
            meta: { title: '巷道管理' }
          }
        ]
      },
      {
        path: '/demo-excavate/excavate2',
        name: 'Excavate2',
        component: '/demo/index',
        meta: { title: '生产计划' },
        children: [
          {
            path: '/demo-excavate/excavate2/excavate2-1',
            name: 'Excavate2-1',
            component: '/demo/index',
            meta: { title: '产量月计划表' }
          },
          {
            path: '/demo-excavate/excavate2/excavate2-2',
            name: 'Excavate2-2',
            component: '/demo/index',
            meta: { title: '掘进月计划表' }
          },
          {
            path: '/demo-excavate/excavate2/excavate2-3',
            name: 'Excavate2-3',
            component: '/demo/index',
            meta: { title: '煤巷掘进接替年计划表' }
          },
          {
            path: '/demo-excavate/excavate2/excavate2-4',
            name: 'Excavate2-4',
            component: '/demo/index',
            meta: { title: '岩巷工程接替年计划表' }
          },
          {
            path: '/demo-excavate/excavate2/excavate2-5',
            name: 'Excavate2-5',
            component: '/demo/index',
            meta: { title: '工作面接续年计划表' }
          },
          {
            path: '/demo-excavate/excavate2/excavate2-6',
            name: 'Excavate2-6',
            component: '/demo/index',
            meta: { title: '年计划预览表' }
          }
        ]
      },
      {
        path: '/demo-excavate/excavate3',
        name: 'Excavate3',
        component: '/demo/index',
        meta: { title: '生产管理' },
        children: [
          {
            path: '/demo-excavate/excavate3/excavate3-1',
            name: 'Excavate3-1',
            component: '/demo/index',
            meta: { title: '工作面生命周期管理' }
          },
          {
            path: '/demo-excavate/excavate3/excavate3-2',
            name: 'Excavate3-2',
            component: '/demo/index',
            meta: { title: '巷道生命周期管理' }
          },
          {
            path: '/demo-excavate/excavate3/excavate3-3',
            name: 'Excavate3-3',
            component: '/demo/index',
            meta: { title: '采掘作业规程' }
          }
        ]
      },
      {
        path: '/demo-excavate/excavate4',
        name: 'Excavate4',
        component: '/demo/index',
        meta: { title: '生产图件' },
        children: [
          {
            path: '/demo-excavate/excavate4/excavate4-1',
            name: 'Excavate4-1',
            component: '/demo/index',
            meta: { title: '工作面图纸' }
          },
          {
            path: '/demo-excavate/excavate4/excavate4-2',
            name: 'Excavate4-2',
            component: '/demo/index',
            meta: { title: '巷道图纸' }
          },
          {
            path: '/demo-excavate/excavate4/excavate4-3',
            name: 'Excavate4-3',
            component: '/demo/index',
            meta: { title: '采掘工程设计图' }
          },
          {
            path: '/demo-excavate/excavate4/excavate4-4',
            name: 'Excavate4-4',
            component: '/demo/index',
            meta: { title: '单项工程图纸' }
          }
        ]
      },
      {
        path: '/demo-excavate/excavate5',
        name: 'Excavate5',
        component: '/demo/index',
        meta: { title: '生产文档' },
        children: [
          {
            path: '/demo-excavate/excavate5/excavate5-1',
            name: 'Excavate5-1',
            component: '/demo/index',
            meta: { title: '掘进开拓方案' }
          },
          {
            path: '/demo-excavate/excavate5/excavate5-2',
            name: 'Excavate5-2',
            component: '/demo/index',
            meta: { title: '采煤方案' }
          },
          {
            path: '/demo-excavate/excavate5/excavate5-3',
            name: 'Excavate5-3',
            component: '/demo/index',
            meta: { title: '理论知识' }
          },
          {
            path: '/demo-excavate/excavate5/excavate5-4',
            name: 'Excavate5-4',
            component: '/demo/index',
            meta: { title: '培训教材' }
          },
          {
            path: '/demo-excavate/excavate5/excavate5-5',
            name: 'Excavate5-5',
            component: '/demo/index',
            meta: { title: '标准规范' }
          },
          {
            path: '/demo-excavate/excavate5/excavate5-6',
            name: 'Excavate5-6',
            component: '/demo/index',
            meta: { title: '上报上级单位周报' }
          },
          {
            path: '/demo-excavate/excavate5/excavate5-7',
            name: 'Excavate5-7',
            component: '/demo/index',
            meta: { title: '上报上级单位月报' }
          },
          {
            path: '/demo-excavate/excavate5/excavate5-8',
            name: 'Excavate5-8',
            component: '/demo/index',
            meta: { title: '上报上级单位季报' }
          },
          {
            path: '/demo-excavate/excavate5/excavate5-9',
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
    path: '/demo-dispatch',
    name: 'DemoDispatch',
    component: 'Layout',
    redirect: '/demo-dispatch/dispatch1',
    meta: { title: '生产调度' },
    children: [
      {
        path: '/demo-dispatch/dispatch1',
        name: 'Dispatch1',
        component: '/demo/index',
        meta: { title: '调度台账' },
        children: [
          {
            path: '/demo-dispatch/dispatch1/dispatch1-1',
            name: 'Dispatch1-1',
            component: '/demo/index',
            meta: { title: '采煤工作面日报' }
          },
          {
            path: '/demo-dispatch/dispatch1/dispatch1-2',
            name: 'Dispatch1-2',
            component: '/demo/index',
            meta: { title: '主井提升及调度生产动态' }
          },
          {
            path: '/demo-dispatch/dispatch1/dispatch1-3',
            name: 'Dispatch1-3',
            component: '/demo/index',
            meta: { title: '中央区副井提升情况表' }
          },
          {
            path: '/demo-dispatch/dispatch1/dispatch1-4',
            name: 'Dispatch1-4',
            component: '/demo/index',
            meta: { title: '南区副井提升情况表' }
          },
          {
            path: '/demo-dispatch/dispatch1/dispatch1-5',
            name: 'Dispatch1-5',
            component: '/demo/index',
            meta: { title: '东区副井提升情况表' }
          },
          {
            path: '/demo-dispatch/dispatch1/dispatch1-6',
            name: 'Dispatch1-6',
            component: '/demo/index',
            meta: { title: '深部基本井提升情况表' }
          },
          {
            path: '/demo-dispatch/dispatch1/dispatch1-7',
            name: 'Dispatch1-7',
            component: '/demo/index',
            meta: { title: '回采工作面区队长汇报记录' }
          },
          {
            path: '/demo-dispatch/dispatch1/dispatch1-8',
            name: 'Dispatch1-8',
            component: '/demo/index',
            meta: { title: '掘进工作面区队长汇报记录' }
          },
          {
            path: '/demo-dispatch/dispatch1/dispatch1-9',
            name: 'Dispatch1-9',
            component: '/demo/index',
            meta: { title: '巷道贯通日报' }
          },
          {
            path: '/demo-dispatch/dispatch1/dispatch1-10',
            name: 'Dispatch1-10',
            component: '/demo/index',
            meta: { title: '巷道揭煤日报' }
          },
          {
            path: '/demo-dispatch/dispatch1/dispatch1-11',
            name: 'Dispatch1-11',
            component: '/demo/index',
            meta: { title: '工作面安装日报' }
          },
          {
            path: '/demo-dispatch/dispatch1/dispatch1-12',
            name: 'Dispatch1-12',
            component: '/demo/index',
            meta: { title: '工作面拆除日报' }
          },
          {
            path: '/demo-dispatch/dispatch1/dispatch1-13',
            name: 'Dispatch1-13',
            component: '/demo/index',
            meta: { title: '煤管科生产信息日报' }
          },
          {
            path: '/demo-dispatch/dispatch1/dispatch1-14',
            name: 'Dispatch1-14',
            component: '/demo/index',
            meta: { title: '矸石仓地点信息表' }
          },
          {
            path: '/demo-dispatch/dispatch1/dispatch1-15',
            name: 'Dispatch1-15',
            component: '/demo/index',
            meta: { title: '矸石仓放矸日报' }
          }
        ]
      },
      {
        path: '/demo-dispatch/dispatch2',
        name: 'Dispatch2',
        component: '/demo/index',
        meta: { title: '调度管理' },
        children: [
          {
            path: '/demo-dispatch/dispatch2/dispatch2-1',
            name: 'Dispatch2-1',
            component: '/demo/index',
            meta: { title: '入井人数日统计' }
          },
          {
            path: '/demo-dispatch/dispatch2/dispatch2-2',
            name: 'Dispatch2-2',
            component: '/demo/index',
            meta: { title: '矿领导值班计划表' }
          },
          {
            path: '/demo-dispatch/dispatch2/dispatch2-3',
            name: 'Dispatch2-3',
            component: '/demo/index',
            meta: { title: '矿领导带班计划表' }
          },
          {
            path: '/demo-dispatch/dispatch2/dispatch2-4',
            name: 'Dispatch2-4',
            component: '/demo/index',
            meta: { title: '防汛值班计划表' }
          },
          {
            path: '/demo-dispatch/dispatch2/dispatch2-5',
            name: 'Dispatch2-5',
            component: '/demo/index',
            meta: { title: '调度员值班计划表' }
          },
          {
            path: '/demo-dispatch/dispatch2/dispatch2-6',
            name: 'Dispatch2-6',
            component: '/demo/index',
            meta: { title: '各单位值跟班计划表' }
          },
          {
            path: '/demo-dispatch/dispatch2/dispatch2-7',
            name: 'Dispatch2-7',
            component: '/demo/index',
            meta: { title: '各单位值跟班计划预览表' }
          },
          {
            path: '/demo-dispatch/dispatch2/dispatch2-8',
            name: 'Dispatch2-8',
            component: '/demo/index',
            meta: { title: '调度数据锁定' }
          },
          {
            path: '/demo-dispatch/dispatch2/dispatch2-9',
            name: 'Dispatch2-9',
            component: '/demo/index',
            meta: { title: '公文公告' }
          },
          {
            path: '/demo-dispatch/dispatch2/dispatch2-10',
            name: 'Dispatch2-10',
            component: '/demo/index',
            meta: { title: '公文公告查看' }
          },
          {
            path: '/demo-dispatch/dispatch2/dispatch2-11',
            name: 'Dispatch2-11',
            component: '/demo/index',
            meta: { title: '早调会领导下派任务' }
          },
          {
            path: '/demo-dispatch/dispatch2/dispatch2-12',
            name: 'Dispatch2-12',
            component: '/demo/index',
            meta: { title: '早调会领导下派任务记录' }
          }
        ]
      },
      {
        path: '/demo-dispatch/dispatch3',
        name: 'Dispatch3',
        component: '/demo/index',
        meta: { title: '调度汇报' },
        children: [
          {
            path: '/demo-dispatch/dispatch3/dispatch3-1',
            name: 'Dispatch3-1',
            component: '/demo/index',
            meta: { title: '调度资料' },
            children: [
              {
                path: '/demo-dispatch/dispatch3/dispatch3-1/dispatch3-1-1',
                name: 'Dispatch3-1-1',
                component: '/demo/index',
                meta: { title: '管理制度' }
              },
              {
                path: '/demo-dispatch/dispatch3/dispatch3-1/dispatch3-1-2',
                name: 'Dispatch3-1-2',
                component: '/demo/index',
                meta: { title: '机构建设' }
              },
              {
                path: '/demo-dispatch/dispatch3/dispatch3-1/dispatch3-1-3',
                name: 'Dispatch3-1-3',
                component: '/demo/index',
                meta: { title: '领导讲话' }
              },
              {
                path: '/demo-dispatch/dispatch3/dispatch3-1/dispatch3-1-4',
                name: 'Dispatch3-1-4',
                component: '/demo/index',
                meta: { title: '政策法规' }
              }
            ]
          },
          {
            path: '/demo-dispatch/dispatch3/dispatch3-2',
            name: 'Dispatch3-2',
            component: '/demo/index',
            meta: { title: '作业月计划预览' }
          },
          {
            path: '/demo-dispatch/dispatch3/dispatch3-3',
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
    path: '/demo-safe',
    name: 'DemoSafe',
    component: 'Layout',
    redirect: '/demo-safe/safe1',
    meta: { title: '安全管理', roles: ['admin', 'editor'] },
    children: [
      {
        path: '/demo-safe/safe1',
        name: 'Safe1',
        component: '/demo/index',
        meta: { title: '安全生产标准化' },
        children: [
          {
            path: '/demo-safe/safe1/safe1-1',
            name: 'Safe1-1',
            component: '/demo/index',
            meta: { title: '达标规划' },
            children: [
              {
                path: '/demo-safe/safe1/safe1-1/safe1-1-1',
                name: 'Safe1-1-1',
                component: '/demo/index',
                meta: { title: '年度规划' }
              },
              {
                path: '/demo-safe/safe1/safe1-1/safe1-1-2',
                name: 'Safe1-1-2',
                component: '/demo/index',
                meta: { title: '季度计划' }
              },
              {
                path: '/demo-safe/safe1/safe1-1/safe1-1-3',
                name: 'Safe1-1-3',
                component: '/demo/index',
                meta: { title: '月度计划' }
              }
            ]
          },
          {
            path: '/demo-safe/safe1/safe1-2',
            name: 'Safe1-2',
            component: '/demo/index',
            meta: { title: '标准化评分管理' },
            children: [
              {
                path: '/demo-safe/safe1/safe1-2/safe1-2-1',
                name: 'Safe1-2-1',
                component: '/demo/index',
                meta: { title: '理念目标和矿长安全承诺' }
              },
              {
                path: '/demo-safe/safe1/safe1-2/safe1-2-2',
                name: 'Safe1-2-2',
                component: '/demo/index',
                meta: { title: '组织机构' }
              },
              {
                path: '/demo-safe/safe1/safe1-2/safe1-2-3',
                name: 'Safe1-2-3',
                component: '/demo/index',
                meta: { title: '安全生产责任制及安全管理制度' }
              },
              {
                path: '/demo-safe/safe1/safe1-2/safe1-2-4',
                name: 'Safe1-2-4',
                component: '/demo/index',
                meta: { title: '从业人员素质' }
              },
              {
                path: '/demo-safe/safe1/safe1-2/safe1-2-5',
                name: 'Safe1-2-5',
                component: '/demo/index',
                meta: { title: '安全风险分级管控' }
              },
              {
                path: '/demo-safe/safe1/safe1-2/safe1-2-6',
                name: 'Safe1-2-6',
                component: '/demo/index',
                meta: { title: '事故隐患排查治理' }
              },
              {
                path: '/demo-safe/safe1/safe1-2/safe1-2-7',
                name: 'Safe1-2-7',
                component: '/demo/index',
                meta: { title: '质量控制_通风' }
              },
              {
                path: '/demo-safe/safe1/safe1-2/safe1-2-8',
                name: 'Safe1-2-8',
                component: '/demo/index',
                meta: { title: '质量控制_地质灾害防治与测量' }
              },
              {
                path: '/demo-safe/safe1/safe1-2/safe1-2-9',
                name: 'Safe1-2-9',
                component: '/demo/index',
                meta: { title: '质量控制_采煤' }
              },
              {
                path: '/demo-safe/safe1/safe1-2/safe1-2-10',
                name: 'Safe1-2-10',
                component: '/demo/index',
                meta: { title: '质量控制_掘进' }
              },
              {
                path: '/demo-safe/safe1/safe1-2/safe1-2-11',
                name: 'Safe1-2-11',
                component: '/demo/index',
                meta: { title: '质量控制_机电' }
              },
              {
                path: '/demo-safe/safe1/safe1-2/safe1-2-12',
                name: 'Safe1-2-12',
                component: '/demo/index',
                meta: { title: '质量控制_运输' }
              },
              {
                path: '/demo-safe/safe1/safe1-2/safe1-2-13',
                name: 'Safe1-2-13',
                component: '/demo/index',
                meta: { title: '质量控制_调度和应急管理' }
              },
              {
                path: '/demo-safe/safe1/safe1-2/safe1-2-14',
                name: 'Safe1-2-14',
                component: '/demo/index',
                meta: { title: '质量控制_职业病危害防治和地面设施' }
              },
              {
                path: '/demo-safe/safe1/safe1-2/safe1-2-15',
                name: 'Safe1-2-15',
                component: '/demo/index',
                meta: { title: '持续改进' }
              }
            ]
          },
          {
            path: '/demo-safe/safe1/safe1-3',
            name: 'Safe1-3',
            component: '/demo/index',
            meta: { title: '标准化评分汇总' }
          },
          {
            path: '/demo-safe/safe1/safe1-4',
            name: 'Safe1-4',
            component: '/demo/index',
            meta: { title: '矿井地质类型设置' }
          },
          {
            path: '/demo-safe/safe1/safe1-5',
            name: 'Safe1-5',
            component: '/demo/index',
            meta: { title: '标准化知识库' }
          }
        ]
      },
      {
        path: '/demo-safe/safe2',
        name: 'Safe2',
        component: '/demo/index',
        meta: { title: '安全风险分级管控' },
        children: [
          {
            path: '/demo-safe/safe2-1',
            name: 'Safe2-1',
            component: '/demo/index',
            meta: { title: '管理制度' },
            children: [
              {
                path: '/demo-safe/safe2-1/safe2-1-1',
                name: 'Safe2-1-1',
                component: '/demo/index',
                meta: { title: '安全风险分级管理制度' }
              },
              {
                path: '/demo-safe/safe2-1/safe2-1-2',
                name: 'Safe2-1-2',
                component: '/demo/index',
                meta: { title: '风险组织结构' }
              },
              {
                path: '/demo-safe/safe2-1/safe2-1-3',
                name: 'Safe2-1-3',
                component: '/demo/index',
                meta: { title: '风险责任体系' }
              }
            ]
          },
          {
            path: '/demo-safe/safe2/safe2-2',
            name: 'Safe2-2',
            component: '/demo/index',
            meta: { title: '年度辨识评估' },
            children: [
              {
                path: '/demo-safe/safe2/safe2-2/safe2-2-1',
                name: 'Safe2-2-1',
                component: '/demo/index',
                meta: { title: '年度辨识评估报告' }
              },
              {
                path: '/demo-safe/safe2/safe2-2/safe2-2-2',
                name: 'Safe2-2-2',
                component: '/demo/index',
                meta: { title: '风险辨识库' }
              }
            ]
          },
          {
            path: '/demo-safe/safe2/safe2-3',
            name: 'Safe2-3',
            component: '/demo/index',
            meta: { title: '专项辨识：设计前' },
            children: [
              {
                path: '/demo-safe/safe2/safe2-3/safe2-3-1',
                name: 'Safe2-3-1',
                component: '/demo/index',
                meta: { title: '设计前风险清单' }
              },
              {
                path: '/demo-safe/safe2/safe2-3/safe2-3-2',
                name: 'Safe2-3-2',
                component: '/demo/index',
                meta: { title: '设计前辨识报告' }
              }
            ]
          },
          {
            path: '/demo-safe/safe2/safe2-4',
            name: 'Safe2-4',
            component: '/demo/index',
            meta: { title: '专项辨识：变化后' },
            children: [
              {
                path: '/demo-safe/safe2/safe2-4/safe2-4-1',
                name: 'Safe2-4-1',
                component: '/demo/index',
                meta: { title: '变化后风险清单' }
              },
              {
                path: '/demo-safe/safe2/safe2-4/safe2-4-2',
                name: 'Safe2-4-2',
                component: '/demo/index',
                meta: { title: '变化后辨识报告' }
              }
            ]
          },
          {
            path: '/demo-safe/safe2/safe2-5',
            name: 'Safe2-5',
            component: '/demo/index',
            meta: { title: '专项辨识：施工前' },
            children: [
              {
                path: '/demo-safe/safe2/safe2-5/safe2-5-1',
                name: 'Safe2-5-1',
                component: '/demo/index',
                meta: { title: '施工前风险清单' }
              },
              {
                path: '/demo-safe/safe2/safe2-5/safe2-5-2',
                name: 'Safe2-5-2',
                component: '/demo/index',
                meta: { title: '施工前辨识报告' }
              }
            ]
          },
          {
            path: '/demo-safe/safe2/safe2-6',
            name: 'Safe2-6',
            component: '/demo/index',
            meta: { title: '专项辨识：事故后' },
            children: [
              {
                path: '/demo-safe/safe2/safe2-6/safe2-6-1',
                name: 'Safe2-6-1',
                component: '/demo/index',
                meta: { title: '事故后风险清单' }
              },
              {
                path: '/demo-safe/safe2/safe2-6/safe2-6-2',
                name: 'Safe2-6-2',
                component: '/demo/index',
                meta: { title: '事故后辨识报告' }
              }
            ]
          },
          {
            path: '/demo-safe/safe2/safe2-7',
            name: 'Safe2-7',
            component: '/demo/index',
            meta: { title: '现状风险辨识评估' }
          },
          {
            path: '/demo-safe/safe2/safe2-8',
            name: 'Safe2-8',
            component: '/demo/index',
            meta: { title: '安全风险管控' }
          },
          {
            path: '/demo-safe/safe2/safe2-9',
            name: 'Safe2-9',
            component: '/demo/index',
            meta: { title: '风险分析' }
          }
        ]
      },
      {
        path: '/demo-safe/safe3',
        name: 'Safe3',
        component: '/demo/index',
        meta: { title: '隐患排查治理' },
        children: [
          {
            path: '/demo-safe/safe3/safe3-1',
            name: 'Safe3-1',
            component: '/demo/index',
            meta: { title: '工作机制' },
            children: [
              {
                path: '/demo-safe/safe3/safe3-1/safe3-1-1',
                name: 'Safe3-1-1',
                component: '/demo/index',
                meta: { title: '隐患组织结构' }
              },
              {
                path: '/demo-safe/safe3/safe3-1/safe3-1-2',
                name: 'Safe3-1-2',
                component: '/demo/index',
                meta: { title: '隐患责任体系' }
              }
            ]
          },
          {
            path: '/demo-safe/safe3/safe3-2',
            name: 'Safe3-2',
            component: '/demo/index',
            meta: { title: '事故隐患登记' }
          },
          {
            path: '/demo-safe/safe3/safe3-3',
            name: 'Safe3-3',
            component: '/demo/index',
            meta: { title: '隐患监督管理' },
            children: [
              {
                path: '/demo-safe/safe3/safe3-3/safe3-3-1',
                name: 'Safe3-3-1',
                component: '/demo/index',
                meta: { title: '隐患整改' }
              },
              {
                path: '/demo-safe/safe3/safe3-3/safe3-3-2',
                name: 'Safe3-3-2',
                component: '/demo/index',
                meta: { title: '延期审批' }
              },
              {
                path: '/demo-safe/safe3/safe3-3/safe3-3-3',
                name: 'Safe3-3-3',
                component: '/demo/index',
                meta: { title: '隐患验收' }
              },
              {
                path: '/demo-safe/safe3/safe3-3/safe3-3-4',
                name: 'Safe3-3-4',
                component: '/demo/index',
                meta: { title: '超期隐患' }
              },
              {
                path: '/demo-safe/safe3/safe3-3/safe3-3-5',
                name: 'Safe3-3-5',
                component: '/demo/index',
                meta: { title: '治理督办' }
              }
            ]
          },
          {
            path: '/demo-safe/safe3/safe3-4',
            name: 'Safe3-4',
            component: '/demo/index',
            meta: { title: '隐患清单' }
          },
          {
            path: '/demo-safe/safe3/safe3-5',
            name: 'Safe3-5',
            component: '/demo/index',
            meta: { title: '隐患统计分析' }
          }
        ]
      },
      {
        path: '/demo-safe/safe4',
        name: 'Safe4',
        component: '/demo/index',
        meta: { title: '三违管理' },
        children: [
          {
            path: '/demo-safe/safe4/safe4-1',
            name: 'Safe4-1',
            component: '/demo/index',
            meta: { title: '三违文档管理' }
          },
          {
            path: '/demo-safe/safe4/safe4-2',
            name: 'Safe4-2',
            component: '/demo/index',
            meta: { title: '三违登记' }
          },
          {
            path: '/demo-safe/safe4/safe4-3',
            name: 'Safe4-3',
            component: '/demo/index',
            meta: { title: '三违分析' }
          }
        ]
      },
      {
        path: '/demo-safe/safe5',
        name: 'Safe5',
        component: '/demo/index',
        meta: { title: '证照管理' },
        children: [
          {
            path: '/demo-safe/safe5/safe5-1',
            name: 'Safe5-1',
            component: '/demo/index',
            meta: { title: '三证一照' }
          }
        ]
      },
      {
        path: '/demo-safe/safe6',
        name: 'Safe6',
        component: '/demo/index',
        meta: { title: '职业卫生' },
        children: [
          {
            path: '/demo-safe/safe6/safe6-1',
            name: 'Safe6-1',
            component: '/demo/index',
            meta: { title: '体检' }
          },
          {
            path: '/demo-safe/safe6/safe6-2',
            name: 'Safe6-2',
            component: '/demo/index',
            meta: { title: '劳保发放' },
            children: [
              {
                path: '/demo-safe/safe6/safe6-2/safe6-2-1',
                name: 'Safe6-2-1',
                component: '/demo/index',
                meta: { title: '年度计划' }
              },
              {
                path: '/demo-safe/safe6/safe6-2/safe6-2-2',
                name: 'Safe6-2-2',
                component: '/demo/index',
                meta: { title: '季度计划' }
              },
              {
                path: '/demo-safe/safe6/safe6-2/safe6-2-3',
                name: 'Safe6-2-3',
                component: '/demo/index',
                meta: { title: '劳保发放记录' }
              }
            ]
          },
          {
            path: '/demo-safe/safe6/safe6-3',
            name: 'Safe6-3',
            component: '/demo/index',
            meta: { title: '职业病危害防治' }
          },
          {
            path: '/demo-safe/safe6/safe6-4',
            name: 'Safe6-4',
            component: '/demo/index',
            meta: { title: '职业病危害告知' }
          }
        ]
      },
      {
        path: '/demo-safe/safe7',
        name: 'Safe7',
        component: '/demo/index',
        meta: { title: '安全综合管理' },
        children: [
          {
            path: '/demo-safe/safe7/safe7-1',
            name: 'Safe7-1',
            component: '/demo/index',
            meta: { title: '事故警示教育' }
          },
          {
            path: '/demo-safe/safe7/safe7-2',
            name: 'Safe7-2',
            component: '/demo/index',
            meta: { title: '国家安全文件' }
          },
          {
            path: '/demo-safe/safe7/safe7-3',
            name: 'Safe7-3',
            component: '/demo/index',
            meta: { title: '省市安全文件' }
          },
          {
            path: '/demo-safe/safe7/safe7-4',
            name: 'Safe7-4',
            component: '/demo/index',
            meta: { title: '集团安全文件' }
          },
          {
            path: '/demo-safe/safe7/safe7-5',
            name: 'Safe7-5',
            component: '/demo/index',
            meta: { title: '矿井安全文件' }
          },
          {
            path: '/demo-safe/safe7/safe7-6',
            name: 'Safe7-6',
            component: '/demo/index',
            meta: { title: '矿井安全例会' }
          },
          {
            path: '/demo-safe/safe7/safe7-7',
            name: 'Safe7-7',
            component: '/demo/index',
            meta: { title: '安全地点管理' }
          },
          {
            path: '/demo-safe/safe7/safe7-8',
            name: 'Safe7-8',
            component: '/demo/index',
            meta: { title: '员工培训台账' }
          }
        ]
      }
    ]
  },
  // 应急救援
  {
    path: '/demo-emergency',
    name: 'DemoEmergency',
    component: 'Layout',
    redirect: '/demo-emergency/emergency1',
    meta: { title: '应急救援' },
    children: [
      {
        path: '/demo-emergency/emergency1',
        name: 'Emergency1',
        component: '/demo/index',
        meta: { title: '应急救援指南' },
        children: [
          {
            path: '/demo-emergency/emergency1/emergency1-1',
            name: 'Emergency1-1',
            component: '/demo/index',
            meta: { title: '事故管理' }
          },
          {
            path: '/demo-emergency/emergency1/emergency1-2',
            name: 'Emergency1-2',
            component: '/demo/index',
            meta: { title: '应急流程管理' }
          }
        ]
      },
      {
        path: '/demo-emergency/emergency2',
        name: 'Emergency2',
        component: '/demo/index',
        meta: { title: '应急救援预案' },
        children: [
          {
            path: '/demo-emergency/emergency2/emergency2-1',
            name: 'Emergency2-1',
            component: '/demo/index',
            meta: { title: '综合预案' }
          },
          {
            path: '/demo-emergency/emergency2/emergency2-2',
            name: 'Emergency2-2',
            component: '/demo/index',
            meta: { title: '专项预案' }
          },
          {
            path: '/demo-emergency/emergency2/emergency2-3',
            name: 'Emergency2-3',
            component: '/demo/index',
            meta: { title: '事故处置方案' }
          }
        ]
      },
      {
        path: '/demo-emergency/emergency3',
        name: 'Emergency3',
        component: '/demo/index',
        meta: { title: '应急救援保障' },
        children: [
          {
            path: '/demo-emergency/emergency3/emergency3-1',
            name: 'Emergency3-1',
            component: '/demo/index',
            meta: { title: '应急通讯组织机构' }
          },
          {
            path: '/demo-emergency/emergency3/emergency3-2',
            name: 'Emergency3-2',
            component: '/demo/index',
            meta: { title: '应急通讯' }
          },
          {
            path: '/demo-emergency/emergency3/emergency3-3',
            name: 'Emergency3-3',
            component: '/demo/index',
            meta: { title: '应急队伍' }
          },
          {
            path: '/demo-emergency/emergency3/emergency3-4',
            name: 'Emergency3-4',
            component: '/demo/index',
            meta: { title: '应急专家' }
          },
          {
            path: '/demo-emergency/emergency3/emergency3-5',
            name: 'Emergency3-5',
            component: '/demo/index',
            meta: { title: '应急物资' }
          },
          {
            path: '/demo-emergency/emergency3/emergency3-6',
            name: 'Emergency3-6',
            component: '/demo/index',
            meta: { title: '应急车辆' }
          },
          {
            path: '/demo-emergency/emergency3/emergency3-7',
            name: 'Emergency3-7',
            component: '/demo/index',
            meta: { title: '应急医疗' }
          },
          {
            path: '/demo-emergency/emergency3/emergency3-8',
            name: 'Emergency3-8',
            component: '/demo/index',
            meta: { title: '应急避险' }
          },
          {
            path: '/demo-emergency/emergency3/emergency3-9',
            name: 'Emergency3-9',
            component: '/demo/index',
            meta: { title: '应急处置权' }
          }
        ]
      },
      {
        path: '/demo-emergency/emergency4',
        name: 'Emergency4',
        component: '/demo/index',
        meta: { title: '日常管理' },
        children: [
          {
            path: '/demo-emergency/emergency4/emergency4-1',
            name: 'Emergency4-1',
            component: '/demo/index',
            meta: { title: '事故调查报告' }
          },
          {
            path: '/demo-emergency/emergency4/emergency4-2',
            name: 'Emergency4-2',
            component: '/demo/index',
            meta: { title: '应急演练' }
          }
        ]
      }
    ]
  },
  // 一通三防
  {
    path: '/demo-prevention',
    name: 'DemoPrevention',
    component: 'Layout',
    redirect: '/demo-prevention/prevention1',
    meta: { title: '一通三防' },
    children: [
      {
        path: '/demo-prevention/prevention1',
        name: 'Prevention1',
        component: '/demo/index',
        meta: { title: '通风管理' },
        children: [
          {
            path: '/demo-prevention/prevention1/prevention1-1',
            name: 'Prevention1-1',
            component: '/demo/index',
            meta: { title: '贯通措施' }
          },
          {
            path: '/demo-prevention/prevention1/prevention1-2',
            name: 'Prevention1-2',
            component: '/demo/index',
            meta: { title: '贯通记录' }
          },
          {
            path: '/demo-prevention/prevention1/prevention1-3',
            name: 'Prevention1-3',
            component: '/demo/index',
            meta: { title: '瓦斯日报' }
          },
          {
            path: '/demo-prevention/prevention1/prevention1-4',
            name: 'Prevention1-4',
            component: '/demo/index',
            meta: { title: '通风设施' },
            children: [
              {
                path: '/demo-prevention/prevention1/prevention1-4/prevention1-4-1',
                name: 'Prevention1-4-1',
                component: '/demo/index',
                meta: { title: '风门台账' }
              },
              {
                path: '/demo-prevention/prevention1/prevention1-4/prevention1-4-2',
                name: 'Prevention1-4-2',
                component: '/demo/index',
                meta: { title: '密闭台账' }
              },
              {
                path: '/demo-prevention/prevention1/prevention1-4/prevention1-4-3',
                name: 'Prevention1-4-3',
                component: '/demo/index',
                meta: { title: '挡风墙台账' }
              },
              {
                path: '/demo-prevention/prevention1/prevention1-4/prevention1-4-4',
                name: 'Prevention1-4-4',
                component: '/demo/index',
                meta: { title: '通风设施验收记录' }
              }
            ]
          },
          {
            path: '/demo-prevention/prevention1/prevention1-5',
            name: 'Prevention1-5',
            component: '/demo/index',
            meta: { title: '甲烷传感器对照记录' }
          },
          {
            path: '/demo-prevention/prevention1/prevention1-6',
            name: 'Prevention1-6',
            component: '/demo/index',
            meta: { title: '便携仪发放记录' }
          },
          {
            path: '/demo-prevention/prevention1/prevention1-7',
            name: 'Prevention1-7',
            component: '/demo/index',
            meta: { title: '便携仪调校记录' }
          },
          {
            path: '/demo-prevention/prevention1/prevention1-8',
            name: 'Prevention1-8',
            component: '/demo/index',
            meta: { title: '安全技术措施' }
          },
          {
            path: '/demo-prevention/prevention1/prevention1-9',
            name: 'Prevention1-9',
            component: '/demo/index',
            meta: { title: '通风巷道检查记录' }
          },
          {
            path: '/demo-prevention/prevention1/prevention1-10',
            name: 'Prevention1-10',
            component: '/demo/index',
            meta: { title: '反风设施检查记录' }
          },
          {
            path: '/demo-prevention/prevention1/prevention1-11',
            name: 'Prevention1-11',
            component: '/demo/index',
            meta: { title: '测风记录' }
          },
          {
            path: '/demo-prevention/prevention1/prevention1-12',
            name: 'Prevention1-12',
            component: '/demo/index',
            meta: { title: '外部漏风率报告' }
          },
          {
            path: '/demo-prevention/prevention1/prevention1-13',
            name: 'Prevention1-13',
            component: '/demo/index',
            meta: { title: '反风演习' }
          },
          {
            path: '/demo-prevention/prevention1/prevention1-14',
            name: 'Prevention1-14',
            component: '/demo/index',
            meta: { title: '通风月报' },
            children: [
              {
                path: '/demo-prevention/prevention1/prevention1-14/prevention1-14-1',
                name: 'Prevention1-14-1',
                component: '/demo/index',
                meta: { title: '填报' }
              },
              {
                path: '/demo-prevention/prevention1/prevention1-14/prevention1-14-2',
                name: 'Prevention1-14-2',
                component: '/demo/index',
                meta: { title: '预览' }
              }
            ]
          },
          {
            path: '/demo-prevention/prevention1/prevention1-15',
            name: 'Prevention1-15',
            component: '/demo/index',
            meta: { title: '突出煤层掘进工作面防突月报' },
            children: [
              {
                path: '/demo-prevention/prevention1/prevention1-15/prevention1-15-1',
                name: 'Prevention1-15-1',
                component: '/demo/index',
                meta: { title: '填报' }
              },
              {
                path: '/demo-prevention/prevention1/prevention1-15/prevention1-15-2',
                name: 'Prevention1-15-2',
                component: '/demo/index',
                meta: { title: '预览' }
              }
            ]
          },
          {
            path: '/demo-prevention/prevention1/prevention1-16',
            name: 'Prevention1-16',
            component: '/demo/index',
            meta: { title: '钻孔施工日报' },
            children: [
              {
                path: '/demo-prevention/prevention1/prevention1-16/prevention1-16-1',
                name: 'Prevention1-16-1',
                component: '/demo/index',
                meta: { title: '填报' }
              },
              {
                path: '/demo-prevention/prevention1/prevention1-16/prevention1-16-2',
                name: 'Prevention1-16-2',
                component: '/demo/index',
                meta: { title: '预览' }
              }
            ]
          },
          {
            path: '/demo-prevention/prevention1/prevention1-17',
            name: 'Prevention1-17',
            component: '/demo/index',
            meta: { title: '通风旬报' },
            children: [
              {
                path: '/demo-prevention/prevention1/prevention1-17/prevention1-17-1',
                name: 'Prevention1-17-1',
                component: '/demo/index',
                meta: { title: '通风信息旬报' }
              },
              {
                path: '/demo-prevention/prevention1/prevention1-17/prevention1-17-2',
                name: 'Prevention1-17-2',
                component: '/demo/index',
                meta: { title: '回风量旬报表' }
              },
              {
                path: '/demo-prevention/prevention1/prevention1-17/prevention1-17-3',
                name: 'Prevention1-17-3',
                component: '/demo/index',
                meta: { title: '掘进面旬报表' }
              },
              {
                path: '/demo-prevention/prevention1/prevention1-17/prevention1-17-4',
                name: 'Prevention1-17-4',
                component: '/demo/index',
                meta: { title: '采煤工作面通风情况旬报表' }
              }
            ]
          }
        ]
      },
      {
        path: '/demo-prevention/prevention2',
        name: 'Prevention2',
        component: '/demo/index',
        meta: { title: '瓦斯管理' },
        children: [
          {
            path: '/demo-prevention/prevention2-1',
            name: 'Prevention2-1',
            component: '/demo/index',
            meta: { title: '瓦斯鉴定报告' },
            children: [
              {
                path: '/demo-prevention/prevention2-1/prevention2-1-1',
                name: 'Prevention2-1-1',
                component: '/demo/index',
                meta: { title: '通风旬报' }
              }
            ]
          },
          {
            path: '/demo-prevention/prevention2-2',
            name: 'Prevention2-2',
            component: '/demo/index',
            meta: { title: '瓦斯抽采' },
            children: [
              {
                path: '/demo-prevention/prevention2-2/prevention2-2-1',
                name: 'Prevention2-2-1',
                component: '/demo/index',
                meta: { title: '巡查报告' }
              },
              {
                path: '/demo-prevention/prevention2-2/prevention2-2-2',
                name: 'Prevention2-2-2',
                component: '/demo/index',
                meta: { title: '抽采对比台账' }
              },
              {
                path: '/demo-prevention/prevention2-2/prevention2-2-3',
                name: 'Prevention2-2-3',
                component: '/demo/index',
                meta: { title: '管路巡查台账' }
              },
              {
                path: '/demo-prevention/prevention2-2/prevention2-2-4',
                name: 'Prevention2-2-4',
                component: '/demo/index',
                meta: { title: '抽采阻力测定报告' }
              },
              {
                path: '/demo-prevention/prevention2-2/prevention2-2-5',
                name: 'Prevention2-2-5',
                component: '/demo/index',
                meta: { title: '掉钻记录' }
              },
              {
                path: '/demo-prevention/prevention2-2/prevention2-2-6',
                name: 'Prevention2-2-6',
                component: '/demo/index',
                meta: { title: '钻孔设计' }
              },
              {
                path: '/demo-prevention/prevention2-2/prevention2-2-7',
                name: 'Prevention2-2-7',
                component: '/demo/index',
                meta: { title: '抽采管路设计' }
              },
              {
                path: '/demo-prevention/prevention2-2/prevention2-2-8',
                name: 'Prevention2-2-8',
                component: '/demo/index',
                meta: { title: '抽采达标评判报告' }
              },
              {
                path: '/demo-prevention/prevention2-2/prevention2-2-9',
                name: 'Prevention2-2-9',
                component: '/demo/index',
                meta: { title: '瓦斯抽采设计' }
              }
            ]
          },
          {
            path: '/demo-prevention/prevention2-3',
            name: 'Prevention2-3',
            component: '/demo/index',
            meta: { title: '瓦斯超限记录' }
          },
          {
            path: '/demo-prevention/prevention2-4',
            name: 'Prevention2-4',
            component: '/demo/index',
            meta: { title: '瓦斯排放措施' }
          },
          {
            path: '/demo-prevention/prevention2-5',
            name: 'Prevention2-5',
            component: '/demo/index',
            meta: { title: '瓦斯排放记录' }
          },
          {
            path: '/demo-prevention/prevention2-6',
            name: 'Prevention2-6',
            component: '/demo/index',
            meta: { title: '瓦斯防治中长期规划' }
          },
          {
            path: '/demo-prevention/prevention2-7',
            name: 'Prevention2-7',
            component: '/demo/index',
            meta: { title: '通风阻力测定报告' }
          },
          {
            path: '/demo-prevention/prevention2-8',
            name: 'Prevention2-8',
            component: '/demo/index',
            meta: { title: '通风阻力测定报告' }
          },
          {
            path: '/demo-prevention/prevention2-9',
            name: 'Prevention2-9',
            component: '/demo/index',
            meta: { title: '防突管理' },
            children: [
              {
                path: '/demo-prevention/prevention2-9/prevention2-9-1',
                name: 'Prevention2-9-1',
                component: '/demo/index',
                meta: { title: '工作面区域防突设计及措施' }
              },
              {
                path: '/demo-prevention/prevention2-9/prevention2-9-2',
                name: 'Prevention2-9-2',
                component: '/demo/index',
                meta: { title: '年度、季度、月度防突措施实施计划' }
              },
              {
                path: '/demo-prevention/prevention2-9/prevention2-9-3',
                name: 'Prevention2-9-3',
                component: '/demo/index',
                meta: { title: '工作面抽采达标评判报告' }
              },
              {
                path: '/demo-prevention/prevention2-9/prevention2-9-4',
                name: 'Prevention2-9-4',
                component: '/demo/index',
                meta: { title: '区域验证（局部措施效果检验）报表' }
              },
              {
                path: '/demo-prevention/prevention2-9/prevention2-9-5',
                name: 'Prevention2-9-5',
                component: '/demo/index',
                meta: { title: '工作面防突措施' }
              }
            ]
          },
          {
            path: '/demo-prevention/prevention2-10',
            name: 'Prevention2-10',
            component: '/demo/index',
            meta: { title: '采煤工作面瓦斯涌出量报表' },
            children: [
              {
                path: '/demo-prevention/prevention2-10/prevention2-10-1',
                name: 'Prevention2-10-1',
                component: '/demo/index',
                meta: { title: '填报' }
              },
              {
                path: '/demo-prevention/prevention2-10/prevention2-10-2',
                name: 'Prevention2-10-2',
                component: '/demo/index',
                meta: { title: '预览' }
              }
            ]
          },
          {
            path: '/demo-prevention/prevention2-11',
            name: 'Prevention2-11',
            component: '/demo/index',
            meta: { title: '采煤工作面瓦斯治理月报' },
            children: [
              {
                path: '/demo-prevention/prevention2-11/prevention2-11-1',
                name: 'Prevention2-11-1',
                component: '/demo/index',
                meta: { title: '填报' }
              },
              {
                path: '/demo-prevention/prevention2-11/prevention2-11-2',
                name: 'Prevention2-11-2',
                component: '/demo/index',
                meta: { title: '预览' }
              }
            ]
          },
          {
            path: '/demo-prevention/prevention2-12',
            name: 'Prevention2-12',
            component: '/demo/index',
            meta: { title: '贯通、排瓦斯月报' },
            children: [
              {
                path: '/demo-prevention/prevention2-12/prevention2-12-1',
                name: 'Prevention2-12-1',
                component: '/demo/index',
                meta: { title: '填报' }
              },
              {
                path: '/demo-prevention/prevention2-12/prevention2-12-2',
                name: 'Prevention2-12-2',
                component: '/demo/index',
                meta: { title: '预览' }
              }
            ]
          },
          {
            path: '/demo-prevention/prevention2-13',
            name: 'Prevention2-13',
            component: '/demo/index',
            meta: { title: '瓦斯利用日报' },
            children: [
              {
                path: '/demo-prevention/prevention2-13/prevention2-13-1',
                name: 'Prevention2-13-1',
                component: '/demo/index',
                meta: { title: '填报' }
              },
              {
                path: '/demo-prevention/prevention2-13/prevention2-13-2',
                name: 'Prevention2-13-2',
                component: '/demo/index',
                meta: { title: '预览' }
              }
            ]
          },
          {
            path: '/demo-prevention/prevention2-14',
            name: 'Prevention2-14',
            component: '/demo/index',
            meta: { title: '瓦斯利用月报' },
            children: [
              {
                path: '/demo-prevention/prevention2-14/prevention2-14-1',
                name: 'Prevention2-14-1',
                component: '/demo/index',
                meta: { title: '填报' }
              },
              {
                path: '/demo-prevention/prevention2-14/prevention2-14-2',
                name: 'Prevention2-14-2',
                component: '/demo/index',
                meta: { title: '预览' }
              }
            ]
          },
          {
            path: '/demo-prevention/prevention2-15',
            name: 'Prevention2-15',
            component: '/demo/index',
            meta: { title: '重点瓦斯日报' },
            children: [
              {
                path: '/demo-prevention/prevention2-15/prevention2-15-1',
                name: 'Prevention2-15-1',
                component: '/demo/index',
                meta: { title: '填报' }
              },
              {
                path: '/demo-prevention/prevention2-15/prevention2-15-2',
                name: 'Prevention2-15-2',
                component: '/demo/index',
                meta: { title: '预览' }
              }
            ]
          }
        ]
      },
      {
        path: '/demo-prevention/prevention3',
        name: 'Prevention3',
        component: '/demo/index',
        meta: { title: '防火管理' },
        children: [
          {
            path: '/demo-prevention/prevention3/prevention3-1',
            name: 'Prevention3-1',
            component: '/demo/index',
            meta: { title: '防火门台账填报' }
          },
          {
            path: '/demo-prevention/prevention3/prevention3-2',
            name: 'Prevention3-2',
            component: '/demo/index',
            meta: { title: '煤层自燃倾向性鉴定报告' },
            children: [
              {
                path: '/demo-prevention/prevention3/prevention3-2/prevention3-2-1',
                name: 'Prevention3-2-1',
                component: '/demo/index',
                meta: { title: '预览' }
              }
            ]
          },
          {
            path: '/demo-prevention/prevention3/prevention3-3',
            name: 'Prevention3-3',
            component: '/demo/index',
            meta: { title: '隔爆水袋检查记录' }
          },
          {
            path: '/demo-prevention/prevention3/prevention3-4',
            name: 'Prevention3-4',
            component: '/demo/index',
            meta: { title: '防火报表' }
          },
          {
            path: '/demo-prevention/prevention3/prevention3-5',
            name: 'Prevention3-5',
            component: '/demo/index',
            meta: { title: '灌浆注氮记录' }
          },
          {
            path: '/demo-prevention/prevention3/prevention3-6',
            name: 'Prevention3-6',
            component: '/demo/index',
            meta: { title: '放炮月报' },
            children: [
              {
                path: '/demo-prevention/prevention3/prevention3-6/prevention3-6-1',
                name: 'Prevention3-6-1',
                component: '/demo/index',
                meta: { title: '填报' }
              },
              {
                path: '/demo-prevention/prevention3/prevention3-6/prevention3-6-2',
                name: 'Prevention3-6-2',
                component: '/demo/index',
                meta: { title: '预览' }
              }
            ]
          }
        ]
      },
      {
        path: '/demo-prevention/prevention4',
        name: 'Prevention4',
        component: '/demo/index',
        meta: { title: '防尘管理' },
        children: [
          {
            path: '/demo-prevention/prevention4/prevention4-1',
            name: 'Prevention4-1',
            component: '/demo/index',
            meta: { title: '防尘设施台账' }
          },
          {
            path: '/demo-prevention/prevention4/prevention4-2',
            name: 'Prevention4-2',
            component: '/demo/index',
            meta: { title: '测尘记录' }
          },
          {
            path: '/demo-prevention/prevention4/prevention4-3',
            name: 'Prevention4-3',
            component: '/demo/index',
            meta: { title: '冲尘记录' }
          },
          {
            path: '/demo-prevention/prevention4/prevention4-4',
            name: 'Prevention4-4',
            component: '/demo/index',
            meta: { title: '测尘月报' }
          },
          {
            path: '/demo-prevention/prevention4/prevention4-5',
            name: 'Prevention4-5',
            component: '/demo/index',
            meta: { title: '煤尘爆炸危险性鉴定报告' }
          },
          {
            path: '/demo-prevention/prevention4/prevention4-6',
            name: 'Prevention4-6',
            component: '/demo/index',
            meta: { title: '防尘月报' },
            children: [
              {
                path: '/demo-prevention/prevention4/prevention4-6/prevention4-6-1',
                name: 'Prevention4-6-1',
                component: '/demo/index',
                meta: { title: '采掘面防尘情况月报' }
              },
              {
                path: '/demo-prevention/prevention4/prevention4-6/prevention4-6-2',
                name: 'Prevention4-6-2',
                component: '/demo/index',
                meta: { title: '防治高尘措施场所月报' }
              },
              {
                path: '/demo-prevention/prevention4/prevention4-6/prevention4-6-3',
                name: 'Prevention4-6-3',
                component: '/demo/index',
                meta: { title: '粉尘浓度情况与测尘仪型号月报表' }
              },
              {
                path: '/demo-prevention/prevention4/prevention4-6/prevention4-6-4',
                name: 'Prevention4-6-4',
                component: '/demo/index',
                meta: { title: '采掘面粉尘浓度检测月报' }
              },
              {
                path: '/demo-prevention/prevention4/prevention4-6/prevention4-6-5',
                name: 'Prevention4-6-5',
                component: '/demo/index',
                meta: { title: '防尘月报' }
              }
            ]
          }
        ]
      },
      {
        path: '/demo-prevention/prevention5',
        name: 'Prevention5',
        component: '/demo/index',
        meta: { title: '安全监控管理' },
        children: [
          {
            path: '/demo-prevention/prevention5/prevention5-1',
            name: 'Prevention5-1',
            component: '/demo/index',
            meta: { title: '监控设备管理台账' }
          },
          {
            path: '/demo-prevention/prevention5/prevention5-2',
            name: 'Prevention5-2',
            component: '/demo/index',
            meta: { title: '安全监控设备检查、测试记录' },
            children: [
              {
                path: '/demo-prevention/prevention5/prevention5-2/prevention5-2-1',
                name: 'Prevention5-2-1',
                component: '/demo/index',
                meta: { title: '三分闭锁测试记录' }
              },
              {
                path: '/demo-prevention/prevention5/prevention5-2/prevention5-2-2',
                name: 'Prevention5-2-2',
                component: '/demo/index',
                meta: { title: '井下巡检记录' }
              },
              {
                path: '/demo-prevention/prevention5/prevention5-2/prevention5-2-3',
                name: 'Prevention5-2-3',
                component: '/demo/index',
                meta: { title: '避雷设施检查记录' }
              },
              {
                path: '/demo-prevention/prevention5/prevention5-2/prevention5-2-4',
                name: 'Prevention5-2-4',
                component: '/demo/index',
                meta: { title: '监控机房UPS电源测试记录' }
              }
            ]
          },
          {
            path: '/demo-prevention/prevention5/prevention5-3',
            name: 'Prevention5-3',
            component: '/demo/index',
            meta: { title: '监控传感器校验记录' }
          },
          {
            path: '/demo-prevention/prevention5/prevention5-4',
            name: 'Prevention5-4',
            component: '/demo/index',
            meta: { title: '监控月报上传' }
          },
          {
            path: '/demo-prevention/prevention5/prevention5-5',
            name: 'Prevention5-5',
            component: '/demo/index',
            meta: { title: '监控设备故障记录' }
          },
          {
            path: '/demo-prevention/prevention5/prevention5-6',
            name: 'Prevention5-6',
            component: '/demo/index',
            meta: { title: '监控月报' },
            children: [
              {
                path: '/demo-prevention/prevention5/prevention5-6/prevention5-6-1',
                name: 'Prevention5-6-1',
                component: '/demo/index',
                meta: { title: '安全监控系统故障统计表' }
              },
              {
                path: '/demo-prevention/prevention5/prevention5-6/prevention5-6-2',
                name: 'Prevention5-6-2',
                component: '/demo/index',
                meta: { title: '安全监控系统装备情况表' }
              },
              {
                path: '/demo-prevention/prevention5/prevention5-6/prevention5-6-3',
                name: 'Prevention5-6-3',
                component: '/demo/index',
                meta: { title: '抽采自动计量装备情况表' }
              },
              {
                path: '/demo-prevention/prevention5/prevention5-6/prevention5-6-4',
                name: 'Prevention5-6-4',
                component: '/demo/index',
                meta: { title: '设备使用情况表' }
              },
              {
                path: '/demo-prevention/prevention5/prevention5-6/prevention5-6-5',
                name: 'Prevention5-6-5',
                component: '/demo/index',
                meta: { title: '采掘开等场所各类传感器安设情况表' }
              },
              {
                path: '/demo-prevention/prevention5/prevention5-6/prevention5-6-6',
                name: 'Prevention5-6-6',
                component: '/demo/index',
                meta: { title: '监控月报' }
              }
            ]
          }
        ]
      },
      {
        path: '/demo-prevention/prevention6',
        name: 'Prevention6',
        component: '/demo/index',
        meta: { title: '通防图件' },
        children: [
          {
            path: '/demo-prevention/prevention6/prevention6-1',
            name: 'Prevention6-1',
            component: '/demo/index',
            meta: { title: '通风系统图' }
          },
          {
            path: '/demo-prevention/prevention6/prevention6-2',
            name: 'Prevention6-2',
            component: '/demo/index',
            meta: { title: '通风立体示意图' }
          },
          {
            path: '/demo-prevention/prevention6/prevention6-3',
            name: 'Prevention6-3',
            component: '/demo/index',
            meta: { title: '通风网络图' }
          },
          {
            path: '/demo-prevention/prevention6/prevention6-4',
            name: 'Prevention6-4',
            component: '/demo/index',
            meta: { title: '瓦斯地质图' }
          },
          {
            path: '/demo-prevention/prevention6/prevention6-5',
            name: 'Prevention6-5',
            component: '/demo/index',
            meta: { title: '防尘、防火系统图' }
          },
          {
            path: '/demo-prevention/prevention6/prevention6-6',
            name: 'Prevention6-6',
            component: '/demo/index',
            meta: { title: '避灾路线图' }
          },
          {
            path: '/demo-prevention/prevention6/prevention6-7',
            name: 'Prevention6-7',
            component: '/demo/index',
            meta: { title: '安全监控系统布置图' }
          },
          {
            path: '/demo-prevention/prevention6/prevention6-8',
            name: 'Prevention6-8',
            component: '/demo/index',
            meta: { title: '安全监控系统断电控制图' }
          },
          {
            path: '/demo-prevention/prevention6/prevention6-9',
            name: 'Prevention6-9',
            component: '/demo/index',
            meta: { title: '瓦斯抽采系统图' }
          },
          {
            path: '/demo-prevention/prevention6/prevention6-10',
            name: 'Prevention6-10',
            component: '/demo/index',
            meta: { title: '安全监控网络拓扑图' }
          }
        ]
      },
      {
        path: '/demo-prevention/prevention7',
        name: 'Prevention7',
        component: '/demo/index',
        meta: { title: '基础管理' },
        children: [
          {
            path: '/demo-prevention/prevention7/prevention7-1',
            name: 'Prevention7-1',
            component: '/demo/index',
            meta: { title: '管理制度' }
          },
          {
            path: '/demo-prevention/prevention7/prevention7-2',
            name: 'Prevention7-2',
            component: '/demo/index',
            meta: { title: '岗位责任制度' }
          },
          {
            path: '/demo-prevention/prevention7/prevention7-3',
            name: 'Prevention7-3',
            component: '/demo/index',
            meta: { title: '岗位操作规程' }
          },
          {
            path: '/demo-prevention/prevention7/prevention7-4',
            name: 'Prevention7-4',
            component: '/demo/index',
            meta: { title: '“一通三防”例会' }
          },
          {
            path: '/demo-prevention/prevention7/prevention7-5',
            name: 'Prevention7-5',
            component: '/demo/index',
            meta: { title: '“一通三防”工作总结' }
          },
          {
            path: '/demo-prevention/prevention7/prevention7-6',
            name: 'Prevention7-6',
            component: '/demo/index',
            meta: { title: '通风人员配置' }
          },
          {
            path: '/demo-prevention/prevention7/prevention7-7',
            name: 'Prevention7-7',
            component: '/demo/index',
            meta: { title: '风险辨识及隐患排查' }
          },
          {
            path: '/demo-prevention/prevention7/prevention7-8',
            name: 'Prevention7-8',
            component: '/demo/index',
            meta: { title: '通防任务计划提醒' },
            children: [
              {
                path: '/demo-prevention/prevention7/prevention7-8/prevention7-8-1',
                name: 'Prevention7-8-1',
                component: '/demo/index',
                meta: { title: '任务计划提醒' }
              },
              {
                path: '/demo-prevention/prevention7/prevention7-8/prevention7-8-2',
                name: 'Prevention7-8-2',
                component: '/demo/index',
                meta: { title: '通防提醒日历' }
              },
              {
                path: '/demo-prevention/prevention7/prevention7-8/prevention7-8-3',
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
    path: '/demo-mechanical',
    name: 'DemoMechanical',
    component: 'Layout',
    redirect: '/demo-mechanical/mechanical1',
    meta: { title: '机电运输' },
    children: [
      {
        path: '/demo-mechanical/mechanical1',
        name: 'Mechanical1',
        component: '/demo/index',
        meta: { title: '机电管理' },
        children: [
          {
            path: '/demo-mechanical/mechanical1/mechanical1-1',
            name: 'Mechanical1-1',
            component: '/demo/index',
            meta: { title: '大型设备管理' }
          },
          {
            path: '/demo-mechanical/mechanical1/mechanical1-2',
            name: 'Mechanical1-2',
            component: '/demo/index',
            meta: { title: '大型设备类型' }
          },
          {
            path: '/demo-mechanical/mechanical1/mechanical1-3',
            name: 'Mechanical1-3',
            component: '/demo/index',
            meta: { title: '维修知识库' }
          },
          {
            path: '/demo-mechanical/mechanical1/mechanical1-4',
            name: 'Mechanical1-4',
            component: '/demo/index',
            meta: { title: '设备能耗分析知识库' }
          },
          {
            path: '/demo-mechanical/mechanical1/mechanical1-5',
            name: 'Mechanical1-5',
            component: '/demo/index',
            meta: { title: '机电数字文档' }
          }
        ]
      },
      {
        path: '/demo-mechanical/mechanical2',
        name: 'Mechanical2',
        component: '/demo/index',
        meta: { title: '运输管理' },
        children: [
          {
            path: '/demo-mechanical/mechanical2/mechanical2-1',
            name: 'Mechanical2-1',
            component: '/demo/index',
            meta: { title: '大型设备管理' }
          },
          {
            path: '/demo-mechanical/mechanical2/mechanical2-2',
            name: 'Mechanical2-2',
            component: '/demo/index',
            meta: { title: '大型设备类型' }
          },
          {
            path: '/demo-mechanical/mechanical2/mechanical2-3',
            name: 'Mechanical2-3',
            component: '/demo/index',
            meta: { title: '典型故障知识库' }
          },
          {
            path: '/demo-mechanical/mechanical2/mechanical2-4',
            name: 'Mechanical2-4',
            component: '/demo/index',
            meta: { title: '历史故障知识库' }
          },
          {
            path: '/demo-mechanical/mechanical2/mechanical2-5',
            name: 'Mechanical2-5',
            component: '/demo/index',
            meta: { title: '运输数字文档' }
          }
        ]
      },
      {
        path: '/demo-mechanical/mechanical3',
        name: 'Mechanical3',
        component: '/demo/index',
        meta: { title: '检修管理' },
        children: [
          {
            path: '/demo-mechanical/mechanical3/mechanical3-1',
            name: 'Mechanical3-1',
            component: '/demo/index',
            meta: { title: '检修计划' }
          },
          {
            path: '/demo-mechanical/mechanical3/mechanical3-2',
            name: 'Mechanical3-2',
            component: '/demo/index',
            meta: { title: '日常维检管理' }
          },
          {
            path: '/demo-mechanical/mechanical3/mechanical3-3',
            name: 'Mechanical3-3',
            component: '/demo/index',
            meta: { title: '日常维检日历' }
          },
          {
            path: '/demo-mechanical/mechanical3/mechanical3-4',
            name: 'Mechanical3-4',
            component: '/demo/index',
            meta: { title: '设备维修' }
          },
          {
            path: '/demo-mechanical/mechanical3/mechanical3-5',
            name: 'Mechanical3-5',
            component: '/demo/index',
            meta: { title: '备品备件' }
          }
        ]
      },
      {
        path: '/demo-mechanical/mechanical4',
        name: 'Mechanical4',
        component: '/demo/index',
        meta: { title: '设备管理' },
        children: [
          {
            path: '/demo-mechanical/mechanical4/mechanical4-1',
            name: 'Mechanical4-1',
            component: '/demo/index',
            meta: { title: '供应商管理' }
          },
          {
            path: '/demo-mechanical/mechanical4/mechanical4-2',
            name: 'Mechanical4-2',
            component: '/demo/index',
            meta: { title: '设备类型管理' }
          },
          {
            path: '/demo-mechanical/mechanical4/mechanical4-3',
            name: 'Mechanical4-3',
            component: '/demo/index',
            meta: { title: '设备型号管理' }
          },
          {
            path: '/demo-mechanical/mechanical4/mechanical4-4',
            name: 'Mechanical4-4',
            component: '/demo/index',
            meta: { title: '设备出入库' }
          },
          {
            path: '/demo-mechanical/mechanical4/mechanical4-5',
            name: 'Mechanical4-5',
            component: '/demo/index',
            meta: { title: '在用设备' }
          },
          {
            path: '/demo-mechanical/mechanical4/mechanical4-6',
            name: 'Mechanical4-6',
            component: '/demo/index',
            meta: { title: '设备维修' }
          },
          {
            path: '/demo-mechanical/mechanical4/mechanical4-7',
            name: 'Mechanical4-7',
            component: '/demo/index',
            meta: { title: '设备报废' }
          },
          {
            path: '/demo-mechanical/mechanical4/mechanical4-8',
            name: 'Mechanical4-8',
            component: '/demo/index',
            meta: { title: '设备台账' }
          },
          {
            path: '/demo-mechanical/mechanical4/mechanical4-9',
            name: 'Mechanical4-9',
            component: '/demo/index',
            meta: { title: '设备证书' }
          },
          {
            path: '/demo-mechanical/mechanical4/mechanical4-10',
            name: 'Mechanical4-10',
            component: '/demo/index',
            meta: { title: '生产设备汇总表' }
          }
        ]
      },
      {
        path: '/demo-mechanical/mechanical5',
        name: 'Mechanical5',
        component: '/demo/index',
        meta: { title: '供电管理' },
        children: [
          {
            path: '/demo-mechanical/mechanical5/mechanical5-1',
            name: 'Mechanical5-1',
            component: '/demo/index',
            meta: { title: '编码管理' }
          },
          {
            path: '/demo-mechanical/mechanical5/mechanical5-2',
            name: 'Mechanical5-2',
            component: '/demo/index',
            meta: { title: '电缆出入库' }
          },
          {
            path: '/demo-mechanical/mechanical5/mechanical5-3',
            name: 'Mechanical5-3',
            component: '/demo/index',
            meta: { title: '在用电缆' }
          },
          {
            path: '/demo-mechanical/mechanical5/mechanical5-4',
            name: 'Mechanical5-4',
            component: '/demo/index',
            meta: { title: '电缆报废' }
          },
          {
            path: '/demo-mechanical/mechanical5/mechanical5-5',
            name: 'Mechanical5-5',
            component: '/demo/index',
            meta: { title: '电缆台账' }
          },
          {
            path: '/demo-mechanical/mechanical5/mechanical5-6',
            name: 'Mechanical5-6',
            component: '/demo/index',
            meta: { title: '用电量管理' },
            children: [
              {
                path: '/demo-mechanical/mechanical5/mechanical5-6/mechanical5-6-1',
                name: 'Mechanical5-6-1',
                component: '/demo/index',
                meta: { title: '供电一队上报' }
              },
              {
                path: '/demo-mechanical/mechanical5/mechanical5-6/mechanical5-6-2',
                name: 'Mechanical5-6-2',
                component: '/demo/index',
                meta: { title: '供电二队上报' }
              }
            ]
          },
          {
            path: '/demo-mechanical/mechanical5/mechanical5-7',
            name: 'Mechanical5-7',
            component: '/demo/index',
            meta: { title: '停供电申请审批' },
            children: [
              {
                path: '/demo-mechanical/mechanical5/mechanical5-7/mechanical5-7-1',
                name: 'Mechanical5-7-1',
                component: '/demo/index',
                meta: { title: '停供电申请' }
              },
              {
                path: '/demo-mechanical/mechanical5/mechanical5-7/mechanical5-7-2',
                name: 'Mechanical5-7-2',
                component: '/demo/index',
                meta: { title: '单位审核' }
              },
              {
                path: '/demo-mechanical/mechanical5/mechanical5-7/mechanical5-7-3',
                name: 'Mechanical5-7-3',
                component: '/demo/index',
                meta: { title: '电管员审核' }
              },
              {
                path: '/demo-mechanical/mechanical5/mechanical5-7/mechanical5-7-4',
                name: 'Mechanical5-7-4',
                component: '/demo/index',
                meta: { title: '电管班审核' }
              },
              {
                path: '/demo-mechanical/mechanical5/mechanical5-7/mechanical5-7-5',
                name: 'Mechanical5-7-5',
                component: '/demo/index',
                meta: { title: '影响单位审核' }
              },
              {
                path: '/demo-mechanical/mechanical5/mechanical5-7/mechanical5-7-6',
                name: 'Mechanical5-7-6',
                component: '/demo/index',
                meta: { title: '固定单位审核' }
              },
              {
                path: '/demo-mechanical/mechanical5/mechanical5-7/mechanical5-7-7',
                name: 'Mechanical5-7-7',
                component: '/demo/index',
                meta: { title: '机电领导审核' }
              },
              {
                path: '/demo-mechanical/mechanical5/mechanical5-7/mechanical5-7-8',
                name: 'Mechanical5-7-8',
                component: '/demo/index',
                meta: { title: '矿总值班审核' }
              }
            ]
          }
        ]
      },
      {
        path: '/demo-mechanical/mechanical6',
        name: 'Mechanical6',
        component: '/demo/index',
        meta: { title: '机电图件' },
        children: [
          {
            path: '/demo-mechanical/mechanical6/mechanical6-1',
            name: 'Mechanical6-1',
            component: '/demo/index',
            meta: { title: '主排水系统图' }
          },
          {
            path: '/demo-mechanical/mechanical6/mechanical6-2',
            name: 'Mechanical6-2',
            component: '/demo/index',
            meta: { title: '供水系统图' }
          },
          {
            path: '/demo-mechanical/mechanical6/mechanical6-3',
            name: 'Mechanical6-3',
            component: '/demo/index',
            meta: { title: '压风系统图' }
          },
          {
            path: '/demo-mechanical/mechanical6/mechanical6-4',
            name: 'Mechanical6-4',
            component: '/demo/index',
            meta: { title: '机电设备布置图' }
          },
          {
            path: '/demo-mechanical/mechanical6/mechanical6-5',
            name: 'Mechanical6-5',
            component: '/demo/index',
            meta: { title: '井上下供电系统图' }
          },
          {
            path: '/demo-mechanical/mechanical6/mechanical6-6',
            name: 'Mechanical6-6',
            component: '/demo/index',
            meta: { title: '运输系统图' }
          }
        ]
      },
      {
        path: '/demo-mechanical/mechanical7',
        name: 'Mechanical7',
        component: '/demo/index',
        meta: { title: '技术管理' },
        children: [
          {
            path: '/demo-mechanical/mechanical7/mechanical7-1',
            name: 'Mechanical7-1',
            component: '/demo/index',
            meta: { title: '规章制度' }
          },
          {
            path: '/demo-mechanical/mechanical7/mechanical7-2',
            name: 'Mechanical7-2',
            component: '/demo/index',
            meta: { title: '操作规程' }
          },
          {
            path: '/demo-mechanical/mechanical7/mechanical7-3',
            name: 'Mechanical7-3',
            component: '/demo/index',
            meta: { title: '资料文件' }
          },
          {
            path: '/demo-mechanical/mechanical7/mechanical7-4',
            name: 'Mechanical7-4',
            component: '/demo/index',
            meta: { title: '相关标准' }
          },
          {
            path: '/demo-mechanical/mechanical7/mechanical7-5',
            name: 'Mechanical7-5',
            component: '/demo/index',
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
    meta: { title: '综合自动化' },
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
  // 系统管理
  {
    path: '/demo-system',
    name: 'DemoSystem',
    component: 'Layout',
    redirect: '/demo-system/system1',
    meta: { title: '系统管理' },
    children: [
      {
        path: '/demo-system/system1',
        name: 'System1',
        component: '/demo/index',
        meta: { title: '门户设置管理' },
        children: [
          {
            path: '/demo-system/system1/system1-1',
            name: 'System1-1',
            component: '/demo/index',
            meta: { title: '门户资源设置' }
          },
          {
            path: '/demo-system/system1/system1-2',
            name: 'System1-2',
            component: '/demo/index',
            meta: { title: '门户布局设置' }
          },
          {
            path: '/demo-system/system1/system1-3',
            name: 'System1-3',
            component: '/demo/index',
            meta: { title: '门户内容设置' }
          },
          {
            path: '/demo-system/system1/system1-4',
            name: 'System1-4',
            component: '/demo/index',
            meta: { title: '门户权限设置' }
          }
        ]
      },
      {
        path: '/demo-system/system2',
        name: 'System2',
        component: '/demo/index',
        meta: { title: '页面视图配置管理' },
        children: [
          {
            path: '/demo-system/system2/system2-1',
            name: 'System2-1',
            component: '/demo/index',
            meta: { title: '页面资源管理' }
          },
          {
            path: '/demo-system/system2/system2-2',
            name: 'System2-2',
            component: '/demo/index',
            meta: { title: '页面布局设置' }
          }
        ]
      },
      {
        path: '/demo-system/system3',
        name: 'System3',
        component: '/demo/index',
        meta: { title: '系统日志' },
        children: [
          {
            path: '/demo-system/system3/system3-1',
            name: 'System3-1',
            component: '/demo/index',
            meta: { title: '登录日志' }
          },
          {
            path: '/demo-system/system3/system3-2',
            name: 'System3-2',
            component: '/demo/index',
            meta: { title: '操作日志' }
          },
          {
            path: '/demo-system/system3/system3-3',
            name: 'System3-3',
            component: '/demo/index',
            meta: { title: '系统日志' }
          }
        ]
      },
      {
        path: '/demo-system/system4',
        name: 'System4',
        component: '/demo/index',
        meta: { title: '问题反馈' }
      },
      {
        path: '/demo-system/system5',
        name: 'System5',
        component: '/demo/index',
        meta: { title: '一张图设置' },
        children: [
          {
            path: '/demo-system/system5/system5-1',
            name: 'System5-1',
            component: '/demo/index',
            meta: { title: '实体分类' }
          },
          {
            path: '/demo-system/system5/system5-2',
            name: 'System5-2',
            component: '/demo/index',
            meta: { title: '避灾路线绘制' }
          },
          {
            path: '/demo-system/system5/system5-3',
            name: 'System5-3',
            component: '/demo/index',
            meta: { title: '实体设置' }
          },
          {
            path: '/demo-system/system5/system5-4',
            name: 'System5-4',
            component: '/demo/index',
            meta: { title: '属性设置' }
          }
        ]
      }
    ]
  },
  // 消息管理
  {
    path: '/demo-message',
    name: 'DemoMessage',
    component: 'Layout',
    redirect: '/demo-message/message1',
    meta: { title: '消息管理' },
    children: [
      {
        path: '/demo-message/message1',
        name: 'Message1',
        component: '/demo/index',
        meta: { title: '消息模板配置' }
      },
      {
        path: '/demo-message/message2',
        name: 'Message2',
        component: '/demo/index',
        meta: { title: '消息日志' }
      },
      {
        path: '/demo-message/message3',
        name: 'Message3',
        component: '/demo/index',
        meta: { title: '消息统计分析' }
      },
      {
        path: '/demo-message/message4',
        name: 'Message4',
        component: '/demo/index',
        meta: { title: '发送策略配置' }
      }
    ]
  },
  // 流程管理
  {
    path: '/demo-flow',
    name: 'DemoFlow',
    component: 'Layout',
    redirect: '/demo-flow/flow1',
    meta: { title: '流程管理' },
    children: [
      {
        path: '/demo-flow/flow1',
        name: 'Flow1',
        component: '/demo/index',
        meta: { title: '流程配置' }
      },
      {
        path: '/demo-flow/flow2',
        name: 'Flow2',
        component: '/demo/index',
        meta: { title: '流程统计分析' }
      },
      {
        path: '/demo-flow/flow3',
        name: 'Flow3',
        component: '/demo/index',
        meta: { title: '流程管理' }
      }
    ]
  },
  // 统一权限管理
  {
    path: '/demo-authority',
    name: 'DemoAuthority',
    component: 'Layout',
    redirect: '/demo-authority/authority1',
    meta: { title: '统一权限管理' },
    children: [
      {
        path: '/demo-authority/authority1',
        name: 'Authority1',
        component: '/demo/index',
        meta: { title: '应用系统管理' }
      },
      {
        path: '/demo-authority/authority2',
        name: 'Authority2',
        component: '/demo/index',
        meta: { title: '用户管理' }
      },
      {
        path: '/demo-authority/authority3',
        name: 'Authority3',
        component: '/demo/index',
        meta: { title: '组织机构管理' }
      },
      {
        path: '/demo-authority/authority4',
        name: 'Authority4',
        component: '/demo/index',
        meta: { title: '角色管理' }
      },
      {
        path: '/demo-authority/authority5',
        name: 'Authority5',
        component: '/demo/index',
        meta: { title: '菜单资源管理' }
      },
      {
        path: '/demo-authority/authority6',
        name: 'Authority6',
        component: '/demo/index',
        meta: { title: '资源权限管理' }
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
  // 任务调度
  {
    path: '/demo-task',
    name: 'DemoTask',
    component: 'Layout',
    redirect: '/demo-task/task1',
    meta: { title: '任务调度' },
    children: [
      {
        path: '/demo-task/task1',
        name: 'Task1',
        component: '/demo/index',
        meta: { title: '任务配置' }
      },
      {
        path: '/demo-task/task2',
        name: 'Task2',
        component: '/demo/index',
        meta: { title: '任务管理' }
      },
      {
        path: '/demo-task/task3',
        name: 'Task3',
        component: '/demo/index',
        meta: { title: '任务监控' }
      },
      {
        path: '/demo-task/task4',
        name: 'Task4',
        component: '/demo/index',
        meta: { title: '任务调度日志' }
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
  // 文档管理
  {
    path: '/demo-docs',
    name: 'DemoDocs',
    component: 'Layout',
    redirect: '/demo-docs/docs',
    meta: { title: '文档管理', hiddenChild: true },
    children: [
      {
        path: '/demo-docs/docs',
        name: 'Docs',
        component: '/demo/index',
        meta: { title: '文档' }
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
