const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  nickName: state => state.user.nickName,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  permissions: state => state.user.permissions,
  parentPath: state => state.permission.parentPath,
  permission_routes: state => state.permission.routes,
  permission_sysMenu: state => state.permission.sysMenu,
  permission_ssoMenu: state => state.permission.ssoMenu,
  menuId: state => state.permission.menuId,
  user_ssoControl: state => state.user.ssoControl,
  userId: state => state.userId,
  activeMenus: state => state.permission.activeMenus
}
export default getters
