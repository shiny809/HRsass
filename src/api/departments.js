import request from '@/utils/request'

/* 获取组织架构的数据 */
export function getDepartments() {
  return request({
    url: '/company/department'
  })
}

// 删除组织架构的部门
export function delDepartment(id) {
  return request({
    // 接口 满足restful接口规范
    // 同样的地址,不同方法，执行不同业务
    method: 'DELETE',
    url: `/company/department/${id}`
  })
}

// 新增组织架构的部门
export function addDepartment(data) {
  return request({
    // 接口 满足restful接口规范
    // 同样的地址,不同方法，执行不同业务
    method: 'post',
    url: '/company/department',
    data
  })
}
// 修改组织架构的部门
export function editDepartment(data) {
  return request({
    // 接口 满足restful接口规范
    // 同样的地址,不同方法，执行不同业务
    method: 'put',
    url: `/company/department/${data.id}`,
    data
  })
}

// 获取部门详情
export function getDepartDetail(id) {
  return request({
    url: `/company/department/${id}`
  })
}
