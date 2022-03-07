/**
 * @description  商品模块接口 参数/结果 类型
 */
declare namespace OPERATION_API {
  type MobileListReq = API.ListQueryParams & {
    mobile?: string;
    amount?: number;
    operator?: string;
    department_id?: number;
    user_id?: number;
    rechargeTime?: {
      begin: string;
      end: string;
    }[];
    status?: string;
  };

  type MapTemp = {
    value: number;
    label: string;
  };

  type MobileListMapData = {
    operator: MapTemp[];
    status: MapTemp[];
    card_type: MapTemp[];
    use_type: MapTemp[];
  };

  type MobileBind = {
    bind_name: string; // 绑定名称
    bind_value: string; // 绑定值
    remark?: string; // 备注
  };
  // 新增、编辑手机号
  type MobileInfoReq = {
    id?: number; // ID
    mobile: string; // 手机号
    status: number; // 状态:1-正常,2-停用,10-删除
    department_id: number; // 部门
    username: string; // 持卡人
    user_id: number; // 保管人
    card_type: number; // 卡类型 1公司,2个人
    open_time?: string; // 开卡时间
    monthly_rent_time?: string; // 交租日期
    monthly_rent: number; // 月租
    operator: string; // 运营商10086，10000，10010
    set_meal?: string; // 套餐
    use_type_arr?: string[]; // 使用类型,1客服,2店铺,3水军,4直播账号,5闲置
    remark?: string; // 备注
    bind_info: MobileBind[]; // 绑定信息
  };

  type CUResponse = {
    code: number; // 状态码：0 正常，1 异常
    msg: string; // 信息
    response: string; // 响应主体
  };

  type MobileBatchUpdateStatusReq = {
    ids: string; // 手机号ID，多个逗号隔开
    status: number; // 状态，1正常2停用
  };

  // 查看手机号
  type LiveUserManageData = {
    id: number; // ID
    main?: string; // 主体
    authentication: string; // 实名认证
    blue_v: number; // 蓝V,1是2否
    platform: number; // 平台,1微信2微信支付3淘宝4快手5抖音
    user_name: string; // 账号名
    user_id: string; // 账号ID
    bind_bank_cark?: string; // 绑定银行卡
    bind_phone: string; // 绑定手机
    bind_email?: string; // 绑定Email
    deposit_cash?: number; // 保证金
    user_balance?: number; // 账号余额
    tiktok_coin?: number; // 抖币
    user_keeper_by?: number; // 账号管理人
    use_function?: string; // 使用功能
    status?: number; // 状态1正常2注销
    remark?: string; // 备注
    creator_name?: string; // 创建人
    user_keeper_name?: string; // 账号管理人名
  };
  // 查看手机号-响应参数
  type LiveUserManageViewResp = {
    code: number; // 状态码：0 正常，1 异常
    msg: string; // 信息
    response: LiveUserManageData; // 响应主体
  };
  type MobileRechargeReq = {
    ids: string; // 手机号ID,多个逗号隔开
    amount: number; // 金额
  };

  type MobileBatchUpdateUserReq = {
    ids: string; // 手机号ID,多个逗号隔开
    user_id: number; // 用户ID
  };

  type LiveAndShopUserManageMapData = {
    platform: MapTemp[]; // 平台,1微信2微信支付3淘宝4快手5抖音
    status: MapTemp[]; // 状态,1正常2注销
    blue_v: MapTemp[]; // 蓝V,1是2否
    account_type: MapTemp[]; // 账号类型，1店铺账号，2直播账号
    shop_account_type: MapTemp[]; // 店铺账号类型,1店铺2公众平台订阅号3公众平台服务号
  };

  type ShopUserManageReq = API.ListQueryParams & {
    keyword?: string; // 关键字
    platform?: number; // 平台
    user_keeper_by?: number; // 账号保管人ID
    bind_phone?: string; // 绑定手机
  };

  type ShopUserManageData = {
    id: number; // ID
    main?: string; // 主体
    account_type: number; // 账号类型,1店铺 2直播
    shop_account_type?: number; // 店铺账号类型,1店铺2公众平台订阅号3公众平台服务号
    authentication: string; // 实名认证
    blue_v: number; // 蓝V,1是2否
    platform: number; // 平台,1微信2微信支付3淘宝4快手5抖音
    user_name: string; // 账号名
    user_id: string; // 账号ID
    bind_bank_cark?: string; // 绑定银行卡
    bind_phone: string; // 绑定手机
    bind_email?: string; // 绑定Email
    deposit_cash?: number; // 保证金
    user_balance?: number; // 账号余额
    tiktok_coin?: number; // 抖币
    user_keeper_by: number; // 账号管理人
    use_function?: string; // 使用功能
    status: number; // 状态1正常2注销
    remark?: string; // 备注
    creator_name?: string; // 创建人
    user_keeper_name?: string; // 账号管理人名
  };

  type MobileApplyRechargeData = {
    mobile_id: number; // 手机号ID
    balance: number; // 余额
    balance_file?: string;
    apply_recharge_price: number; // 申请金额
  };

  type DateRange = {
    begin: string;
    end: string;
  };
  type MobileRechargeListReq = {
    mobile_id: number; // 手机号ID
    status?: number; // 充值状态 0充值中,1成功,2失败,3受理失败,9撤销
    recharge_time?: DateRange; // 充值时间范围
  };

  type MobileRechargeListItem = {
    create_time: string; // 充值时间
    amount: number; // 充值金额
    status: number; // 充值状态 0充值中,1成功,2失败,3受理失败,9撤销
    balance: number; // 月度余额
    balance_file: string; // 月度余额凭证
    apply_recharge: number; // 申请金额余额
    creator_name: string; // 创建人
  };

  type MobileRechargeListData = {
    total_recharge_amount: number; // 累计充值金额
    total_recharge_count: number; // 累计充值次数
    data: MobileRechargeListItem[]; // 列表数据
  };
  type MobileApplyRechargeListReq = {
    mobile_id: number; // 手机号ID
    apply_time?: DateRange; // 申请时间范围
    type: number; // 1.月度余额记录 2.充值申请记录default=1"
  };

  type MobileApplyRechargeListItem = {
    balance: number; // 月度余额
    balance_file: string; // 月度余额凭证
    creator_name: string; // 创建人
    create_time: string; // 充值时间
    apply_recharge_price: number; // 申请充值金额
  };
}
