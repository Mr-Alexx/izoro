const state = {
  salesDataList: {} // 工作台销售数据展示列表
}

const mutations = {
  SET_SALES_DATA_LIST (state, data) {
    state.salesDataList = data
  }
}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
