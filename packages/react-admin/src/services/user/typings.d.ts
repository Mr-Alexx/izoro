declare namespace UserApi {
  type LoginRes = {
    /**
     * token过期时间
     */
    accessExpire: string;
    /**
     * token刷新时间
     */
    refreshAfter: string;
    /**
     * token
     */
    accessToken: string;
  };

  type UserQueryParams = {
    /** 账号状态：0 作废，1 冻结，2 正常 */
    status: number;
    /** 用户名，模糊搜索 */
    account: string;
    limit: number;
    page: number;
  };

  type UserCreateDto = {
    /**
     * 账号
     */
    account: string;
    /**
     * 密码
     */
    password: string;
    /**
     * 角色id数组
     */
    roles: Array<number>;
    /**
     * 昵称
     */
    nickname?: string;
    /**
     * 头像
     */
    avatar?: string;
    /**
     * 邮箱
     */
    email: string;
    /**
     * 手机号码
     */
    phone_number?: string;
    /**
     * 账号状态：0 作废，1 冻结，2 正常
     */
    status: number;
  };

  type UserEditDto = UserCreateDto & {
    /**
     * 用户id
     */
    id: number;
  };

  type User = UserEditDto & {
    created_at: Date;
    updated_at: Date;
    /** 最后登录时间 */
    last_login_at: Date;
  };

  type LoginDto = {
    /**
     * 账号
     */
    account: string;
    /**
     * 密码
     */
    password: string;
  };
}
