import { GisLocalAddress, GisServerUrl } from '@/api/url'

const BimConfig = {
  // localAddress: "http://www.probim.cn:8088/",
  // server: "https://bimcomposer.probim.cn/api",
  // accessToken:
  //   "pk.eyJ1IjoiZ2Fvc2wiLCJhIjoiY2p6dDdnbXBkMDJmajNubnljbW9zd2lmNiJ9.b7tzshnJRK4ziIItMRdUHw"
  localAddress: GisLocalAddress, // 模型public => hdr 文件地址 如果私有云请改成部署站点public根目录路径
  server: GisServerUrl, // 模型api地址 如私有云请改成私有云相关模型api地址
  model: {
    modelID: ['77b4621d-d89d-45d4-a66d-7b5be1c938f8'],
    projectID: '9759d32b-8245-4567-875b-908be0f612ce',
    // modelID: '645396a5-2cf8-496d-b328-f1bcf2c4b3c9',
    // projectID: '9759d32b-8245-4567-875b-908be0f612ce',
    versionNO: '',
    viewID: ''
  }
}

const PointIcon = 'http://www.probim.cn:8088/bimexample/img/point.png'

export {
  BimConfig,
  PointIcon
}
