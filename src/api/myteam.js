import request from '@/utils/request'

export function initCategoryInfo() {
  return request({
    url: '/user-service/competition/category',
    method: 'get'
  })
}

export function createTeam(params) {
  return request({
    url: '/user-service/competition/team',
    method: 'post',
    params: params
  })
}

export function getOwnTeam() {
  return request({
    url: '/user-service/competition/ownteam',
    method: 'get'
  })
}
export function getOtherTeam() {
  return request({
    url: '/user-service/competition/otherteam',
    method: 'get'
  })
}

export function addTeam(params) {
  return request({
    url: '/user-service/competition/addteam',
    method: 'post',
    params: params
  })
}

export function deleteTeam(params) {
  return request({
    url: '/user-service/competition/team',
    method: 'delete',
    params: params
  })
}

export function teamMate(params) {
  return request({
    url: '/user-service/competition/teammate',
    method: 'get',
    params: params
  })
}

export function userExitTeam(params) {
  return request({
    url: '/user-service/competition/exitteam',
    method: 'delete',
    params: params
  })
}

export function changeTeamMateIndex(params) {
  return request({
    url: '/user-service/competition/teammate',
    method: 'put',
    params: params
  })
}

