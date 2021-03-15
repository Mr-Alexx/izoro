import request from '@/utils/request'

// 分类列表
export function fetchCategories () {
  return request({
    url: '/category',
    method: 'GET'
  })
}

// 更新分类
export function updateCategory (data) {
  return request({
    url: '/category',
    method: 'PUT',
    data
  })
}

// 删除分类
export function deleteCategories (ids) {
  return request({
    url: '/category',
    method: 'DELETE',
    data: {
      ids
    }
  })
}
