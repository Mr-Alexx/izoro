export interface TableListItem {
  id: number; // ID
  main?: string; // 主体
  account_type: number; // 账号类型,1店铺2公众平台订阅号3公众平台服务号
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
  shop_account_type: number; // 店铺账号类型,1店铺2公众平台订阅号3公众平台服务号
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface EditTableItem {
  id: React.Key;
  binding_name?: string;
  binding_value?: string;
  remark?: string;
}

export interface MapTemp {
  value: number;
  label: string;
}

export interface BindphoneType {
  value: string;
  label: string;
}
