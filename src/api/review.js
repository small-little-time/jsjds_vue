import request from '@/utils/request'


export function getAllcategories() {
    return request({
      url: '/review-service/sysadmin/category',
      method: 'get'
    })
}

export function addNewRater(params) {
    return request({
      url: '/review-service/sysadmin/rater',
      method: 'post',
      params: params
    })
}


export function getTasks10() {
  return request({
    url: '/review-service/review/tasks10',
    method: 'get',
  })
}

export function rateWorks(params) {
  return request({
    url: '/review-service/review/rate',
    method: 'post',
    params: params
  })
}
export function getAllCompletedWorks() {
  return request({
    url: '/review-service/review/completed',
    method: 'get',
  })
}

export function oldScore(params) {
  return request({
    url: '/review-service/review/oldscore',
    method: 'get',
    params: params
  })
}

export function updataScore(params) {
  return request({
    url: '/review-service/review/rate',
    method: 'put',
    params: params
  })
}

export function getTaskDetail() {
  return request({
    url: '/review-service/review/taskdetail',
    method: 'get',
  })
}

export function sysAdminGetAllWorks(params) {
  return request({
    url: '/review-service/sysadmin/works',
    method: 'get',
    params: params
  })
}

export function setWorksPassed(params) {
  return request({
    url: '/review-service/sysadmin/workspassed',
    method: 'post',
    params: params
  })
}











  