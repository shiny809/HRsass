import request from '@/utils/request'
// 登录接口 封装
export function login(data) {
  return request({
    url: '/sys/login', // 因为所有接口都要跨域，表示所有接口都要带 /api
    method: 'POST',
    data
  })
}
/* 获取用户资料接口 */
export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'GET'
  })
}
/* 获取员工基本信息 */
export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}
export function logout() {

}
