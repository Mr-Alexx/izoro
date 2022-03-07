import { get, post } from '@/utils/request';
import { request } from 'umi';

// 获取捆绑商品详情
export const getBundleDetail = (params: PRODUCTS_API.BundleDetail): Promise<PRODUCTS_API.BundleDetailRes> =>
  get('/api/bundle-joint/bundle-detail', params);

// 获取组合商品列表
export async function getJointList(params: Record<string, any>) {
  return request<{
    data: PRODUCTS_API.JointList[];
    /** 列表的内容总数 */
    total?: number;
  }>('/api/bundle-joint/joint-list', {
    method: 'GET',
    params,
  });
}

// 获取商品分类列表
export async function getProductCategory(params: Record<string, any>) {
  return request<{
    data: PRODUCTS_API.productCategory[];
    /** 列表的内容总数 */
    total?: number;
  }>('/api/product-category/list', {
    method: 'GET',
    params,
  });
}

// 获取商品属性列表
export async function getProductSpuAttr(params: Record<string, any>) {
  return request<{
    data: PRODUCTS_API.productSpuAttr[];
    /** 列表的内容总数 */
    total?: number;
  }>('/api/finished-store/product-spu-attr', {
    method: 'GET',
    params,
  });
}

// 获取商品报价列表
export async function getProductDevelopmentSheet(params: Record<string, any>) {
  return request<{
    data: PRODUCTS_API.productDevelopmentSheet[];
    /** 列表的内容总数 */
    total?: number;
  }>('/api/finished-store/product-development-sheet', {
    method: 'GET',
    params,
  });
}

// 获取报价方案详情
export async function getProductDevelopmentView(params: Record<string, any>) {
  return request<{
    data: PRODUCTS_API.productDevelopmentSheet[];
    /** 列表的内容总数 */
    total?: number;
  }>('/api/finished-store/product-development-view', {
    method: 'GET',
    params,
  });
}

// 获取母版列表
export async function getMasterTemplateUpload(params: Record<string, any>) {
  return request<{
    data: PRODUCTS_API.masterTemplateUpload[];
    /** 列表的内容总数 */
    total?: number;
  }>('/api/finished-store/master-template-upload', {
    method: 'GET',
    params,
  });
}

// 获取母版模板列表
export async function getMasterModuleList(params: Record<string, any>) {
  return request<{
    data: PRODUCTS_API.masterModuleList[];
    /** 列表的内容总数 */
    total?: number;
  }>('/api/finished-store/master-module-list', {
    method: 'GET',
    params,
  });
}

// 获取母版模板列表
export async function getTemplateUpload(params: Record<string, any>) {
  return request<{
    data: PRODUCTS_API.templateUpload[];
    /** 列表的内容总数 */
    total?: number;
  }>('/api/finished-store/master-module-list', {
    method: 'GET',
    params,
  });
}

// 获取内容版本列表
export async function getTemplateContentVersion(params: Record<string, any>) {
  return request<{
    data: PRODUCTS_API.templateContentVersion[];
    /** 列表的内容总数 */
    total?: number;
  }>('/api/finished-store/template-content-version', {
    method: 'GET',
    params,
  });
}

// 获取图片需求单列表
export async function getShotProduct(params: Record<string, any>) {
  return request<{
    data: PRODUCTS_API.shotProduct[];
    /** 列表的内容总数 */
    total?: number;
  }>('/api/finished-store/shot-product-list', {
    method: 'GET',
    params,
  });
}

// 获取ebay上架计划
export async function getEbaySchedule(params: Record<string, any>) {
  return request<{
    data: PRODUCTS_API.ebaySchedule[];
    /** 列表的内容总数 */
    total?: number;
  }>('/api/shelf/ebay-schedule', {
    method: 'GET',
    params,
  });
}

// 获取ebay产品列表
export async function getEbayProductList(params: Record<string, any>) {
  return request<{
    data: PRODUCTS_API.ebayProductList[];
    /** 列表的内容总数 */
    total?: number;
  }>('/api/shelf/ebay-product-list', {
    method: 'GET',
    params,
  });
}

// 获取ebay刊登列表
export async function getEbayPublishList(params: Record<string, any>) {
  return request<{
    data: PRODUCTS_API.ebayPublishList[];
    /** 列表的内容总数 */
    total?: number;
  }>('/api/shelf/ebay-publish-list', {
    method: 'GET',
    params,
  });
}

// 获取ebay上架推送列表
export async function getPublishPushList(params: Record<string, any>) {
  return request<{
    data: PRODUCTS_API.publishPushList[];
    /** 列表的内容总数 */
    total?: number;
  }>('/api/shelf/ebay-publist-push-list', {
    method: 'GET',
    params,
  });
}
