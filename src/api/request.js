// 对 axios 进行二次封装
import axios from 'axios'
// 导入 nprogress 进度条
import nprogress from 'nprogress'
// 导入进度条样式
import 'nprogress/nprogress.css'

import store from '@/store'

// 创建 axios 实列
const request = axios.create({
  // 配置对象
  baseURL: '/api',
  timeout: 5000
})

// 请求拦截器
request.interceptors.request.use((config) => {
  // 进度条开始
  nprogress.start()
  // config 配置对象，里面有 headers 请求头
  if (store.state.cartList.UUid) {
    config.headers.userTempId = store.state.cartList.UUid
  }
  if (store.state.user.token) {
    config.headers.token = store.state.user.token
  }

  return config
})
// 响应拦截器
request.interceptors.response.use(
  // 成功回调
  (res) => {
    // 进度条结束
    nprogress.done()
    return res.data
  },
  // 失败回调
  (error) => {
    // 进度条结束
    nprogress.done()
    return error.message
  }
)

// 对外暴露
export default request
