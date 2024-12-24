// 导航守卫 --- 权限拦截路由跳转
import router from '@/router'
import store from '@/store'// 引入store实例，和this.$stotr 一回事
import nprogress from 'nprogress'// 引入进度条
import 'nprogress/nprogress.css'

// 前置守卫
// next-必须执行的钩子，不执行页面会死
// next() - 放过   next(false) - 跳转终止   next(跳转路径) - 强制跳转到某个地址
const whiteList = ['/login', '/404']
router.beforeEach(async(to, from, next) => {
  nprogress.start()// 开启进度条
  if (store.getters.token) {
    // 如果有 token
    if (to.path === '/login') {
      // 跳转到主页
      next('/')
    } else {
      // 只有有token 才获取用户资料，每次都获取吗？
      // 获取过，就不用获取
      if (!store.getters.userId) {
        await store.dispatch('user/getUserInfo')
        // 如果后续需要根据用户资料渲染，需要改成同步

        // 筛选用户的可用动态路由，因为路由默认只有静态路由，没有动态路由
        const { roles } = await store.dispatch('user/getUserInfo')
        const newRoutes = await store.dispatch('permission/filterRoutes', roles.menus)
        // 动态路由 添加到路由表中
        router.addRoutes([...newRoutes, { path: '*', redirect: '/404', hidden: true }])

        // 多做一次跳转，不然路由加载出错
        // 用了addRoutes后请用 next(to.path),否则会导致刷新路由权限失效
        // 在添加路由之后应该使用 ** next(to.path) **， 否则会使刷新页面之后 权限消失，这属于一个vue - router的 ** 已知缺陷 **
        next(to.path)
      }
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
