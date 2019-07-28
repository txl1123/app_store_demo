import request from './apiConfig'

export function getAppList(params) {
  return request({
    url: 'appListData',
    params,
    method: 'get'
  })
}