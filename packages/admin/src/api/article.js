import request from '@/utils/request'

// 文章列表
export function fetchArticleList (params) {
  return request({
    url: 'http://localhost:3000/article',
    method: 'GET',
    params
  })
}
