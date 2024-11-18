import request from '@/utils/request'
/* 获取员工相关信息 */
// 员工 -负责人-获取员工简单列表
export function getEmployeeSimple() {
  return request({
    url: '/sys/user/simple'
  })
}

// 获取员工综合列表
export function getEmployeeList(params) {
  return request({
    url: '/sys/user',
    params
  })
}

// 删除员工功能
export function delEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}

// 新增员工的接口
export function addEmployee(data) {
  return request({
    url: '/sys/user',
    method: 'post',
    data
  })
}

// 导出员工列表
export function exportEmployee() {
  return request({
    url: '/sys/user/export',
    // 改变接受的数据类型
    responseType: 'blob'// 使用blob接受二进制文件流
  })
}

// 下载员工 导入模板
export function getExportTemplate() {
  return request({
    url: '/sys/user/import/template',
    responseType: 'blob'// 接受 二进制文件流 格式
  })
}

// 导入员工数据 data --- formData
export function importExcel(data) {
  return request({
    url: '/sys/user/import',
    method: 'post',
    data
  })
}
