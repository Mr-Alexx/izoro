import { getInfo } from '@/api/user'
import { login } from '@/api/auth'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  info: {},
  roles: ''
}

const mutations = {
  SET_TOKEN (state, token) {
    state.token = token
  },
  SET_INFO: (state, info) => {
    state.info = info
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login ({ commit }, userInfo) {
    return login(userInfo)
      .then(data => {
        const token = 'Bearer ' + data.accessToken
        commit('SET_TOKEN', token)
        // 如果选择了当天内免登录，则cookie设置当天23:59:59为过期时间
        // 否则，设置过期时间为1个小时
        setToken(token)
        return Promise.resolve()
      })
      .catch(err => Promise.reject(err))
  },
  getInfo ({ commit, state }) {
    return getInfo(state.token)
      .then(data => {
        // console.log('这是store')
        // console.log(data)
        commit('SET_ROLES', [data.role])
        return Promise.resolve(data)
      })
      .catch(err => Promise.reject(err))
    // return new Promise((resolve, reject) => {
      // const data = {
      //   roles: ['admin'],
      //   introduction: 'I am a super administrator',
      //   avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      //   name: 'Super Admin'
      // }
      // console.log(data)
      // const { roles, name, avatar, introduction } = data
      // commit('SET_ROLES', roles)
      // commit('SET_NAME', name)
      // commit('SET_AVATAR', avatar)
      // commit('SET_INTRODUCTION', introduction)
      // resolve(data)

    //   commit('SET_ROLES', ['admin'])
    //   resolve({ roles: ['admin'] })
    // })
  },
  logout ({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resetRouter()

      // reset visited views and cached views
      // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
      // dispatch('tagsView/delAllViews', null, { root: true })
      resolve()
    })
  },
  resetToken ({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
