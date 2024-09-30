import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API // 环境变量 /dev-api, /prod-api
  // timeout: 5000 // 超时时间

})
// 请求拦截器
service.interceptors.request.use(config => {
  // config 请求配置信息
  if (store.getters.token) {
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  // 必须要返回
  return config
}, error => {
  return Promise.reject(error)
})
// 相应拦截器
service.interceptors.response.use(response => {
  // axios 默认加了一层data
  console.log(response)
  const { success, message, data } = response.data
  //   根据成功与否决定下面执行的操作
  if (success) {
    return data
  } else {
    // 业务错误，还能进行then ？ 不能 ！ 直接进入catch
    Message.error(message)
    return Promise.reject(new Error(message))
  }
}, error => {
  Message.error(error.message) // 提示错误信息
  return Promise.reject(error) // 返回错误，让当前执行链跳出成功 直接进入catch
})
export default service
