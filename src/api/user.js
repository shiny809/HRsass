import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sys/login', // 因为所以接口都要跨域，表示所有接口都要带 /api
    method: 'POST',
    data
  })
}
export function getInfo() {

}

export function logout() {

}
