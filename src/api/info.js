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

export function getAllArea(params) {
  return request({
    url: '/info-service/area',
    method: 'get',
    params: params
  })
}

export function getAlreadySetCategory() {
  return request({
    url: '/info-service/area/existCategory',
    method: 'get'
  })
}

export function areaInsertBatch(params) {
  return request({
    url: '/info-service/area/batch',
    method: 'post',
    data: params
  })
}

export function getAreaById(id) {
  return request({
    url: '/info-service/area/' + id,
    method: 'get'
  })
}

export function deleteArea(params) {
  return request({
    url: '/info-service/area',
    method: 'delete',
    data: params
  })
}

export function uploadFile(params) {
  return request({
    url: '/info-service/finalTeam/upload',
    method: 'post',
    headers: {
      'Content-type': 'multipart/form-data'
    },
    data: params
  })
}

export function downloadTemplate() {
  return request({
    url: '/info-service/finalTeam/download',
    method: 'get',
    responseType: 'blob'// 二进制流
  })
}

export function getAllFinalTeam(params) {
  return request({
    url: '/info-service/finalTeam',
    method: 'get',
    params: params
  })
}

export function deleteFinalTeam(params) {
  return request({
    url: '/info-service/finalTeam',
    method: 'delete',
    data: params
  })
}

export function getAllFinalTeamSeq(params) {
  return request({
    url: '/info-service/finalSeq',
    method: 'get',
    params: params
  })
}

export function updateArea(params) {
  return request({
    url: '/info-service/area',
    method: 'put',
    data: params
  })
}

export function finalTeamGroup() {
  return request({
    url: '/info-service/finalSeq/group',
    method: 'get'
  })
}

export function truncateTeamSeq() {
  return request({
    url: '/info-service/finalSeq',
    method: 'delete'
  })
}

export function sendNotifySms() {
  return request({
    url: '/info-service/notify/sendSms',
    method: 'get'
  })
}

export function exportFinalSeqExcel() {
  return request({
    url: '/info-service/finalSeq/exportExcel',
    method: 'get',
    responseType: 'blob'// 二进制流
  })
}
