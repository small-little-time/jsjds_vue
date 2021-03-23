import request from '@/utils/request'

export function getAllAllowFilter(params) {
  return request({
    url: '/info-service/allowfillter',
    method: 'get',
    params: params
  })
}

export function getAllProfession(params) {
  return request({
    url: '/info-service/academy/all',
    method: 'get',
    params: params
  })
}

export function getAllCategory(params) {
  return request({
    url: '/info-service/category/all',
    method: 'get',
    params: params
  })
}

export function getAllowFilterById(id) {
  return request({
    url: '/info-service/allowfillter/' + id,
    method: 'get'
  })
}
