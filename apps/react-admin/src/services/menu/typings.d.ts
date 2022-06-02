declare namespace MenuApi {
  type MenuCreateDto = {
    /**
     * 菜单名称
     */
    name: string;
    /**
     * 父菜单id
     */
    pid: number;
    /**
     * 图标
     */
    icon?: string;
    /**
     * 排序
     */
    sort?: number;
    /**
     * 路由地址
     */
    path: string;
    /**
     * 组件路径
     */
    component?: string;
    /**
     * 是否在菜单搜索中隐藏
     */
    hide_in_menu: boolean;
    /**
     */
    level: number;
    /**
     * 状态， 0删除 1正常
     */
    status: number;
    /**
     * 绑定的权限列表
     */
    permissions?: PermissionApi.Permission[];
  };

  type MenuEditDto = MenuCreateDto & {
    /**
     * 菜单id
     */
    id: number;
  };

  type Menu = MenuEditDto & {
    checked?: boolean;
    children?: Menu[];
    created_at: Date;
    updated_at: Date;
  };
}
