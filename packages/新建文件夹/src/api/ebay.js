// 通过item id数组查询改item是否在ebay开发产品中
import axios from "@/utils/request";

export function queryIfItemsInEbayProductDevelope(data) {
  return axios.request({
    url: "/ebay-plugin/develop-itemid",
    method: "POST",
    headers: {
      token: "linshichulitigonggeichajiande", // 此接口固定token
      "Content-Type": "multipart/form-data"
    },
    data: {
      data
    }
  });
}
