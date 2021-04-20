import request from '@/utils/request'

const PREFIX = 'http://localhost:3000'
/* ============== role ============= */
// 列表
export const FETCH_ROLE_LIST = () => request({
  url: PREFIX + '/role',
  method: 'GET'
})

// 新增
export const ADD_ROLE = (data) => request({
  url: PREFIX + '/role',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  data
})

// 编辑
export const EDIT_ROLE = (id, data) => request({
  url: PREFIX + '/role/' + id,
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json'
  },
  data
})

// 删除
export const DELETE_ROLE = (id) => request({
  url: PREFIX + '/role/' + id,
  method: 'DELETE'
})

/* ============== menu ============= */
export const FETCH_MENU_LIST = () => request({
  url: PREFIX + '/menu',
  method: 'GET'
})

// 新增
export const ADD_MENU = (data) => request({
  url: PREFIX + '/menu',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  data
})

// 编辑
export const EDIT_MENU = (id, data) => request({
  url: PREFIX + '/menu/' + id,
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json'
  },
  data
})

// 删除
export const DELETE_MENU = (id) => request({
  url: PREFIX + '/menu/' + id,
  method: 'DELETE'
})

/* ============== user ============= */
export const FETCH_USER_LIST = () => request({
  url: PREFIX + '/user',
  method: 'GET'
})

// 新增
export const ADD_USER = (data) => request({
  url: PREFIX + '/user',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  data
})

// 编辑
export const EDIT_USER = (id, data) => request({
  url: PREFIX + '/user/' + id,
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json'
  },
  data
})

// 删除
export const DELETE_USER = (id) => request({
  url: PREFIX + '/user/' + id,
  method: 'DELETE'
})
