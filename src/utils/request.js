import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
import { getTimeStamp } from './auth'
const TimeOut = 3600 // 定义超时时间
// 是否超时
// 超时逻辑 (当前时间-缓存中的时间)是否大于 时间差
function isCheckTimeOut() {
  const currentTime = Date.now()
  const timeStamp = getTimeStamp()
  return (currentTime - timeStamp) / 1000 > TimeOut
}
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API // 环境变量 /dev-api, /prod-api
  // timeout: 50000 // 超时时间

})
// 请求拦截器
service.interceptors.request.use(config => {
  // config 请求配置信息
  if (store.getters.token) {
    // 注入token，有token的情况下，才有必要检查 时间戳 是否超时
    if (isCheckTimeOut()) {
      // true 过期了，跳转登录页，相当于退出登录
      store.dispatch('user/logout')
      router.push('./login')
      return Promise.reject(new Error('登录过期，请重新登录！'))
    }
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  // 必须要返回
  return config
}, error => {
  console.log(error)

  return Promise.reject(error)
})
// 响应拦截器
service.interceptors.response.use(response => {
  // axios 默认加了一层data
  console.log(response)
  // 判断是不是 Blob格式
  if (response.data instanceof Blob) return response.data // 返回Blob对象
  const { success, message, data } = response.data// 默认json格式
  //   根据成功与否决定下面执行的操作
  if (success) {
    return data
  } else {
    // 业务错误，还能进行then ？ 不能 ！ 直接进入catch
    Message.error(message)
    return Promise.reject(new Error(message))
  }
}, error => {
  // token 的被动处理
  if (error.response && error.response.data && error.response.data.code === 10002) {
    // 当code是10002时，后端告诉我们 token 超时了
    store.dispatch('user/logout')
    router.push('/login')
  }
  Message.error(error.message) // 提示错误信息
  return Promise.reject(error) // 返回错误，让当前执行链跳出成功 直接进入catch
})
export default service
