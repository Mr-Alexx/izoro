import request from '@/utils/request'

// 分类列表
export function fetchCategories () {
  return request({
    url: '/category',
    method: 'GET'
  })
}
