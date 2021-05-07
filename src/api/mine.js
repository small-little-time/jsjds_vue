import request from '@/utils/request'

export function queryAcademyByName(params) {
  return request({
    url: '/user-service/student/academylike',
    method: 'get',
    params: params
  })
}

export function initStudentInfo() {
  return request({
    url: '/user-service/student/student',
    method: 'get'
  })
}

export function saveStudentInfo(params) {
  return request({
    url: '/user-service/student/student',
    method: 'put',
    params: params
  })
}
