import request from '@/utils/request'

// 标签列表
export function fetchTags () {
  return request({
    url: '/tag',
    method: 'GET'
  })
}

// 新增标签
export function addTag (name) {
  return request({
    url: '/tag',
    method: 'POST',
    data: {
      name
    }
  })
}

// 更新标签
export function updateTag (data) {
  return request({
    url: '/tag',
    method: 'PUT',
    data
  })
}

// 删除标签
export function deleteTags (ids) {
  return request({
    url: '/tag',
    method: 'DELETE',
    data: {
      ids
    }
  })
}
