import request from '@/utils/request'

/* ============== role ============= */
// 列表
export const FETCH_ROLE_LIST = (params) => request({
  url: '/role',
  method: 'GET',
  params
})

// 新增
export const ADD_ROLE = (data) => request({
  url: '/role',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  data
})

// 编辑
export const EDIT_ROLE = (id, data) => request({
  url: '/role/' + id,
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json'
  },
  data
})

// 删除
export const DELETE_ROLE = (id) => request({
  url: '/role/' + id,
  method: 'DELETE'
})

/* ============== menu ============= */
// 菜单列表
export const FETCH_MENU_LIST = (params) => request({
  url: '/menu',
  method: 'GET',
  params
})

// 菜单下的权限列表
export const FETCH_PERMISSION_LIST_BY_MENU_ID = (id) => request({
  url: '/menu/' + id,
  method: 'GET'
})

// 新增
export const ADD_MENU = (data) => request({
  url: '/menu',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  data
})

// 编辑
export const EDIT_MENU = (id, data) => request({
  url: '/menu/' + id,
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json'
  },
  data
})

// 菜单-授权
export const AUTHORIZE_MENU_TO_ROLE = (data) => request({
  url: '/role/authorize',
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json'
  },
  data
})

// 删除
export const DELETE_MENU = (id) => request({
  url: '/menu/' + id,
  method: 'DELETE'
})

/* ============== user ============= */
export const FETCH_USER_LIST = (params) => request({
  url: '/user',
  method: 'GET',
  params
})

// 新增
export const ADD_USER = (data) => request({
  url: '/user',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  data
})

// 编辑
export const EDIT_USER = (id, data) => request({
  url: '/user/' + id,
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json'
  },
  data
})

// 删除
export const DELETE_USER = (id) => request({
  url: '/user/' + id,
  method: 'DELETE'
})
