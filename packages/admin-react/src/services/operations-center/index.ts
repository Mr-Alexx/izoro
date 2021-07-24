import { get, post } from '@/utils/request';
import { request } from 'umi';

// 洋桃运营-筛选条件

export const getMobileMap = (): Promise<OPERATION_API.MobileListMapData> =>
  get('/operation/yangtao/account-manage/mobile-map');
// 洋桃运营-充值列表
export const getMobileList = (data: OPERATION_API.MobileListReq): Promise<API.ListRes> =>
  post('/operation/yangtao/account-manage/mobile-list', data);

// 洋桃运营-充值-新增手机号
export const mobileCreate = (data: OPERATION_API.MobileInfoReq): Promise<OPERATION_API.CUResponse> =>
  post('/operation/yangtao/account-manage/mobile-create', data);

// 洋桃运营-充值-编辑手机号
export const mobileEdit = (data: OPERATION_API.MobileInfoReq): Promise<OPERATION_API.CUResponse> =>
  post('/operation/yangtao/account-manage/mobile-update', data);

// 洋桃运营-充值-查看手机号
export const mobileView = (id: number): Promise<OPERATION_API.MobileInfoReq> =>
  get(`/operation/yangtao/account-manage/mobile-view/${id}`, id);

// 洋桃运营-充值
export const mobileRecharge = (data: OPERATION_API.MobileRechargeReq): Promise<OPERATION_API.CUResponse> =>
  post('/operation/yangtao/account-manage/mobile-recharge', data);

// 洋桃运营-充值-停用
export const mobileBatchStop = (data: OPERATION_API.MobileBatchUpdateStatusReq): Promise<OPERATION_API.CUResponse> =>
  get('/operation/yangtao/account-manage/mobile-batch-stop', data);

// 洋桃运营-充值-批量修改保管人
export const mobileBatchUpdateUser = (
  data: OPERATION_API.MobileBatchUpdateUserReq,
): Promise<OPERATION_API.CUResponse> => post('/operation/yangtao/account-manage/mobile-batch-update-user', data);

// 洋桃运营-月度余额/充值金额申请
export const mobileBatchApplyRecharge = (
  data: OPERATION_API.MobileApplyRechargeData[],
): Promise<OPERATION_API.CUResponse> => post('/operation/yangtao/account-manage/mobile-batch-apply-recharge', { data });

// 手机充值列表
export const mobileRechargeList = (
  data: OPERATION_API.MobileRechargeListReq,
): Promise<OPERATION_API.MobileRechargeListData> =>
  post('/operation/yangtao/account-manage/mobile-recharge-list', data);

// //月度余额列表、充值申请列表
export const mobileApplyRechargeList = (
  data: OPERATION_API.MobileApplyRechargeListReq,
): Promise<OPERATION_API.MobileApplyRechargeListItem[]> =>
  post('/operation/yangtao/account-manage/mobile-apply-recharge-list', data);

// 洋桃运营-直播与店铺-筛选条件
export const getMap = (): Promise<OPERATION_API.LiveAndShopUserManageMapData> =>
  get('/operation/yangtao/account-manage/user-manage/map');
// 洋桃运营-直播与店铺-列表
export const getShopUserManage = (data: OPERATION_API.ShopUserManageReq): Promise<API.ListRes> =>
  post('/operation/yangtao/account-manage/shop-user-manage', data);

// 洋桃运营-直播与店铺-添加账户
export const createShopUserManage = (data: OPERATION_API.ShopUserManageData): Promise<OPERATION_API.CUResponse> =>
  post('/operation/yangtao/account-manage/shop-user-manage/create', data);

// 洋桃运营-直播与店铺-编辑账户
export const updateShopUserManage = (data: OPERATION_API.ShopUserManageData): Promise<OPERATION_API.CUResponse> =>
  post('/operation/yangtao/account-manage/shop-user-manage/update', data);

// 洋桃运营-直播与店铺-获取手机号
export const getBindphone = (): Promise<OPERATION_API.MapTemp[]> =>
  get('/operation/yangtao/account-manage/user-manage/bindphone-map');

// 洋桃运营-直播与店铺-注销账户
export const closeShopUserManage = (id: string): Promise<OPERATION_API.CUResponse> =>
  get(`/operation/yangtao/account-manage/shop-user-manage/close/${id}`);

// 洋桃运营-直播与店铺-查看账户信息（用于编辑）
export const shopUserManageView = (id: number): Promise<OPERATION_API.ShopUserManageData> =>
  get(`/operation/yangtao/account-manage/shop-user-manage/view/${id}`, id);

// 获取用户列表/保管人
export const getUserMap = (): Promise<OPERATION_API.MapTemp[]> => get('/operation/yangtao/common/user-map');
