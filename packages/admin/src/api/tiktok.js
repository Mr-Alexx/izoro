import request from '@/utils/request'

// 达人库列表
export function fetchTalentList (params) {
  return request({
    url: '/tiktok/bi-tiktok-user/list',
    method: 'GET',
    params
  })
}

// 达人库删除数据
export function fetchTalenUpdate (params) {
  return request({
    url: '/tiktok/bi-tiktok-user/update-status',
    method: 'GET',
    params
  })
}

// 达人数据
export function fetchTalentData (params) {
  return request({
    url: '/tiktok/bi-tiktok-user/info',
    method: 'GET',
    params
  })
}

// 达人-视频分析
export function fetchVideoList (params) {
  return request({
    url: '/tiktok/bi-tiktok-video/list',
    method: 'GET',
    params
  })
}

// 达人-基础分析-数据概览
export function fetchRenewUser (params) {
  return request({
    url: '/tiktok/bi-tiktok-user/renew-user',
    method: 'GET',
    params
  })
}

// 达人-基础分析-数据概览
export function fetchVideoInfo (params) {
  return request({
    url: '/tiktok/bi-tiktok-video/info',
    method: 'GET',
    params
  })
}

// 达人-获取查询条件
export function fetchTalentConditions () {
  return request({
    url: '/tiktok/bi-tiktok-user/get-conditions',
    method: 'GET'
  })
}

// 基础分析数据
export function fetchTalentBasicAnalysisData (params) {
  return request({
    url: '/tiktok/bi-tiktok-user/user-trend',
    method: 'GET',
    params
  })
}

// 直播视频数据-数据概览
export function fetchTalentLiveVideoInfo (params) {
  return request({
    url: '/tiktok/bi-tiktok-video/user-video-info',
    method: 'GET',
    params
  })
}

// 直播分析数据
export function fetchTalentLiveAnalysisData (id) {
  return request({
    url: 'http://rap2api.taobao.org/app/mock/data/1851065',
    method: 'GET',
    params: { id }
  })
}

// 爬虫列表
export function fetchCrawlerList (params) {
  return request({
    url: '/tiktok/yuque-crontab/list',
    method: 'GET',
    params
  })
}

// 爬虫条件
export function fetchCrawlerConditions (params) {
  return request({
    url: '/tiktok/yuque-crontab/get-conditions',
    method: 'GET'
  })
}

// 新增/编辑爬虫
export function fetchUpdateCrawler (data) {
  return request({
    url: '/tiktok/yuque-crontab/update',
    method: 'POST',
    data
  })
}

// 修改爬虫状态
export function fetchCrawlerUpdateStatus (params) {
  return request({
    url: '/tiktok/yuque-crontab/update-status',
    method: 'GET',
    params
  })
}

// 分类列表
export function functionCategoryList (params) {
  return request({
    url: '/tiktok/category/list',
    method: 'GET',
    params
  })
}

// 添加/修改分类
export function updateCategory (data) {
  return request({
    url: '/tiktok/category/update',
    method: 'POST',
    data
  })
}

