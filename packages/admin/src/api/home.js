import request from '@/utils/request'

// sku分析列表
export function fetchSkuList () {
  return request({
    url: '/mock/home/skuList',
    method: 'GET'
  })
}

// 获取合计信息
export function fetchSummationsData (params) {
  return request({
    url: '/mock/dashboard/fetchSummationsData',
    method: 'GET',
    params
  })
}

export function fetchDynamicData (params) {
  return request({
    url: '/mock/dashboard/fetchDynamicData',
    method: 'GET',
    params
  })
}

