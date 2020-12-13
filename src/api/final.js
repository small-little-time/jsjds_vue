import request from '@/utils/request'


export function initWorksInfo(params) {
    return request({
      url: '/review-service/final/works',
      method: 'get',
      params: params
    })
  }

export function rateWorks(params) {
  return request({
      url: '/review-service/final/rate',
      method: 'post',
      params: params
  })
}

export function getAllCompletedWorks() {
  return request({
    url: '/review-service/final/completed',
    method: 'get',
  })
}

export function updataScore(params) {
  return request({
    url: '/review-service/final/rate',
    method: 'put',
    params: params
  })
}


export function getSYSAllCompletedWorks(params) {
  return request({
    url: '/review-service/sysadmin/completed',
    method: 'get',
    params: params
  })
}
