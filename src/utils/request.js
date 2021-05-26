import axios from 'axios'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { Message } from 'element-ui'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // 当前请求为跨域类型时是否在请求中协带cookie
  timeout: 5000
})

// 拦截器
service.interceptors.request.use(
  config => {
    // config.headers['Content-Type'] = 'multipart/form-data'
    if (store.getters.token) {
      // config.headers['Authorization'] = 'admin'
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(

  response => {
    const res = response.data
    const cfg = response.config
    // 流下载
    if (response.status === 200 && cfg && cfg.responseType === 'blob') {
      // new Blob([data])用来创建URL的file对象或者blob对象
      const url = window.URL.createObjectURL(new Blob([res]))
      // 生成一个a标签
      const link = document.createElement('a')
      const data = JSON.parse(cfg.data)
      link.style.display = 'none'
      link.href = url
      console.log(response)

      const cd = response.headers['content-disposition']
      if (cd && cd.indexOf('filename') > 0) {
        const fileName = decodeURI(response.headers['content-disposition'].split('filename=')[1])
        link.download = fileName
      } else {
        link.download = data.fileName
      }

      document.body.appendChild(link)
      link.click()
      return res
    }

    if (res.code === 200) {
      return res
    }
    Message({
      message: res.msg || 'Error',
      type: 'error',
      duration: 5 * 1000
    })

    return Promise.reject(new Error(res.msg || 'Error'))
  },
  error => {
    console.log('err' + error)
    console.log(error.response)
    Message({
      message: error.response ? error.response.data.msg : 'Error',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
