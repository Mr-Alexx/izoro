declare namespace RoleApi {
  type RoleQueryParams = Api.ListQueryParams & {
    /** 角色名称，模糊查询 */
    name?: string;
    /** 角色状态状态，0禁用 1启用 */
    status?: number;
  };

  type RoleCreateDto = {
    /**
     * 角色名称
     */
    name: string;
    /**
     * 描述
     */
    description?: string;
    /**
     * 状态，0 禁用，1 启用
     */
    status: number;
  };

  type RoleEditDto = RoleCreateDto & {
    /**
     * 角色id
     */
    id: number;
  };

  type Role = RoleEditDto & {
    created_at: Date;
    updated_at: Date;
  };
}
