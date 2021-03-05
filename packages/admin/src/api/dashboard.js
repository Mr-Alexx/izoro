// 接口公共参数：{ timezone: 时区, businessIds: 业务线ids字符串，多个用英文逗号隔开 }
import request from '@/utils/request'

// 获取时区列表
export function fetchTimeZoneList () {
  return request({
    url: '/v1/time-zone/list',
    method: 'GET'
  })
}

// 获取平台列表
export function fetchPlatformList () {
  return request({
    url: '/v1/platform/list',
    method: 'GET'
  })
}

// 获取店铺列表
export function fetchShopList (ids) {
  return request({
    url: '/v1/shop/list',
    method: 'GET',
    params: {
      businessIds: ids
    }
  })
}

// 获取业务线列表
export function fetchBusinessList () {
  return request({
    url: '/v1/business/list',
    method: 'GET'
  })
}

// 获取一级分类列表
export function fetchCategoryList (id) {
  return request({
    url: '/v1/product/category',
    method: 'GET',
    params: {
      parentId: id
    }
  })
}

// 获取业务线当天和昨天支付金额数据
export function fetchRealTimeChartData (params) {
  return request({
    url: '/v3/sale-order-analysis/day-sales-amount',
    method: 'GET',
    params
  })
}

/**
 * @date 2020/11/12 15:56
 * @description 获取销售数据汇总4个小卡片：已支付金额、已售出、已支付订单数量、客单价
 * @param { Object } params
 * shopIds: 店铺。多店铺用英文【,】逗号隔开
 * platformIds: 平台。多平台用英文【,】逗号隔开,
 * productCategoryIds: 产品分类。多平台用英文【,】逗号隔开
 * startDate: 起始时间。默认当天
 * endDate: 结束时间。默认当天
 */
export function fetchRealTimeSalesInfo (params) {
  return request({
    url: '/v3/real-time-sales/sales',
    method: 'GET',
    params
  })
}

/**
 * @date 2020/11/12 15:56
 * @description 获取销售数据汇总4个小卡片图表数据：已支付金额、已售出、已支付订单数量、客单价
 * @param { Object } params
 * shopIds: 店铺。多店铺用英文【,】逗号隔开
 * platformIds: 平台。多平台用英文【,】逗号隔开,
 * productCategoryIds: 产品分类。多平台用英文【,】逗号隔开
 * startDate: 起始时间。默认当天
 * endDate: 结束时间。默认当天
 */
export function fetchRealTimeSalesChartInfo (params) {
  return request({
    url: '/v3/sale-order-analysis/sales-overview',
    method: 'GET',
    params
  })
}

// 获取店铺当天的信息（实时已支付金额模块） ids 平台ID，多个以英文逗号【,】号隔开
export function fetchShopTodayInfo (params) {
  return request({
    url: '/v3/shop-report-data/today',
    method: 'get',
    params
  })
}

// 获取店铺销售数据列表
export function fetchShopsSalesInfo (params) {
  return request({
    url: '/v3/sale-order-summary-table/summary',
    method: 'GET',
    params
  })
}

// 获取大小类销售数据
export function fetchBigAndSmallCategoryInfo (params) {
  return request({
    url: '/v4/product/category-top-analysis',
    method: 'GET',
    params
  })
}

// sku分析
export function fetchSkuInfoList (params) {
  return request({
    url: '/v3/product/analysis',
    method: 'GET',
    params
  })
}
// spu分析
export function fetchSpuInfoList (params) {
  return request({
    url: '/v3/product-spu/analysis',
    method: 'GET',
    params
  })
}

// 根据sku获取其下店铺销售数据（sku分析列表查看详情接口）
export function fetchShopSalesInfoBySku (params) {
  return request({
    url: '/v1/product/sku-analysis',
    method: 'GET',
    params
  })
}
