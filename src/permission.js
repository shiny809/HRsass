// 导航守卫 --- 权限拦截路由跳转
import router from '@/router'
import store from '@/store'// 引入store实例，和this.$stotr 一回事
import nprogress from 'nprogress'// 引入进度条
import 'nprogress/nprogress.css'

// 前置守卫
// next-必须执行的钩子，不执行页面会死
// next() - 放过   next(false) - 跳转终止   next(跳转路径) - 强制跳转到某个地址
const whiteList = ['/login', '/404']
router.beforeEach((to, from, next) => {
  nprogress.start()// 开启进度条
  if (store.getters.token) {
    // 如果有 token
    if (to.path === '/login') {
      // 跳转到主页
      next('/')
    } else {
      store.dispatch('user/getUserInfo')
      next()
    }
  } else {
    // 没有token
    if (whiteList.indexOf(to.path) > -1) {
      next()// 白名单直接放行
    } else {
      next('/login')
    }
  }
  // 进度条没有关闭，没有执行后置守卫
  // 解决手动切换地址，进度条不关闭
  nprogress.done()
})

// 后置守卫
router.afterEach(() => {
  nprogress.done()
})
