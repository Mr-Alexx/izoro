declare namespace PermissionApi {
  type PermissionQueryParams = Api.ListQueryParams & {
    roleIds?: number[];
  };

  type PermissionCreateDto = {
    /**
     * 权限名称
     */
    name: string;
    /**
     * 权限标识
     */
    code;
    /**
     * 排序
     */
    sort?: number;
    /**
     * 状态， 0废弃 1正常
     */
    status: number;
  };

  type PermissionEditDto = PermissionCreateDto & {
    /**
     * 权限id
     */
    id: number;
  };

  type Permission = PermissionEditDto & {
    checked?: number;
    children?: Permission;
    created_at: Date;
    updated_at: Date;
  };
}
