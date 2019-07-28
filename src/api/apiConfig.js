import axios from 'axios'
import qs from 'qs'

// 配置请求基地址
const service = axios.create({
  baseURL: '/api/'
})

// 添加请求拦截器
service.interceptors.request.use(config => {
  config.data = qs.stringify(config.data)

  // 可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
  return config
}, error => {
  Promise.reject(error)
})

// 添加响应拦截器，响应拦截器会在then/catch处理之前执行
service.interceptors.response.use(
  (response) => {
    // 只将请求结果的data字段返回
    return response.data
  },
  (err) => {
    // 发生网络错误后会走到这里
    console.log(err)
    // return Promise.resolve('ssss')
  }
)

export default service
