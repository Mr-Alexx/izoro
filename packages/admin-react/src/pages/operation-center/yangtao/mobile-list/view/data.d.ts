export type RechargeTableItem = {
  recharge_date?: React.Key;
  recharge_money?: string;
  recharge_status?: string;
  balance?: string;
  voucher?: string;
  recharge_amount_application?: string;
  recharge_person?: string;
};

export type BalanceTableItem = {
  balance?: string;
  voucher?: string;
  notekeeper?: string;
  recording_time?: string;
};

export type RechargeMoneyTableItem = {
  balance: number; // 月度余额
  balance_file: string; // 月度余额凭证
  creator_name: string; // 创建人
  create_time: string; // 充值时间
  apply_recharge_price: number; // 申请充值金额
};

export type BindPhoneTableItem = {
  bind_name: string; // 绑定名称
  bind_value: string; // 绑定值
  remark?: string; // 备注
};

export type MobileInfoReq = {
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

export type DateRange = {
  begin: string;
  end: string;
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
