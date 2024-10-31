import request from '@/utils/request'
/* 获取员工相关信息 */
// 员工 -负责人-获取员工简单列表
export function getEmployeeSimple() {
  return request({
    url: '/sys/user/simple'
  })
}
