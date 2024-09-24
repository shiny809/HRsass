import axios from 'axios'
import { Message } from 'element-ui'
const service = axios.create({
  baseURL: 'VUE_APP_BASE_API'

})
// 请求拦截器
service.interceptors.request.use()
// 相应拦截器
service.interceptors.response.use(response => {
  // axios 默认加了一层data
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
