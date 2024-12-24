import store from '@/store'
// 做一个混入对象
export default {
  // 混入对象是组件的选项
  methods: {
    // 检查，要检查的点 key
    checkPermission(key) {
      const { userInfo } = store.state.user
      if (userInfo.roles && userInfo.roles.points) {
        return userInfo.roles.points.some(item => item === key)
      }
      return false
    }
  }
}
