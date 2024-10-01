import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'
// 状态
const state = {
  token: getToken(), // 设置token 共享状态, 初始化 vuex 从缓存中读取(vuex 持久化)
  userInfo: {}// 定义空对象，防止后面获取值，null.值报错
}
// 修改状态
const mutations = {
  // 设置token
  setToken(state, token) {
    state.token = token // 将数据设置给vuex
    // 同步给缓存
    setToken(token)
  },
  //  删除缓存
  removeToken(state) {
    state.token = null // 清除vuex token
    removeToken() // 再清除缓存，vuex 和 缓存数据同步
  },
  // 设置用户信息
  setUserInfo(state, data) {
    state.userInfo = data // 响应式
  },
  // 删除用户信息
  removeUserInfo(state) {
    state.userInfo = {}
  }
}
// 执行异步
const actions = {
  // 异步请求 获取 token
  async login(content, data) {
    const result = await login(data)
    console.log(result)// token值
    // 表示登录接口调用成功 也就是意味着你的用户名和密码是正确的
    content.commit('setToken', result)
  },
  async getUserInfo(content) {
    const result = await getUserInfo()
    const baseInfo = await getUserDetailById(result.userId)
    const userInfo = { ...result, ...baseInfo }
    content.commit('setUserInfo', userInfo)
    console.log(result)
    console.log(baseInfo)
    return result// 后续权限会用到,留下伏笔,只返回result 就行
  },
  // 登出操作
  logout(content) {
    // 删除token 及用户资料
    content.commit('removeToken')
    content.commit('removeUserInfo')
  }

}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
