import request from './apiConfig'

export function getAppList(params) {
  return request({
    url: 'appListData',
    params,
    method: 'get'
  })
}
export function getRecomendList(params) {
  return request({
    url: 'recomendData',
    params,
    method: 'get'
  })
}
