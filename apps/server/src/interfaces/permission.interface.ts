// 权限注解枚举，统一权限配置用，前端返回的选择列表基于此
export enum PermissionsType {
  /*============= 菜单 =============*/
  创建菜单 = 'menu:add',
  删除菜单 = 'menu:del',
  编辑菜单 = 'menu:edit',
  菜单列表 = 'menu:list',
  菜单详情 = 'menu:detail',

  /*============= 用户 =============*/
  创建用户 = 'user:add',
  删除用户 = 'user:del',
  编辑用户 = 'user:edit',
  用户列表 = 'user:list',
  用户详情 = 'user:detail',

  /*============= 角色 =============*/
  创建角色 = 'role:add',
  删除角色 = 'role:del',
  编辑角色 = 'role:edit',
  角色列表 = 'role:list',
  角色详情 = 'role:detail',

  /*============= 分类 =============*/
  创建分类 = 'category:add',
  删除分类 = 'category:del',
  编辑分类 = 'category:edit',
  分类列表 = 'category:list',
  分类详情 = 'category:detail',

  /*============= 标签 =============*/
  创建标签 = 'tag:add',
  删除标签 = 'tag:del',
  编辑标签 = 'tag:edit',
  标签列表 = 'tag:list',
  标签详情 = 'tag:detail',

  /*============= 文章 =============*/
  创建文章 = 'article:add',
  删除文章 = 'article:del',
  编辑文章 = 'article:edit',
  文章列表 = 'article:list',
  文章详情 = 'article:detail',

  /*============= 定时任务 =============*/
  创建定时任务 = 'schedule:add',
  删除定时任务 = 'schedule:del',
  编辑定时任务 = 'schedule:edit',
  定时任务列表 = 'schedule:list',
  定时任务详情 = 'schedule:detail',
}
