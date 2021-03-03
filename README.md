# 合肥煤科院项目

## 简介
矿井综合信息平台，为矿井安全管理、生产调度、一通三防、地测防治水、机电运输、采掘管理、监测监控等业务提供全面的信息化支撑

## 技术栈
- 前端技术栈： Vue2 + Vuex + Vue-router + Webpack + ES6/7 + Scss + Echarts 5 + Element-ui
- 服务端技术栈： Mockjs

## 安装依赖
- 安装 Node.js：前往 [官方网站](https://nodejs.org/zh-cn/) 下载最新稳定版本并安装。
- 运行 `npm install` 命令，安装 package.json 里指定的依赖项。

## 本地开发
运行 `npm run dev` 启动本地服务器，浏览器自动访问 http://localhost:8000

## 构建生产
运行 `npm run build` 构建命令会生成或更新 dist 文件夹，运行 index.html 文件即可访问项目。

## 目录结构 ##
    |---build                                // webpack配置文件
    |---dist                                 // 打包文件
    |---docs                                 // 文档(代码规范、git提交规范...)
    |---mock                                 // mock动态模拟数据
    |---public                               // 静态资源
    |---src 
    |   |---api                              // 后台接口 
    |   |---assets                           // 模块资源文件(会经过 webpack 处理)
    |   |   |---images                       // 图片
    |   |   |---styles                       // 样式
    |   |---components                       // 通用组件
    |   |---data                             // 配置数据
    |   |---layout                           // 整体布局
    |   |---router                           // 路由
    |   |---store                            // vuex 状态管理
    |   |---utils                            // 公共方法
    |   |---views                            // 页面
    |   |---App.vue                          // 页面入口文件
    |   |---main.js                          // 应用入口文件
    |   |---permission.js                    // 路由守卫
    |---.editorconfig                        // 编辑器配置文件
    |---.gitignore                           // git 忽略的文件
    |---babe.config.js                       // bable 转译配置文件
    |---package.json                         // 依赖配置文件
    |---postcssrc.config.js                  // postcss 配置文件
    |---README.md                            // 说明文件  
    |---vue.config.js                        // vue-cli 配置文件

## Element UI库
Element-ui@2.14.1 是一套基于 Vue2.0 的 PC 端组件库，有助于方便快捷的实现页面结构与交互。使用方法请查阅[官方文档](http://element.eleme.io/#/zh-CN)。

## 项目组件库
docs 文件内包含此项目所用到的组件，详情查看[组件库](/docs/common.html)。