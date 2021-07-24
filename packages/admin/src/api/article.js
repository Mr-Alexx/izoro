import request from '@/utils/request'

// 文章列表
export function fetchArticleList (params) {
  return request({
    url: '/article',
    method: 'GET',
    params
  })
}
