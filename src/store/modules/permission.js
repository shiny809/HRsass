// 专门处理权限路由的模块
import { constantRoutes, asyncRoutes } from '@/router'
const state = {
  routes: constantRoutes// 路由表 表示当前用户所拥有的所有路由的数组
}
const mutations = {
  // 定义修改routes的mutations
//   payload 登录成功需要添加的新路由
  setRoutes(state, newRoutes) {
    state.routes = [...constantRoutes, ...newRoutes]
  }
}
const actions = {
  // 筛选权限路由
  // 第二个参数 为当前用户所拥有的菜单权限
  // menus:['settint','permission']
  filterRoutes(context, menus) {
    const newRoutes = []
    // 两层循环，外层forEach没有返回值
    menus.forEach(key => {
      // 筛选动态路由中和menus能够对上的路由
      const routes = asyncRoutes.filter(item => item.name === key)
      newRoutes.push(...routes)
    })
    context.commit('setRoutes', newRoutes)
    return newRoutes// 为什么返回？上面是将数据写入vuex,返回是将数据 供 addRoutes使用
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
