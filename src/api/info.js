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

export function insertAllowFilter(params) {
  return request({
    url: '/info-service/allowfillter',
    method: 'post',
    data: params
  })
}

export function updateAllowFilter(params) {
  return request({
    url: '/info-service/allowfillter',
    method: 'put',
    data: params
  })
}

export function deleteAllAllowFilter(params) {
  return request({
    url: '/info-service/allowfillter',
    method: 'delete',
    data: params
  })
}

export function exportExcel() {
  return request({
    url: '/info-service/reviewscore/export',
    method: 'get',
    responseType: 'blob'// 二进制流
  })
}
