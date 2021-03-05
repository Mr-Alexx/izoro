const getters = {
  symbol: () => '¥',
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  userInfo: state => state.user.info,
  avatar: state => state.user.info.avatar,
  username: state => state.user.info.nickname || state.user.info.realname,
  roles: state => state.user.roles,
  permissionRoutes: state => state.permission.routes,
  clientHeight: state => state.app.clientHeight,
  tableHeight: state => state.app.tableHeight
}

export default getters
