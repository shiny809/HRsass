import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'
import { resetRouter } from '@/router'
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
    // 拿到token， 设置当前时间戳
    setTimeStamp()
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
  logout(context) {
    // 删除token 及用户资料
    context.commit('removeToken')
    context.commit('removeUserInfo')
    // ！！！重置路由---防止叠加，用户权限混乱
    resetRouter()
    // Vuex子模块怎么调用子模块的action 都没加锁 可以随意调用
    // 不加命名空间的情况下 mutation和action是挂在全局的 可以直接调用
    // ？加了命名空间的子模块 如何调用另一个加了命名空间的子模块的mutation
    // 加了命名空间的context 指的不是全局的 context
    context.commit('permission/setRoutes', [], { root: true })
    // 加入 第三个参数{root:true}  context就是全局的context
  }

}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
