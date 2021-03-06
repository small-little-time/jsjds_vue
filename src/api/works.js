import request from '@/utils/request'

export function saveWorksAPI(params) {
  return request({
    url: '/user-service/competition/works',
    method: 'post',
    data: params
  })
}

export function getWorksInfo(params) {
  return request({
    url: '/user-service/competition/works',
    method: 'get',
    params: params
  })
}
